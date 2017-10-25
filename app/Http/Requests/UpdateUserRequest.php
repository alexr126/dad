<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // We need to change this!
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|regex:/^[a-zA-Z ]+$/',

            'email' => 'required|email|unique:users',
            
            'password' => 'required|min:8|confirmed',

            'nickname' => 'required|unique:users',

            'admin' => 'nullable|integer|min:0|max:1',

            'blocked' => 'nullable|integer|min:0|max:1',

            'reason_blocked' => 'nullable|min:0|max:255',

            'reason_reactivated' => 'nullable|min:0|max:255',
            
        ];
    }
}
