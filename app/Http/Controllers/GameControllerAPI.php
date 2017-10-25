<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameControllerAPI extends Controller
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
