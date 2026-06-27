<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $employees = User::where('role', 'staff')
            ->with(['customer', 'employee'])
            ->withCount('mechanicAssignments')
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            }))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($user) => [
                'id' => $user->id,
                'employee_id' => $user->employee?->employee_id,
                'address' => $user->employee?->address,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? $user->customer?->phone,
                'position' => $user->position,
                'status' => $user->status,
                'email_verified_at' => $user->email_verified_at?->format('Y-m-d'),
                'mechanic_assignments_count' => $user->mechanic_assignments_count,
                'last_login_at' => $user->last_login_at?->format('Y-m-d H:i'),
                'created_at' => $user->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/employees/index', [
            'employees' => $employees,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/employees/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|max:50|unique:employees,employee_id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'position' => $validated['position'],
            'password' => Hash::make($validated['password']),
            'role' => 'staff',
        ]);

        Employee::create([
            'userid' => $user->id,
            'employee_id' => $validated['employee_id'],
            'address' => $validated['address'] ?? null,
        ]);

        return redirect()->route('admin.employees.index')
            ->with('toast', ['type' => 'success', 'message' => 'Employee created successfully.']);
    }

    public function show($id)
    {
        $employee = User::where('role', 'staff')
            ->with('customer')
            ->withCount('mechanicAssignments')
            ->with(['mechanicAssignments' => fn($q) => $q->with('jobCard:id,job_number,status')->latest()->take(10)])
            ->findOrFail($id);

        return Inertia::render('admin/employees/show', [
            'employee' => [
                'id' => $employee->id,
                'name' => $employee->name,
                'email' => $employee->email,
                'phone' => $employee->phone ?? $employee->customer?->phone,
                'position' => $employee->position,
                'status' => $employee->status,
                'email_verified_at' => $employee->email_verified_at?->format('Y-m-d H:i'),
                'last_login_at' => $employee->last_login_at?->format('Y-m-d H:i'),
                'mechanic_assignments_count' => $employee->mechanic_assignments_count,
                'recent_assignments' => $employee->mechanicAssignments->map(fn($ma) => [
                    'id' => $ma->id,
                    'job_number' => $ma->jobCard?->job_number,
                    'job_status' => $ma->jobCard?->status,
                    'assigned_at' => $ma->assigned_at?->format('Y-m-d H:i'),
                    'completed_at' => $ma->completed_at?->format('Y-m-d H:i'),
                    'status' => $ma->status,
                ]),
                'created_at' => $employee->created_at->format('Y-m-d H:i'),
                'updated_at' => $employee->updated_at->format('Y-m-d H:i'),
            ],
        ]);
    }

    public function edit($id)
    {
        $employee = User::where('role', 'staff')->with('employee')->findOrFail($id);

        return Inertia::render('admin/employees/edit', [
            'employee' => [
                'id' => $employee->id,
                'name' => $employee->name,
                'email' => $employee->email,
                'phone' => $employee->phone,
                'position' => $employee->position,
                'status' => $employee->status,
                'address' => $employee->employee?->address,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = User::where('role', 'staff')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($employee->id)],
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'status' => 'boolean',
            'password' => 'nullable|string|min:8',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'position' => $validated['position'],
            'status' => $validated['status'] ?? true,
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $employee->update($data);

        if ($employee->employee) {
            $employee->employee->update(['address' => $validated['address'] ?? null]);
        }

        return redirect()->route('admin.employees.index')
            ->with('toast', ['type' => 'success', 'message' => 'Employee updated successfully.']);
    }

    public function destroy($id)
    {
        $employee = User::where('role', 'staff')->findOrFail($id);
        $employee->delete();

        return redirect()->route('admin.employees.index')
            ->with('toast', ['type' => 'success', 'message' => 'Employee deleted successfully.']);
    }
}
