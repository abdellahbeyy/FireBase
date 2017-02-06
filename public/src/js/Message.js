/**
 * Created by Abdellah on 1/11/2017.
 */

// Declaration de la classe Message
export class Message
{


    constructor(id, objet, corps, etat, email)
    {

        this._id = id;
        this._objet = objet;
        this._corps = corps;
        this._etat = etat;
        this._email = email;
    }
    get email()
    {
        return this._email;
    }

    set email(email)
    {
        this._email = email;
    }
    get corps()
    {
        return this._corps;
    }

    set corps(value)
    {
        this._corps = value;
    }

    get etat()
    {
        return this._etat;
    }

    set etat(value)
    {
        this._etat = value;
    }

    get objet()
    {
        return this._objet;
    }

    set objet(value)
    {
        this._objet = value;
    }

    get id()
    {
        return this._id;
    }

    set id(value)
    {
        this._id = value;
    }

    toString()
    {
        return "Message id = " + this._id + " corps = " + this._corps + " etat = " + this._etat;
    }
}