export interface wowUser{

    name : string;

    mail : string;

    description : string;

    image : string;

}

export interface Wow extends wowUser {

    id : number;

}