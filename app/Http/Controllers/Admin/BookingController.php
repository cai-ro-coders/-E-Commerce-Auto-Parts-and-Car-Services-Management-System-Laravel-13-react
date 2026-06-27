<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $bookings = Booking::query()
            ->with([
                'customer:id,full_name,phone',
                'vehicle:id,registration_number,make_id,model_id',
                'vehicle.make:id,name',
                'vehicle.model:id,name',
            ])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('booking_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', fn($q) => $q->where('full_name', 'like', "%{$search}%"))
                  ->orWhereHas('vehicle', fn($q) => $q->where('registration_number', 'like', "%{$search}%"));
            }))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($booking) => [
                'id' => $booking->id,
                'booking_number' => $booking->booking_number,
                'customer_name' => $booking->customer?->full_name,
                'customer_phone' => $booking->customer?->phone,
                'vehicle_registration' => $booking->vehicle?->registration_number,
                'vehicle_make' => $booking->vehicle?->make?->name,
                'vehicle_model' => $booking->vehicle?->model?->name,
                'booking_date' => $booking->booking_date->format('Y-m-d H:i'),
                'service_type' => $booking->service_type,
                'status' => $booking->status,
                'created_at' => $booking->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/bookings/index', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function show($id)
    {
        $booking = Booking::with([
            'customer:id,full_name,phone,email,address',
            'vehicle',
            'vehicle.make:id,name',
            'vehicle.model:id,name',
            'jobCard',
        ])->findOrFail($id);

        return Inertia::render('admin/bookings/show', [
            'booking' => [
                'id' => $booking->id,
                'booking_number' => $booking->booking_number,
                'customer' => $booking->customer,
                'vehicle' => $booking->vehicle ? [
                    'id' => $booking->vehicle->id,
                    'registration_number' => $booking->vehicle->registration_number,
                    'make' => $booking->vehicle->make?->name,
                    'model' => $booking->vehicle->model?->name,
                    'year' => $booking->vehicle->year,
                    'vin' => $booking->vehicle->vin,
                    'engine_type' => $booking->vehicle->engine_type,
                    'mileage' => $booking->vehicle->mileage,
                    'fuel_type' => $booking->vehicle->fuel_type,
                    'color' => $booking->vehicle->color,
                ] : null,
                'booking_date' => $booking->booking_date->format('Y-m-d H:i'),
                'service_type' => $booking->service_type,
                'notes' => $booking->notes,
                'status' => $booking->status,
                'job_card' => $booking->jobCard ? [
                    'id' => $booking->jobCard->id,
                    'job_number' => $booking->jobCard->job_number,
                    'status' => $booking->jobCard->status,
                ] : null,
                'created_at' => $booking->created_at->format('Y-m-d H:i'),
                'updated_at' => $booking->updated_at->format('Y-m-d H:i'),
            ],
        ]);
    }

    public function edit($id)
    {
        $booking = Booking::with([
            'customer:id,full_name',
            'vehicle:id,registration_number',
        ])->findOrFail($id);

        $customers = Customer::select('id', 'full_name', 'phone')
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => ['id' => $c->id, 'name' => $c->full_name, 'phone' => $c->phone]);

        $vehicles = Vehicle::select('id', 'registration_number', 'customer_id')
            ->orderBy('registration_number')
            ->get()
            ->map(fn($v) => ['id' => $v->id, 'registration' => $v->registration_number, 'customer_id' => $v->customer_id]);

        return Inertia::render('admin/bookings/edit', [
            'booking' => [
                'id' => $booking->id,
                'booking_number' => $booking->booking_number,
                'customer_id' => $booking->customer_id,
                'customer_name' => $booking->customer?->full_name,
                'vehicle_id' => $booking->vehicle_id,
                'vehicle_registration' => $booking->vehicle?->registration_number,
                'booking_date' => $booking->booking_date->format('Y-m-d\TH:i'),
                'service_type' => $booking->service_type,
                'notes' => $booking->notes,
                'status' => $booking->status,
            ],
            'customers' => $customers,
            'vehicles' => $vehicles,
        ]);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'booking_date' => 'required|date',
            'service_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|string|in:pending,confirmed,in_progress,completed,cancelled',
        ]);

        $booking->update($validated);

        return redirect()->route('admin.bookings.index')
            ->with('toast', ['type' => 'success', 'message' => 'Booking updated successfully.']);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return redirect()->route('admin.bookings.index')
            ->with('toast', ['type' => 'success', 'message' => 'Booking deleted successfully.']);
    }
}
