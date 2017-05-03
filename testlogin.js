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
        loginPassword = $( "#password-login");
    localStorage.setItem("isLogin",false);


    //init();

    //function init () {
    //    $("span.glyphicon.glyphicon-star").hide();
    //    $("span.glyphicon.glyphicon-star-empty").hide();
    //}

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
                        $( "#login-user").hide();
                        $( "#logout-user").show();
                        $("#users-contain").append('<div id="username-display">'+storeUsername+"</div>");

                        var lastLoginTime = localStorage.getItem("time_visit");
                        if (lastLoginTime) {
                            document.getElementById("login-time").innerHTML = lastLoginTime;
                        }

                        //set cookie for time
                        var dt = new Date();
                        localStorage.setItem("time_visit",dt);
                        localStorage.setItem("isLogin",true);
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
        $( "#login-user").show();
        $( "#logout-user" ).hide();
        $("#username-display").remove();
        localStorage.setItem("isLogin",false);
    });



    //click on star-empty trigger this funcito (favorite)

});

$(function() {
    function funcNameSave(element) {
        var currentStarEmpty = element.target.className;
        var showStar = currentStarEmpty.replace("glyphicon-star-empty","glyphicon-star");
        var star = document.getElementsByClassName(showStar);
        var emptyStar = document.getElementsByClassName(currentStarEmpty);
        console.log(star);
        console.log(emptyStar);
        //document.getElementsByClassName(showStar).style.visibility = "visible";
        document.getElementsByClassName(currentStarEmpty).after.style.visibility = "hidden";

    }

    //click on star trigger this function (unfavorite)
    function funcNameDelete(element) {
        var currentStar = element.target.className;
        var EmptyStar = currentStar.replace("glyphicon-star","glyphicon-star-empty");
        console.log(currentStar);
        console.log(EmptyStar);
        //document.getElementsByClassName(EmptyStar).style.visibility = "visible";
        document.getElementsByClassName(currentStar).after.style.visibility = "hidden";
    }
    function getFeed(source) {
        var url = "https://newsapi.org/v1/articles?source="+source+"&apiKey=619da0289a074d199fa387e4aa82608a";
        $.get(url, function(data) {
            var json = data;
            //console.log($json);
            var articles = json.articles;
            articles.forEach(function(article) {
                var article_div = document.createElement("div");
                article_div.id = article.title;
                article_div.className= "panel panel-default";
                //article.forEach(function(key){
                //    var paragraph = document.createElement("p");
                //    paragraph .innerHTML=key+" : "+article[key];
                //    article_div.append(paragraph);
                //});

                var favoriteCheckEmpty = document.createElement("span");
                favoriteCheckEmpty.className = "glyphicon glyphicon-star-empty "+article.title;
                favoriteCheckEmpty.addEventListener('click',funcNameSave);
                var favoriteCheck = document.createElement("span");
                favoriteCheck.className = "glyphicon glyphicon-star "+article.title;
                favoriteCheck.addEventListener('click',funcNameDelete);
                article_div.append(favoriteCheckEmpty);
                article_div.append(favoriteCheck);
                for (var key in article) {
                    var paragraph = document.createElement("p");
                    paragraph .innerHTML=key+" : "+article[key];
                    article_div.append(paragraph);
                }
                $("#rss-reader").append(article_div);

            });
            //json.find("articles").each(function() {
            //   //var $article = $(this),
            //   //    $displayArticle = {
            //   //        title: $article.find("title"),
            //   //        author: $article.find("author"),
            //   //        description: $article.find("description"),
            //   //        url:$article.find("url"),
            //   //        publishAt: $article.find("publishAt")
            //   //    };
            //   // console.log($displayArticle);
            //});
        });
    }
    getFeed("abc-news-au");

});

$(function(){



    //if (localStorage.getItem("isLogin")) {
    //    $("span.glyphicon.glyphicon-star").click(funcNameDelete);
    //    $("span.glyphicon.glyphicon-star-empty").click(funcNameSave);
    //} else {
    //
    //}
});