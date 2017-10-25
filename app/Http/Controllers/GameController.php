<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreGameRequest $validator, $requestId)
    {
        //
    }

    public function showDetails()
    {
        //
    }

    public function create()
    {
        //
    }

    public function edit(Game $game)
    {
        //
    }

    public function update(UpdateGameRequest $formRequest, Game $game)
    {
        //
    }

    public function destroy(Game $game)
    {
        //
    }

    public function users()
    {
        return $this->belongsToMany('app\User');
    }

}
