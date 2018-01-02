<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

define('YOUR_SERVER_URL', 'http://projetoadmin.dad');
// Check "oauth_clients" table for next 2 values:
define('CLIENT_ID', '2');
define('CLIENT_SECRET', 'ZZoEwp1x7EEs8lyM0ZV8zOMbLMBotE1f2VE01gu5');

class LoginControllerAPI extends Controller
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;
            $response = $http->post(YOUR_SERVER_URL.'/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => CLIENT_ID,
                    'client_secret' => CLIENT_SECRET,
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => ''
                ],
                'exceptions' => false,
            ]);
        $errorCode= $response->getStatusCode();
        if ($errorCode=='200') {
            return json_decode((string) $response->getBody(), true);
        } else {
            return response()->json(['msg'=>'User credentials are invalid'], $errorCode);
        }
    }

    public function logout()
    {
        \Auth::guard('api')->user()->token()->revoke();
        \Auth::guard('api')->user()->token()->delete();
        return response()->json(['msg'=>'Token revoked'], 200);
    }


    // public function logout(Request $request)
    // {
    //     //dd($request);
    //     $accessToken = $this->auth->user()->token();
    //     dd($request);
    //     // $request->user()->token()->revoke();
    //     // $request->user()->token()->delete(); 
    //     // return response()->json(['msg'=>'Token has been revoked and deleted'], 200);
    // }
}