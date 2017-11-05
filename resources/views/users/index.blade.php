@extends('master')

@section('metatags')
    <meta name="csrf-token" content="{{ csrf_field() }}">
@endsection

@section('title', 'List users')

@section('content')

    <br>

    <table id="datatable" class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Name</th>
                <th>Email</th>                
                <th>Admin</th>
                <th>Blocked</th>
                <th>Reason Blocked</th>
                <th>Reason Reactivated</th>
                <th>Created At</th>
                <th>Updated At</th>
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
