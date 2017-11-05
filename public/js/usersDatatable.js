(function(){
	"use strict";

	$(document).ready(function() {

		$('#datatable').DataTable( {
		ajax: {
			url: 'api/users',
			dataSrc: ''
		},
		columns:[{data: 'id'},
				 {data: 'nickname'},
			     {data: 'name'},
			     {data: 'email'},
			     {data: 'admin'},
			     {data: 'blocked'},
			     {data: 'reason_blocked'},
			     {data: 'reason_reactivated'},
			     {data: 'created_at'},
			     {data: 'updated_at'}]
		});

	});		

})();