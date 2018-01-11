@extends('master')

@section('title', 'Memory Game')

@section('content')
    <logout></logout>
    <router-link to="/users">Users</router-link> -
    <router-link to="/singlememory">SinglePlayer Memory Game</router-link> -
    <router-link to="/multimemory">Multiplayer Memory Game</router-link> -
    <router-link to="/game">Memory Game</router-link> <!-- TESTS -->
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
