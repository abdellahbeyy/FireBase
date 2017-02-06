/**
 * Created by khalid on 1/15/2017.
 */

// Importation
import {Message, MessageManager} from './MessageManager';
import {UserManager} from './UserManager';

// variable qui contient le boutton Submit de la forme d'envoi des messages
export let btnSend = document.getElementById("submit");
// msM instance de la classe MessageManager qui nous permettra de gerer les messages
export let msM  = new MessageManager();


export let sendClick = () =>
{
    // Appels des methodes qui vont ajouter les listeners sur tous les elements du document
    addChangeListnerToCheckBox();
    addClickListnerToBtnSupprimer();
    getStateOfAllDomComponents();
    signInUpDisconnectListeners();
    verifyAuthentification();





    btnSend.addEventListener('click', () => {


        objet.value = objet.value.trim();
        corps.value = corps.value.trim();

        let userConnected = firebase.auth().currentUser;
        let email = 'rien';
        if (userConnected) {
            // User is signed in.
            email = userConnected.email;
        }
        else
        {
            // No user is signed in.
            $('#authentification').modal('show');


        }
        if(objet.value !== "" && corps.value !== "")
        {
            let messageAjouter = new Message('', objet.value, corps.value, etat, email);
            msM.ajouterMessage(messageAjouter);
            //ajouterAuDom(messageAjouter);
            slideDown(tableau.rows[1], 30, 70);


        }
        else
        {
            alert('Remplir tous les champs SVP !!!');
            objet.focus();
        }


    });



}


export let objet, corps, etat, tableau, allCheckBox;
export let getStateOfAllDomComponents = () => {
    objet = document.getElementById('objet');
    corps = document.getElementById('corps');
    let etatRadio = document.getElementById("normal");


    if(etatRadio.checked)
    {
        etat = "Normal";
    }
    else
    {
        etat = "Urgent";
    }

    tableau = document.getElementById("tableau");

}


let compteur = 0;
let checkAll = document.getElementById("checkAll");
export let addChangeListnerToCheckBox = () =>
{
    checkAll.addEventListener("change", function () {
        var allCheckBoxElements = document.querySelectorAll(".abdellah");
        if(this.checked) {
            for (let i = 0; i < allCheckBoxElements.length; i++) {
                allCheckBoxElements[i].checked = true;

            }
        }
        else
        {
            for(let i = 0; i < allCheckBoxElements.length; i++)
            {
                allCheckBoxElements[i].checked = false;

            }
        }

    });
}

export let ajouterAuDom = (messageEnfant) => {

    let row = tableau.insertRow(1);
    row.setAttribute('id', messageEnfant.id)
    let celluleCheckBox = row.insertCell(0);
    let celluleObjet = row.insertCell(1);
    let celluleCorps = row.insertCell(2);
    let celluleEtat = row.insertCell(3);
    let celluleSupprimer = row.insertCell(4);

    let checkBoxAjouter = document.createElement("input");
    checkBoxAjouter.classList.add("abdellah");
    checkBoxAjouter.setAttribute("type", "checkbox");
    checkBoxAjouter.setAttribute("id", "" + compteur);
    compteur ++;
    celluleCheckBox.appendChild(checkBoxAjouter);
    celluleObjet.appendChild(document.createTextNode(messageEnfant.objet));
    celluleCorps.appendChild(document.createTextNode(messageEnfant.corps));
    celluleEtat.appendChild(document.createTextNode(messageEnfant.etat));
    let btnSupprimer = document.createElement("button");
    btnSupprimer.setAttribute("type", "button");
    btnSupprimer.classList.add("btn");
    btnSupprimer.classList.add("btn-danger");
    btnSupprimer.innerHTML = "Supprimer";
    btnSupprimer.addEventListener("click", function () {
        //tableau.removeChild(this.parentNode.parentNode);
        msM.supprimerMessage(this.parentNode.parentNode.id)

        //this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    });
    celluleSupprimer.appendChild(btnSupprimer);

    objet.value = "";
    corps.value = "";
    objet.focus();


}

// methode qui permet de faire le travail de slideDown de jquery
export let slideDown = (element, duration, finalheight) => {
    let s = element.style;
    s.height = '0px';

    let y = 0;
    let framerate = 5;
    let totalframes = duration/framerate;
    let heightincrement = finalheight/totalframes;
    let one_second = 800;
    let interval = one_second/framerate;
    let tween =  () => {
        y += heightincrement;
        s.height = y+'px';
        if (y<finalheight) {
            setTimeout(tween,interval);
        }
    }
    tween();
}

//
let btnSupprimerLaSelection = document.getElementById("supprimerLaSelection");

export let addClickListnerToBtnSupprimer = ()=>
{
    btnSupprimerLaSelection.addEventListener("click",  () => {

        // checkbox qui permet de cocher tous les messages pour les supprimer
        let checkAll = document.getElementById("checkAll");

        let selectionOfCheckedElements = document.querySelectorAll(".abdellah");
        for(let i = 0; i < selectionOfCheckedElements.length; i++)
        {
            if(selectionOfCheckedElements[i].checked)
            {

                //selectionOfCheckedElements[i].parentNode.parentNode.parentNode.removeChild(selectionOfCheckedElements[i].parentNode.parentNode);
                msM.supprimerMessage(selectionOfCheckedElements[i].parentNode.parentNode.id);
            }
        }
    });
}

export let verifyAuthentification = ()=>
{
    firebase.auth().onAuthStateChanged(function (user) {
        if(user)
        {
            // si l'utilisateur est connecter on cache le modal pour pouvoir voir le document de saisie
            // sinon on le faire monter
            $('#authentification').modal('hide');
            $("#menu").text(user.email.match(/[a-zA-Z0-9]*/));
        }
        else
        {
            $('#authentification').modal('show');

        }
    })



}

export let signInUpDisconnectListeners = ()=>
{
    // Ajouter les clicks listner au buttons du modal et au disconnect item
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
}









export
{
    MessageManager,
    Message
}



