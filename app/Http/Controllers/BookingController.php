<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\ServicePackage;
use App\Models\Vehicle;
use App\Models\VehicleMake;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class BookingController extends Controller
{
    public function create()
    {
        $servicePackages = ServicePackage::where('status', true)->get(['id', 'name', 'description', 'price', 'duration']);
        $makes = VehicleMake::where('status', true)->with(['models' => function ($q) {
            $q->where('status', true)->orderBy('name');
        }])->orderBy('name')->get(['id', 'name']);

        return inertia('book-an-appointment', [
            'servicePackages' => $servicePackages,
            'makes' => $makes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'make_id' => 'required|exists:vehicle_makes,id',
            'model_id' => 'required|exists:vehicle_models,id',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'registration_number' => 'nullable|string|max:50',
            'service_type' => 'required|string|max:255',
            'booking_date' => 'required|date|after:now',
            'notes' => 'nullable|string|max:1000',
        ]);

        $customer = Customer::firstOrCreate(
            ['email' => $validated['email']],
            [
                'customer_code' => 'CUS-' . strtoupper(Str::random(8)),
                'full_name' => $validated['name'],
                'phone' => $validated['phone'],
                'status' => true,
            ]
        );

        $vehicle = Vehicle::create([
            'customer_id' => $customer->id,
            'make_id' => $validated['make_id'],
            'model_id' => $validated['model_id'],
            'year' => $validated['year'],
            'registration_number' => $validated['registration_number'],
            'status' => true,
        ]);

        do {
            $bookingNumber = 'BK-' . strtoupper(Str::random(8));
        } while (Booking::where('booking_number', $bookingNumber)->exists());

        Booking::create([
            'booking_number' => $bookingNumber,
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'booking_date' => $validated['booking_date'],
            'service_type' => $validated['service_type'],
            'notes' => $validated['notes'],
            'status' => 'pending',
        ]);

        return redirect()->route('book-an-appointment')->with('success', 'Your appointment has been booked successfully! We will contact you shortly.');
    }
}
