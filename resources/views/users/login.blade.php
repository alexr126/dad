@extends('master')

@section('metatags')
    <meta name="csrf-token" content="{{ csrf_field() }}">
@endsection

@section('title', 'Login')

@section('content')
    <br>
    <div>
        <!-- login form -->
        login
    </div>
    <div v-if="isAdmin">
        <!-- login success -->
        loged in :)
    </div>
@endsection

@section('pagescript')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
@endsection
