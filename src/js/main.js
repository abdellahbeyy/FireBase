import * as tous from './messageSender';

refDB.on('child_added', (snap) => {
    let messageAjouter  = new tous.Message(snap.key,snap.val().objet,snap.val().corps,snap.val().etat, snap.val().email);
    let userConnecter = firebase.auth().currentUser;

    if(userConnecter)
    {

        if(userConnecter.email == messageAjouter.email)
        {
            tous.ajouterAuDom(messageAjouter);
            tous.slideDown(tableau.rows[1], 30, 70);

        }
    }
    else
    {
        $('#authentification').modal('show');

    }





});
refDB.on('child_removed',(snap)=>{

    document.querySelector('#' + snap.key).remove();
})

tous.sendClick();


export
{
    tous
}





