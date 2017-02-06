/**
 * Created by Abdellah on 1/11/2017.
 */

import {Message} from './Message';

// Classe pour manipuler les messages
export class MessageManager
{
    // Ajouter Message a la base Firebase
    ajouterMessage(messageAAjouter)
    {
        refDB.push({
            objet: messageAAjouter.objet,
            corps: messageAAjouter.corps,
            etat: messageAAjouter.etat,
            email: messageAAjouter.email
        });
    }

    // Supprimer Message de la base Firebase selon id
    supprimerMessage(idMessage)
    {
        refDB.child(idMessage).remove()
    }




}

export {
    Message
}

