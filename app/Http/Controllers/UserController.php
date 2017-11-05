<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{

    public function index(){
        return view('users.index');
    }

    public function show(User $user){

    }

// -------------------------------------------- //
// ------------------ Create ------------------ //
// -------------------------------------------- //

    public function create(){

    }

    public function store(StoreUserRequest $request){

    }

// -------------------------------------------- //
// ------------------ Edit -------------------- //
// -------------------------------------------- //

    public function edit(User $user){

    }

    public function update(UpdateUserRequest $request){

    }

// -------------------------------------------- //
// ------------------ Delete ------------------ //
// -------------------------------------------- //

    public function destroy($user){

    }
}
