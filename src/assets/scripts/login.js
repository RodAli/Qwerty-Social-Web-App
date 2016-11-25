
$(document).ready(function() {
	$('#submitBtn').click(function(){
		var val_username = $('#inputUsername').val();
		var val_password = $('#inputPassword').val();
		$.ajax({
            url: "/login",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({'username': val_username, 'pass': val_password}),
            success: function(response) {
                //var name = response['name'];
                //TODO do something here
            }
        });
	});
});