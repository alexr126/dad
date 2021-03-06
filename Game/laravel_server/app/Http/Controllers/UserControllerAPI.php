<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function getUsers(Request $request)
    {
        if ($request->has('page')) {
            return UserResource::collection(User::paginate(5));
        } else {
            return UserResource::collection(User::all());
        }
    }

    public function store(Request $request)
    {
        $request->validate([
                'name' => 'required',
                'nickname' => 'required|unique:users,nickname',
                'email' => 'required|email|unique:users,email',
                'password' => 'min:3'
            ]);
        $user = new User();
        $user->fill($request->all());
        $user->password = Hash::make($user->password);
        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function getUserByEmail($email)
    {
        $user = DB::table('users')->select()->where('email', '=', $email)->get();
        return $user;
    }

    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }   

    public function update(Request $request, $id)
    {
        if($request->password){
            $request->validate([
                'name' => '',
                'email' => 'email|unique:users,email,'.$id,
                'nickname' => 'unique:users,nickname',
                'password' => 'min:3'
            ]);
        }else{
            $request->validate([
                'name' => '',
                'email' => 'email|unique:users,email,'.$id,
                'nickname' => 'unique:users,nickname'
            ]);
        }

        $user = User::findOrFail($id);
        $user->update($request->all());
        return new UserResource($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
    /*
    public function emailAvailable(Request $request)
    {
        $totalEmail = 1;
        if ($request->has('email') && $request->has('id')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->where('id', '<>', $request->id)->count();
        } else if ($request->has('email')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->count();
        }
        return response()->json($totalEmail == 0);
    }*/
}
