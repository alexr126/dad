@extends('master')

@section('title', 'Vue.js App')

@section('content')

<div class="jumbotron">
    <h1>@{{ title }}</h1>
</div>

<users :users="users" @edit-click="editUser" @delete-click="deleteUser">
</users>        

<div class="alert alert-success" v-if="showSuccess">
    <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
    <strong>@{{ successMessage }}</strong>
</div>

<user-edit>
</user-edit>

@endsection
@section('pagescript')
<script src="js/vueapp.js"></script>

<!-- <script src="/js/manifest.js"></script>
<script src="/js/vendor.js"></script>
<script src="/js/vueapp.js"></script>
 -->
 @stop  

