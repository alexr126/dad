(function(){
	"use strict";

	$(document).ready(function() {

		$('#datatable').DataTable( {
		sorting: true,
		ajax: {
			url: 'api/users',
			dataSrc: ''
		},
		columns:[{data: 'nickname'},
			     {data: 'name'},
			     {data: 'email'}]
		});

	});		

})();