<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\JobCard;
use App\Models\MechanicAssignment;
use App\Models\Product;
use App\Models\ServicePackage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WorkOrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $workOrders = JobCard::query()
            ->with([
                'customer:id,full_name',
                'repairOrders' => fn($q) => $q->select('id', 'job_card_id', 'total_cost', 'status'),
            ])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('job_number', 'like', "%{$search}%")
                  ->orWhere('vehicle_name', 'like', "%{$search}%")
                  ->orWhere('vehicle_plate', 'like', "%{$search}%")
                  ->orWhereHas('customer', fn($q) => $q->where('full_name', 'like', "%{$search}%"));
            }))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($job) => [
                'id' => $job->id,
                'job_number' => $job->job_number,
                'customer_name' => $job->customer?->full_name,
                'vehicle_name' => $job->vehicle_name,
                'vehicle_plate' => $job->vehicle_plate,
                'estimated_cost' => (float) $job->estimated_cost,
                'total_cost' => (float) $job->repairOrders->sum('total_cost'),
                'status' => $job->status,
                'created_at' => $job->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/work-orders/index', [
            'workOrders' => $workOrders,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        $customers = Customer::select('id', 'full_name', 'phone')
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => ['id' => $c->id, 'name' => $c->full_name, 'phone' => $c->phone]);

        $servicePackages = ServicePackage::select('id', 'name', 'price', 'duration')
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'price' => (float) $s->price,
                'duration' => $s->duration,
            ]);

        $mechanics = User::select('id', 'name')
            ->where('role', 'staff')
            ->orderBy('name')
            ->get()
            ->map(fn($u) => ['id' => $u->id, 'name' => $u->name]);

        return Inertia::render('admin/work-orders/create', [
            'customers' => $customers,
            'servicePackages' => $servicePackages,
            'mechanics' => $mechanics,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'vehicle_name' => 'nullable|string|max:255',
            'vehicle_plate' => 'nullable|string|max:50',
            'estimated_cost' => 'required|numeric|min:0',
            'inspection_notes' => 'nullable|string',
            'status' => 'required|string|in:waiting,assigned,in_progress,completed,cancelled',
            'service_package_ids' => 'nullable|array',
            'service_package_ids.*' => 'exists:service_packages,id',
            'mechanic_id' => 'nullable|exists:users,id',
        ]);

        $validated['job_number'] = 'WO-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
        $validated['booking_id'] = null;
        $validated['vehicle_id'] = null;

        $workOrder = JobCard::create($validated);

        if (!empty($validated['service_package_ids'])) {
            $workOrder->servicePackages()->sync($validated['service_package_ids']);
        }

        if (!empty($validated['mechanic_id'])) {
            MechanicAssignment::create([
                'job_card_id' => $workOrder->id,
                'mechanic_id' => $validated['mechanic_id'],
                'assigned_at' => now(),
                'status' => 'assigned',
            ]);
        }

        return redirect()->route('admin.work-orders.index')
            ->with('toast', ['type' => 'success', 'message' => 'Work order created successfully.']);
    }

    public function show($id)
    {
        $workOrder = JobCard::with([
            'customer:id,full_name,phone,email,address',
            'booking:id,booking_number',
            'repairOrders' => fn($q) => $q->with(['parts' => fn($q) => $q->with('product:id,name')]),
            'mechanicAssignments' => fn($q) => $q->with('mechanic:id,name,email'),
            'inspections',
            'servicePackages' => fn($q) => $q->select('service_packages.id', 'name', 'price', 'duration'),
        ])->findOrFail($id);

        $products = Product::with(['images' => fn($q) => $q->orderBy('sort_order')->limit(1)])
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'selling_price' => (float) $p->selling_price,
                'image' => $p->images->first()?->image,
            ]);

        return Inertia::render('admin/work-orders/show', [
            'workOrder' => [
                'id' => $workOrder->id,
                'job_number' => $workOrder->job_number,
                'customer' => $workOrder->customer,
                'vehicle_name' => $workOrder->vehicle_name,
                'vehicle_plate' => $workOrder->vehicle_plate,
                'booking_number' => $workOrder->booking?->booking_number,
                'estimated_cost' => (float) $workOrder->estimated_cost,
                'total_cost' => (float) ($workOrder->repairOrders->sum('total_cost') ?: $workOrder->estimated_cost),
                'inspection_notes' => $workOrder->inspection_notes,
                'status' => $workOrder->status,
                'repair_orders' => $workOrder->repairOrders->map(fn($ro) => [
                    'id' => $ro->id,
                    'labor_cost' => (float) $ro->labor_cost,
                    'parts_cost' => (float) $ro->parts_cost,
                    'total_cost' => (float) $ro->total_cost,
                    'notes' => $ro->notes,
                    'status' => $ro->status,
                    'parts' => $ro->parts->map(fn($p) => [
                        'id' => $p->id,
                        'product_name' => $p->product?->name,
                        'product_sku' => $p->product?->sku,
                        'quantity' => $p->quantity,
                        'unit_price' => (float) $p->unit_price,
                        'total' => (float) $p->total,
                    ]),
                ]),
                'mechanic_assignments' => $workOrder->mechanicAssignments->map(fn($ma) => [
                    'id' => $ma->id,
                    'mechanic_name' => $ma->mechanic?->name,
                    'assigned_at' => $ma->assigned_at?->format('Y-m-d H:i'),
                    'completed_at' => $ma->completed_at?->format('Y-m-d H:i'),
                    'status' => $workOrder->status === 'completed' && $ma->status === 'assigned' ? 'completed' : $ma->status,
                ]),
                'services' => $workOrder->servicePackages->map(fn($s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'price' => (float) $s->price,
                    'duration' => $s->duration,
                ]),
                'created_at' => $workOrder->created_at->format('Y-m-d H:i'),
                'updated_at' => $workOrder->updated_at->format('Y-m-d H:i'),
            ],
            'products' => $products,
        ]);
    }

    public function edit($id)
    {
        $workOrder = JobCard::with([
            'customer:id,full_name',
            'servicePackages' => fn($q) => $q->select('service_packages.id'),
            'mechanicAssignments' => fn($q) => $q->where('status', 'assigned'),
        ])->findOrFail($id);

        $customers = Customer::select('id', 'full_name', 'phone')
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => ['id' => $c->id, 'name' => $c->full_name, 'phone' => $c->phone]);

        $servicePackages = ServicePackage::select('id', 'name', 'price', 'duration')
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'price' => (float) $s->price,
                'duration' => $s->duration,
            ]);

        $mechanics = User::select('id', 'name')
            ->where('role', 'staff')
            ->orderBy('name')
            ->get()
            ->map(fn($u) => ['id' => $u->id, 'name' => $u->name]);

        $currentMechanicId = $workOrder->mechanicAssignments->first()?->mechanic_id;

        return Inertia::render('admin/work-orders/edit', [
            'workOrder' => [
                'id' => $workOrder->id,
                'customer_id' => $workOrder->customer_id,
                'customer_name' => $workOrder->customer?->full_name,
                'vehicle_name' => $workOrder->vehicle_name,
                'vehicle_plate' => $workOrder->vehicle_plate,
                'estimated_cost' => (float) $workOrder->estimated_cost,
                'inspection_notes' => $workOrder->inspection_notes,
                'status' => $workOrder->status,
                'service_package_ids' => $workOrder->servicePackages->pluck('id')->toArray(),
                'mechanic_id' => $currentMechanicId,
            ],
            'customers' => $customers,
            'servicePackages' => $servicePackages,
            'mechanics' => $mechanics,
        ]);
    }

    public function update(Request $request, $id)
    {
        $workOrder = JobCard::findOrFail($id);

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'vehicle_name' => 'nullable|string|max:255',
            'vehicle_plate' => 'nullable|string|max:50',
            'estimated_cost' => 'required|numeric|min:0',
            'inspection_notes' => 'nullable|string',
            'status' => 'required|string|in:waiting,assigned,in_progress,completed,cancelled',
            'service_package_ids' => 'nullable|array',
            'service_package_ids.*' => 'exists:service_packages,id',
            'mechanic_id' => 'nullable|exists:users,id',
        ]);

        $validated['vehicle_id'] = null;
        $workOrder->update($validated);

        $workOrder->servicePackages()->sync($validated['service_package_ids'] ?? []);

        // Handle status completed
        if ($validated['status'] === 'completed') {
            // Mark assigned mechanics as completed
            $workOrder->mechanicAssignments()
                ->where('status', 'assigned')
                ->update(['status' => 'completed', 'completed_at' => now()]);

            // Create repair order if none exists
            if ($workOrder->repairOrders()->count() === 0) {
                $workOrder->repairOrders()->create([
                    'labor_cost' => 0,
                    'parts_cost' => 0,
                    'total_cost' => $validated['estimated_cost'] ?? 0,
                    'notes' => 'Auto-generated on completion',
                    'status' => 'completed',
                ]);
            }
        }

        // Update mechanic assignment
        $existingAssignment = $workOrder->mechanicAssignments()
            ->where('status', 'assigned')
            ->first();

        if (!empty($validated['mechanic_id'])) {
            if ($existingAssignment) {
                $existingAssignment->update(['mechanic_id' => $validated['mechanic_id']]);
            } else {
                MechanicAssignment::create([
                    'job_card_id' => $workOrder->id,
                    'mechanic_id' => $validated['mechanic_id'],
                    'assigned_at' => now(),
                    'status' => 'assigned',
                ]);
            }
        } elseif ($existingAssignment) {
            $existingAssignment->delete();
        }

        return redirect()->route('admin.work-orders.index')
            ->with('toast', ['type' => 'success', 'message' => 'Work order updated successfully.']);
    }

    public function destroy($id)
    {
        $workOrder = JobCard::findOrFail($id);
        $workOrder->delete();

        return redirect()->route('admin.work-orders.index')
            ->with('toast', ['type' => 'success', 'message' => 'Work order deleted successfully.']);
    }

    public function addPart(Request $request, $id)
    {
        $workOrder = JobCard::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
        ]);

        $repairOrder = $workOrder->repairOrders()->first();
        if (!$repairOrder) {
            $repairOrder = $workOrder->repairOrders()->create([
                'labor_cost' => 0,
                'parts_cost' => 0,
                'total_cost' => 0,
                'notes' => null,
                'status' => 'in_progress',
            ]);
        }

        $total = $validated['quantity'] * $validated['unit_price'];

        $repairOrder->parts()->create([
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
            'unit_price' => $validated['unit_price'],
            'total' => $total,
        ]);

        $partsCost = $repairOrder->parts()->sum('total');
        $repairOrder->update([
            'parts_cost' => $partsCost,
            'total_cost' => $repairOrder->labor_cost + $partsCost,
        ]);

        return redirect()->back()
            ->with('toast', ['type' => 'success', 'message' => 'Part added to repair order.']);
    }

    public function updateNotes(Request $request, $id)
    {
        $workOrder = JobCard::findOrFail($id);

        $validated = $request->validate([
            'notes' => 'nullable|string',
        ]);

        $repairOrder = $workOrder->repairOrders()->first();
        if ($repairOrder) {
            $repairOrder->update(['notes' => $validated['notes']]);
        }

        return redirect()->back()
            ->with('toast', ['type' => 'success', 'message' => 'Service notes updated.']);
    }

    public function updateStatus(Request $request, $id)
    {
        $workOrder = JobCard::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:waiting,assigned,in_progress,completed,cancelled',
        ]);

        $workOrder->update(['status' => $validated['status']]);

        if ($validated['status'] === 'completed') {
            $workOrder->mechanicAssignments()
                ->where('status', 'assigned')
                ->update(['status' => 'completed', 'completed_at' => now()]);

            if ($workOrder->repairOrders()->count() === 0) {
                $workOrder->repairOrders()->create([
                    'labor_cost' => 0,
                    'parts_cost' => 0,
                    'total_cost' => $workOrder->estimated_cost ?? 0,
                    'notes' => 'Auto-generated on completion',
                    'status' => 'completed',
                ]);
            }
        }

        return redirect()->back()
            ->with('toast', ['type' => 'success', 'message' => 'Status updated.']);
    }

    public function generateInvoice($id)
    {
        $workOrder = JobCard::with([
            'customer:id,full_name',
            'repairOrders.parts.product:id,name',
        ])->findOrFail($id);

        $repairOrder = $workOrder->repairOrders()->first();
        if (!$repairOrder) {
            return redirect()->back()
                ->with('toast', ['type' => 'error', 'message' => 'No repair order to invoice.']);
        }

        $invoice = Invoice::create([
            'invoice_number' => 'INV-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
            'customer_id' => $workOrder->customer_id,
            'invoice_type' => 'repair',
            'subtotal' => $repairOrder->total_cost,
            'discount' => 0,
            'tax' => 0,
            'total' => $repairOrder->total_cost,
            'due_date' => now()->addDays(30),
            'status' => 'pending',
        ]);

        if ($repairOrder->labor_cost > 0) {
            $invoice->items()->create([
                'item_type' => 'labor',
                'item_id' => $repairOrder->id,
                'description' => 'Labor charges',
                'quantity' => 1,
                'unit_price' => $repairOrder->labor_cost,
                'total' => $repairOrder->labor_cost,
            ]);
        }

        foreach ($repairOrder->parts as $part) {
            $invoice->items()->create([
                'item_type' => 'part',
                'item_id' => $part->product_id,
                'description' => $part->product?->name ?? 'Part #' . $part->product_id,
                'quantity' => $part->quantity,
                'unit_price' => $part->unit_price,
                'total' => $part->total,
            ]);
        }

        return redirect()->back()
            ->with('toast', ['type' => 'success', 'message' => 'Invoice ' . $invoice->invoice_number . ' generated.']);
    }
}
