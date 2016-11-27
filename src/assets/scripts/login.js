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


$("#signup").submit(function(e) {
 
    e.preventDefault();

    var match = true;
    var firstname = $("#first_name").val();
    var lastname = $("#last_name").val();
    var username = $("#user_name").val();
    var p_word1 = $("#pw1").val();
    var p_word2 = $("#pw2").val();
    var about_me = $("#about_me").val();

    if(p_word1!=p_word2){
        match = false;
        alert('Sorry, the passwords you have entered do not match.');
    }

    var addObj = 
            {
                "firstname": firstname,
                "lastname": lastname,
                "username": username,
                "p_word1": p_word1,
                "p_word2": p_word2,
                "match": match,
                "about_me": about_me
            };

        console.log(addObj);    

        $.ajax({
                 // The book id is part of the resource
            url: '/register',
            type: 'POST',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(addObj),
            success: function result() {
            console.log('whyyyy');
            }
 
         });
 
         location.reload(true);
 
});



});
