
$(document).ready(function(){
	$("#sign-up").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		// Checking for blank fields.
		if( username =='' || password ==''){
			$('input[type="text"],input[type="password"]').css("border","2px solid red");
			$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
			alert("Please fill all fields...!!!!!!");
		}else {
			if(localStorage){
				$(document).ready(function(){
					localStorage.setItem("username", username);
					localStorage.setItem("password", password);
					alert("Your first name is saved.");
						alert("Hi, " + localStorage.getItem("first_name"));
				});
			} else{
				alert("Sorry, your browser do not support local storage.");
			}



			//$.post("login.php",{ email1: email, password1:password},
			//function(data) {
			//	if(data=='Invalid Email.......') {
			//		$('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
			//		$('input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
			//		alert(data);
			//	}else if(data=='Email or Password is wrong...!!!!'){
			//		$('input[type="text"],input[type="password"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
			//		alert(data);
			//	} else if(data=='Successfully Logged in...'){
			//		$("form")[0].reset();
			//		$('input[type="text"],input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
			//		alert(data);
			//	} else{
			//		alert(data);
			//	}
			//});
		}
	});
	$("#login").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		// Checking for blank fields.
		if( username =='' || password ==''){
			$('input[type="text"],input[type="password"]').css("border","2px solid red");
			$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
			alert("Please fill all fields...!!!!!!");
		}else {
			if(localStorage){
				var saveUsername = localStorage.getItem("username");
				var savePassword = localStorage.getItem("password");
				if (username == saveUsername && password == savePassword){
					alert("got correct account");
					$('form')[0].reset();
				}
			}
		}
	});
});