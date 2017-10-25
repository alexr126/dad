<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function getAll()
    {
        return User::all();
    }

    public function pagination()
    {
        return User::paginate(5);
    } 
}
