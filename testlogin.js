/**
 * Created by minhduong on 4/30/17.
 */
$( function() {
    $( "#logout-user" ).hide();
    var dialog, form, dialogLogin, loginForm,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        username = $( "#username" ),
        email = $( "#email" ),
        password = $( "#password" ),
        allFields = $( [] ).add( username ).add( email ).add( password ),
        tips = $( ".validateTips"),
        loginUsername = $( "#username-login" ),
        loginPassword = $( "#password-login" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( username, "username", 3, 16 );
        valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( password, "password", 5, 16 );

        valid = valid && checkRegexp( username, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
            if(localStorage){
                $(document).ready(function(){
                    localStorage.setItem("username", username.val());
                    localStorage.setItem("password", password.val());
                    localStorage.setItem("email",email.val());
                    alert("Your first name is saved.");
                });
            } else{
                alert("Sorry, your browser do not support local storage.");
            }
            dialog.dialog( "close" );
        }
        return valid;
    }

    function checkUser() {
        var valid = true;
        //allFields.removeClass( "ui-state-error" );
        //
        //valid = valid && checkLength( username, "username", 3, 16 );
        //valid = valid && checkLength( email, "email", 6, 80 );
        //valid = valid && checkLength( password, "password", 5, 16 );
        //
        //valid = valid && checkRegexp( username, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        //valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        //valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
            if(localStorage){
                $(document).ready(function(){
                    var storeUsername = localStorage.getItem("username");
                    var storePassword = localStorage.getItem("password");
                    //var storeEmail = localStorage.getItem("email");
                    if (storeUsername != loginUsername.val() || storePassword != loginPassword.val() ) {
                        valid = false;
                        alert("fail to login");
                    } else {
                        alert("success login");
                        $( "#create-user").hide();
                        $( "#logout-user").show();
                        $("#users-contain").append('<div id="username-display">'+storeUsername+"</div>");
                    }
                });
            } else{
                alert("Sorry, your browser do not support local storage.");
            }
            dialogLogin.dialog( "close" );
        }
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });

    dialogLogin = $( "#dialog-form-login" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "login an account":checkUser,
            Cancel: function() {
                dialogLogin.dialog( "close" );
            }
        },
        close: function() {
            loginForm[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });
    //
    loginForm = dialogLogin.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        var successlogin = checkUser();
        console.log(successlogin);
    });

    $( "#create-user" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });
    $( "#login-user" ).button().on( "click", function() {
        dialogLogin.dialog( "open" );
    });

    $( "#logout-user" ).button().on( "click", function() {
        $( "#create-user").show();
        $( "#logout-user" ).hide();
        $("#username-display").remove();
    });

} );