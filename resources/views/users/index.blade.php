@extends('master')

@section('metatags')
    <meta name="csrf-token" content="{{ csrf_field() }}">
@endsection

@section('title', 'List users')

@section('content')

<div><a class="btn btn-primary" href="{{ route('users.create')}}">Add user</a></div>

    <br>

    <table id="datatable" class="table table-striped">
        <thead>
            <tr>
                <th>Nickname</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
    </table>

    <div id="navigationBar"></div>

@endsection

@section('pagescript')
    <script src="/js/usersDatatable.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
@endsection
