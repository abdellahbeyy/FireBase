/**
 * Created by khalid on 2/6/2017.
 */

import {User} from './User';
export class UserManager
{
    static addUser()
    {
        UserManager.createUser(UserManager.getUserFormDocument());
    }

    static createUser()
    {
        let user = UserManager.getUserFormDocument();
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(user.password === '' & !pattern.test(email))
        {
            $("#loginError").slideDown(500);
            $("#loginError").removeClass("hidden");
            throw "Please Enter Valid Data ";
        }
        else
        {
            firebase.auth().createUserWithEmailAndPassword(user.email, user._password).catch(function (error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                $("#loginEmail").slideDown(500);
                $("#loginError").removeClass("hidden");
                $("#messageLogin").text(errorCode + " " + errorMessage);

                throw errorCode + "\n" + errorMessage;
            });
        }


    }

    static getUserFormDocument()
    {
        let user;
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();

        return new User(email, password);
    }

    static signOut()
    {
        firebase.auth().signOut().then(function () {

            $('#loginError').addClass('hidden')
            $('#messageLogin').text("");
            $('#loginEmail').val("");
            $('#loginEmail').focus();
            $('#loginPassword').val("");
            $('#authentification').modal('show');
        })
    }

    static signIn(user)
    {
        var email = user.email;
        var password = user.password;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.href = "index.html";
        }).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            $("#loginError").slideDown(500);
            $("#loginError").removeClass("hidden");
            $("#messageLogin").text(errorCode + " " + errorMessage);

            throw errorCode + "\n" + errorMessage;

        })
    }

    static connect()
    {
        UserManager.signIn(UserManager.getUserFormDocument());

    }


}

export {User};

