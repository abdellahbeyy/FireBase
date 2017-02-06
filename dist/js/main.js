(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('main', ['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.main = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    Object.defineProperty(exports, '__esModule', { value: true });

    var Message = function () {
        function Message(id, objet, corps, etat, email) {
            _classCallCheck(this, Message);

            this._id = id;
            this._objet = objet;
            this._corps = corps;
            this._etat = etat;
            this._email = email;
        }

        _createClass(Message, [{
            key: 'toString',
            value: function toString() {
                return "Message id = " + this._id + " corps = " + this._corps + " etat = " + this._etat;
            }
        }, {
            key: 'email',
            get: function get() {
                return this._email;
            },
            set: function set(email) {
                this._email = email;
            }
        }, {
            key: 'corps',
            get: function get() {
                return this._corps;
            },
            set: function set(value) {
                this._corps = value;
            }
        }, {
            key: 'etat',
            get: function get() {
                return this._etat;
            },
            set: function set(value) {
                this._etat = value;
            }
        }, {
            key: 'objet',
            get: function get() {
                return this._objet;
            },
            set: function set(value) {
                this._objet = value;
            }
        }, {
            key: 'id',
            get: function get() {
                return this._id;
            },
            set: function set(value) {
                this._id = value;
            }
        }]);

        return Message;
    }();

    var MessageManager = function () {
        function MessageManager() {
            _classCallCheck(this, MessageManager);
        }

        _createClass(MessageManager, [{
            key: 'ajouterMessage',
            value: function ajouterMessage(messageAAjouter) {
                refDB.push({
                    objet: messageAAjouter.objet,
                    corps: messageAAjouter.corps,
                    etat: messageAAjouter.etat,
                    email: messageAAjouter.email
                });
            }
        }, {
            key: 'supprimerMessage',
            value: function supprimerMessage(idMessage) {
                refDB.child(idMessage).remove();
            }
        }]);

        return MessageManager;
    }();

    var User = function () {
        function User(email, password) {
            _classCallCheck(this, User);

            this._email = email;
            this._password = password;
        }

        _createClass(User, [{
            key: 'email',
            get: function get() {
                return this._email;
            },
            set: function set(value) {
                this._email = value;
            }
        }, {
            key: 'password',
            get: function get() {
                return this._password;
            },
            set: function set(value) {
                this._password = value;
            }
        }]);

        return User;
    }();

    var UserManager = function () {
        function UserManager() {
            _classCallCheck(this, UserManager);
        }

        _createClass(UserManager, null, [{
            key: 'addUser',
            value: function addUser() {
                UserManager.createUser(UserManager.getUserFormDocument());
            }
        }, {
            key: 'createUser',
            value: function createUser() {
                var user = UserManager.getUserFormDocument();
                var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (user.password === '' & !pattern.test(email)) {
                    $("#loginError").slideDown(500);
                    $("#loginError").removeClass("hidden");
                    throw "Please Enter Valid Data ";
                } else {
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
        }, {
            key: 'getUserFormDocument',
            value: function getUserFormDocument() {
                var user = void 0;
                var email = document.getElementById("loginEmail").value.trim();
                var password = document.getElementById("loginPassword").value.trim();

                return new User(email, password);
            }
        }, {
            key: 'signOut',
            value: function signOut() {
                firebase.auth().signOut().then(function () {

                    $('#loginError').addClass('hidden');
                    $('#messageLogin').text("");
                    $('#loginEmail').val("");
                    $('#loginEmail').focus();
                    $('#loginPassword').val("");
                    $('#authentification').modal('show');
                });
            }
        }, {
            key: 'signIn',
            value: function signIn(user) {
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
                });
            }
        }, {
            key: 'connect',
            value: function connect() {
                UserManager.signIn(UserManager.getUserFormDocument());
            }
        }]);

        return UserManager;
    }();

    var btnSend = document.getElementById("submit");

    var msM = new MessageManager();

    var sendClick = function sendClick() {
        addChangeListnerToCheckBox();
        addClickListnerToBtnSupprimer();
        getStateOfAllDomComponents();
        signInUpDisconnectListeners();
        verifyAuthentification();

        btnSend.addEventListener('click', function () {

            objet.value = objet.value.trim();
            corps.value = corps.value.trim();

            var userConnected = firebase.auth().currentUser;
            var email = 'rien';
            if (userConnected) {
                email = userConnected.email;
            } else {
                $('#authentification').modal('show');
            }
            if (objet.value !== "" && corps.value !== "") {
                var messageAjouter = new Message('', objet.value, corps.value, etat, email);
                msM.ajouterMessage(messageAjouter);

                slideDown(tableau$1.rows[1], 30, 70);
            } else {
                alert('Remplir tous les champs SVP !!!');
                objet.focus();
            }
        });
    };

    var objet = void 0;
    var corps = void 0;
    var etat = void 0;
    var tableau$1 = void 0;
    var allCheckBox = void 0;
    var getStateOfAllDomComponents = function getStateOfAllDomComponents() {
        objet = document.getElementById('objet');
        corps = document.getElementById('corps');
        var etatRadio = document.getElementById("normal");

        if (etatRadio.checked) {
            etat = "Normal";
        } else {
            etat = "Urgent";
        }

        tableau$1 = document.getElementById("tableau");
    };

    var compteur = 0;
    var checkAll = document.getElementById("checkAll");
    var addChangeListnerToCheckBox = function addChangeListnerToCheckBox() {
        checkAll.addEventListener("change", function () {
            var allCheckBoxElements = document.querySelectorAll(".abdellah");
            if (this.checked) {
                for (var i = 0; i < allCheckBoxElements.length; i++) {
                    allCheckBoxElements[i].checked = true;
                }
            } else {
                for (var _i = 0; _i < allCheckBoxElements.length; _i++) {
                    allCheckBoxElements[_i].checked = false;
                }
            }
        });
    };

    var ajouterAuDom = function ajouterAuDom(messageEnfant) {

        var row = tableau$1.insertRow(1);
        row.setAttribute('id', messageEnfant.id);
        var celluleCheckBox = row.insertCell(0);
        var celluleObjet = row.insertCell(1);
        var celluleCorps = row.insertCell(2);
        var celluleEtat = row.insertCell(3);
        var celluleSupprimer = row.insertCell(4);

        var checkBoxAjouter = document.createElement("input");
        checkBoxAjouter.classList.add("abdellah");
        checkBoxAjouter.setAttribute("type", "checkbox");
        checkBoxAjouter.setAttribute("id", "" + compteur);
        compteur++;
        celluleCheckBox.appendChild(checkBoxAjouter);
        celluleObjet.appendChild(document.createTextNode(messageEnfant.objet));
        celluleCorps.appendChild(document.createTextNode(messageEnfant.corps));
        celluleEtat.appendChild(document.createTextNode(messageEnfant.etat));
        var btnSupprimer = document.createElement("button");
        btnSupprimer.setAttribute("type", "button");
        btnSupprimer.classList.add("btn");
        btnSupprimer.classList.add("btn-danger");
        btnSupprimer.innerHTML = "Supprimer";
        btnSupprimer.addEventListener("click", function () {
            msM.supprimerMessage(this.parentNode.parentNode.id);
        });
        celluleSupprimer.appendChild(btnSupprimer);

        objet.value = "";
        corps.value = "";
        objet.focus();
    };

    var slideDown = function slideDown(element, duration, finalheight) {
        var s = element.style;
        s.height = '0px';

        var y = 0;
        var framerate = 5;
        var totalframes = duration / framerate;
        var heightincrement = finalheight / totalframes;
        var one_second = 800;
        var interval = one_second / framerate;
        var tween = function tween() {
            y += heightincrement;
            s.height = y + 'px';
            if (y < finalheight) {
                setTimeout(tween, interval);
            }
        };
        tween();
    };

    var btnSupprimerLaSelection = document.getElementById("supprimerLaSelection");

    var addClickListnerToBtnSupprimer = function addClickListnerToBtnSupprimer() {
        btnSupprimerLaSelection.addEventListener("click", function () {
            var checkAll = document.getElementById("checkAll");

            var selectionOfCheckedElements = document.querySelectorAll(".abdellah");
            for (var i = 0; i < selectionOfCheckedElements.length; i++) {
                if (selectionOfCheckedElements[i].checked) {
                    msM.supprimerMessage(selectionOfCheckedElements[i].parentNode.parentNode.id);
                }
            }
        });
    };

    var verifyAuthentification = function verifyAuthentification() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $('#authentification').modal('hide');
                $("#menu").text(user.email.match(/[a-zA-Z0-9]*/));
            } else {
                $('#authentification').modal('show');
            }
        });
    };

    var signInUpDisconnectListeners = function signInUpDisconnectListeners() {
        $("#signIn").on('click', function (evt) {

            evt.preventDefault(false);
            UserManager.connect();
        });

        $("#signUp").on('click', function (evt) {

            evt.preventDefault(false);
            UserManager.addUser();
        });

        $("#disconnect").on('click', function (evt) {

            evt.preventDefault(false);
            UserManager.signOut();
        });
    };

    var messageSender = Object.freeze({
        btnSend: btnSend,
        msM: msM,
        sendClick: sendClick,
        get objet() {
            return objet;
        },
        get corps() {
            return corps;
        },
        get etat() {
            return etat;
        },
        get tableau() {
            return tableau$1;
        },
        allCheckBox: allCheckBox,
        getStateOfAllDomComponents: getStateOfAllDomComponents,
        addChangeListnerToCheckBox: addChangeListnerToCheckBox,
        ajouterAuDom: ajouterAuDom,
        slideDown: slideDown,
        addClickListnerToBtnSupprimer: addClickListnerToBtnSupprimer,
        verifyAuthentification: verifyAuthentification,
        signInUpDisconnectListeners: signInUpDisconnectListeners,
        MessageManager: MessageManager,
        Message: Message
    });

    refDB.on('child_added', function (snap) {
        var messageAjouter = new Message(snap.key, snap.val().objet, snap.val().corps, snap.val().etat, snap.val().email);
        var userConnecter = firebase.auth().currentUser;

        if (userConnecter) {

            if (userConnecter.email == messageAjouter.email) {
                ajouterAuDom(messageAjouter);
                slideDown(tableau.rows[1], 30, 70);
            }
        } else {
            $('#authentification').modal('show');
        }
    });
    refDB.on('child_removed', function (snap) {

        document.querySelector('#' + snap.key).remove();
    });

    sendClick();

    exports.tous = messageSender;
});