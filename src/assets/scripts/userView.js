// Variable to store the object of the the current user logged in
var currentUser = null;


function hideAllContainers(){
    $("#newsfeed_container").css("display", "none");
    $("#profile_container").css("display", "none");
    $("#post_container").css("display", "none");
}

/*
 * Takes in a user object and displays his profile properly on the screen.
 */
function displayUserProfile(user){
    // Show only profile content
    hideAllContainers();
    $("#profile_container").css("display", "inline");

    // Display the users name
    $("#name_title").text(user.fname + " " + user.lname);
    // Display the user score
    $("#rating_display").text("Rating: " + user.avgRating.toFixed(3) + " / 5");
    // Set up the rating button
    $("#rate_btn").click(function(){
        var rate_value = 0;
        if ($('#radio_0').is(':checked')){
            rate_value = 0;
        } else if ($('#radio_1').is(':checked')){
            rate_value = 1;
        } else if ($('#radio_2').is(':checked')){
            rate_value = 2;
        } else if ($('#radio_3').is(':checked')){
            rate_value = 3;
        } else if ($('#radio_4').is(':checked')){
            rate_value = 4;
        } else if ($('#radio_5').is(':checked')){
            rate_value = 5;
        }

        // Increment this users score
        incrementRating(user.username, rate_value, function(newAvg){
            $("#rating_display").text("Rating: " + newAvg.toFixed(3) + " / 5");
            alert("Rate Successful");
            // Make the button disappear
            $("#rate_btn").css("display", "none");
        });
    });

    $("#aboutme_content").text(user.aboutme);

    // Print out all this users posts                           /////////////////////
}

/*
 * Increment the rating of this user with the username given.
 */
function incrementRating(username, rate_value, callback){
    $.ajax({
        url: "/rate",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({'username': username, 'rating': rate_value}),
        success: function result(res) {
            if (res.msg == "Success"){
                // Pass in the new average of this user
                callback(res.avg);
            } else {
                // Alert the user with the error msg that is returned
                alert("ERROR: Internal Error");
                location.reload(true);
            }
        }
    });
}

$(document).ready(function() {
	// Make call to get the name of this user that logged in 
	$.ajax({
        url: "/currentUser",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function result(res) {
            // If not properly logged in, redirect to login page
            if (res.hasOwnProperty("msg")){
            	document.location.href = '/';
            } else {
            	$('#greeting').text("Welcome " + res.fname + " " + res.lname);
                hideAllContainers();
                $("#newsfeed_container").css("display", "inline");
            	currentUser = res;
            }
        }
    });

    // Make on click change to profile view with this user passed in through query
    $('#newsfeed').click(function(){
        hideAllContainers();
        $("#newsfeed_container").css("display", "inline");
    });

	// Make on click change to profile view with this user passed in through query
    $('#profile').click(function(){
        // Display the current users profile
        displayUserProfile(currentUser);
    });

    $('#post').click(function(){
        hideAllContainers();
        $("#post_container").css("display", "inline");
    });

    $('#signout').click(function(){
        $.ajax({
            url: "/logout",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function result(res) {
                // Redirect to the login page
                document.location.href = "/";
            }
        });
    });
});