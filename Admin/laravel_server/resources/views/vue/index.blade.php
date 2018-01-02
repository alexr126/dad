@extends('master')

@section('title', 'Vue.js App')

@section('content')
    <router-link to="/users">Users</router-link>
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
