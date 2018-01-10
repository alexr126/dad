<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\Image as ImageResource;
use Illuminate\Support\Facades\DB;

use App\Image;

class ImageControllerAPI extends Controller
{
    public function getImages(Request $request)
    {
        if ($request->has('page')) {
            return ImageResource::collection(Image::paginate(5));
        } else {
            return ImageResource::collection(Image::all());
        }
    }

    public function getImage($id)
    {
        return new ImageResource(Image::find($id));
    }
/*
    public function store(Request $request)
    {
        $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'age' => 'integer|between:18,75',
                'password' => 'min:3'
            ]);
        $user = new User();
        $user->fill($request->all());
        $user->password = Hash::make($user->password);
        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
                'age' => 'integer|between:18,75'
            ]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return new UserResource($user);
    }
*/
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
    }
*/
}
