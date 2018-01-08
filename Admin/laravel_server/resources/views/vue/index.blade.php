@extends('master')

@section('title', 'Memory Game Admin')

@section('content')
    <router-link to="/users">Users</router-link>
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
