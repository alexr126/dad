@extends('master')

@section('title', 'Memory Game Admin')

@section('content')
    <div>
        <logout></logout>
        <router-link to="/users">Users</router-link>
        <router-link to="/images">Images</router-link>
    </div>
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
