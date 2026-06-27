<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicePackageController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $services = ServicePackage::query()
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            }))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status === 'active' ? 1 : 0))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($service) => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'price' => (float) $service->price,
                'duration' => $service->duration,
                'status' => (bool) $service->status,
                'created_at' => $service->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/services/index', [
            'services' => $services,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/services/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|integer|min:1',
            'status' => 'required|boolean',
        ]);

        ServicePackage::create($validated);

        return redirect()->route('admin.services.index')
            ->with('toast', ['type' => 'success', 'message' => 'Service created successfully.']);
    }

    public function edit($id)
    {
        $service = ServicePackage::findOrFail($id);

        return Inertia::render('admin/services/edit', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'price' => (float) $service->price,
                'duration' => $service->duration,
                'status' => (bool) $service->status,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = ServicePackage::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|integer|min:1',
            'status' => 'required|boolean',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('toast', ['type' => 'success', 'message' => 'Service updated successfully.']);
    }

    public function destroy($id)
    {
        $service = ServicePackage::findOrFail($id);
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('toast', ['type' => 'success', 'message' => 'Service deleted successfully.']);
    }
}
