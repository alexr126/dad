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

    /*public function upload(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image64:jpeg,jpg,png'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        } else {
            $imageData = $request->get('image');
            $fileName = Carbon::now()->timestamp . '_' . uniqid() . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
            Image::make($request->get('image'))->save(public_path().$fileName);
            return response()->json(['error'=>false]);
        }
    }*/

    /*public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image64:jpeg,jpg,png'
        ]);
        $image = new Image();
        $image->fill($request->all());
        $image['active'] = 1;
        $image['created_at'] = Carbon::now();
        $image['updated_at'] = Carbon::now();
        $image = $request->image('image');
        $name = 'teste';
        $image->storeAs(public_path(), $name);
        $image->save();
        return response()->json(new ImageResource($image), 201);
    }*/

    /*public function upload(Request $request)
    {
        $newRequest = new Request();
        //$newRequest->fill($request->all());
        $newRequest['active'] = '1';
        $newRequest['created_at'] = Carbon::now();
        $newRequest['updated_at'] = Carbon::now();

        $image = $request->file('image');
        $extension = $image->guessClientExtension();
        $imageName = 'teste.' . $extension;

        $image->storeAs(public_path(), $imageName);

        $newRequest->path = $imageName;

        $newRequest->save();

        return response()->json(new ImageResource($image), 201);
    }*/

    public function upload(Request $request)
    {
        $newRequest = new Request();
        $newRequest->fill($request->all());
        $newRequest['active'] = '1';
        $newRequest['created_at'] = Carbon::now();
        $newRequest['updated_at'] = Carbon::now();

        $image = $request->file('image');
        $extension = $image->guessClientExtension();
        $imageName = 'teste.' . $extension;

        $image->storeAs(public_path(), $imageName);

        $newRequest->path = $imageName;

        $newImage = new Image();
        $newImage->fill($newRequest->all());

        $newImage->save();

        return response()->json(new ImageResource($newImage), 201);
    }
    

    public function activate(Request $request, $id)
    {
        $image = Image::findOrFail($id);
        $image->update($request->all());
        return new ImageResource($image);
    }


    public function disable(Request $request, $id)
    {
        $image = Image::findOrFail($id);
        $image->update($request->all());
        return new ImageResource($image);
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
        $image = Image::findOrFail($id);
        $image->delete();
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
