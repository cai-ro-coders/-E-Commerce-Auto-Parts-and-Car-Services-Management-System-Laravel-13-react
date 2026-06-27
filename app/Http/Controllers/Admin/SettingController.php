<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $group = $request->input('group');

        $settings = Setting::query()
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('key', 'like', "%{$search}%")
                  ->orWhere('value', 'like', "%{$search}%");
            }))
            ->when($group !== null && $group !== '', fn($q) => $q->where('group', $group))
            ->orderBy('group')
            ->orderBy('key')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($setting) => [
                'id' => $setting->id,
                'key' => $setting->key,
                'value' => $setting->value,
                'group' => $setting->group,
                'created_at' => $setting->created_at->format('Y-m-d'),
            ]);

        $groups = Setting::distinct()->pluck('group')->toArray();

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
            'groups' => $groups,
            'filters' => [
                'search' => $search,
                'group' => $group,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/settings/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:settings,key',
            'value' => 'nullable|string',
            'group' => 'required|string|max:100',
        ]);

        Setting::create($validated);

        return redirect()->route('admin.settings.index')
            ->with('toast', ['type' => 'success', 'message' => 'Setting created successfully.']);
    }

    public function edit($id)
    {
        $setting = Setting::findOrFail($id);

        return Inertia::render('admin/settings/edit', [
            'setting' => [
                'id' => $setting->id,
                'key' => $setting->key,
                'value' => $setting->value,
                'group' => $setting->group,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $setting = Setting::findOrFail($id);

        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:settings,key,' . $id,
            'value' => 'nullable|string',
            'group' => 'required|string|max:100',
        ]);

        $setting->update($validated);

        return redirect()->route('admin.settings.index')
            ->with('toast', ['type' => 'success', 'message' => 'Setting updated successfully.']);
    }

    public function destroy($id)
    {
        $setting = Setting::findOrFail($id);
        $setting->delete();

        return redirect()->route('admin.settings.index')
            ->with('toast', ['type' => 'success', 'message' => 'Setting deleted successfully.']);
    }
}
