<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserControllerAPI extends Controller
{
    public function getAll()
    {
        return User::all();
    }
}
