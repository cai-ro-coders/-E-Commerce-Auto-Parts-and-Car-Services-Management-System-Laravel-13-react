<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product');

        return [
            'category_id' => ['required', 'exists:categories,id'],
            'brand_id' => ['required', 'exists:brands,id'],
            'sku' => ['required', 'string', 'max:191', Rule::unique('products')->ignore($productId)],
            'barcode' => ['nullable', 'string', 'max:191'],
            'name' => ['required', 'string', 'max:191'],
            'description' => ['nullable', 'string'],
            'cost_price' => ['required', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'discount_type' => ['nullable', 'string', 'in:percentage,fixed'],
            'discount_value' => ['nullable', 'numeric', 'min:0'],
            'tax_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'minimum_stock' => ['nullable', 'integer', 'min:0'],
            'weight' => ['nullable', 'numeric', 'min:0'],
            'status' => ['boolean'],
            'has_vehicle_compatibility' => ['boolean'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['integer', 'exists:product_images,id'],
            'compatibilities' => ['nullable', 'array'],
            'compatibilities.*.make_id' => ['required_with:compatibilities', 'integer', 'exists:vehicle_makes,id'],
            'compatibilities.*.model_id' => ['required_with:compatibilities', 'integer', 'exists:vehicle_models,id'],
            'compatibilities.*.year_from' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'compatibilities.*.year_to' => ['nullable', 'integer', 'min:1900', 'max:2100'],
        ];
    }
}
