@extends('master')

@section('title', 'Memory Game Admin')

@section('content')
    <div v-if="isAuth">
        <router-link to="/users">Users</router-link>
    </div>
    <router-view></router-view>
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
