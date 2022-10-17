export interface user{

    name : string;

    mail : string;

    description : string;

    image : string;

}

export interface userId extends user {

    id : number;

}