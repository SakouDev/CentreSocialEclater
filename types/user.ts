export interface user{

    mail : string;

    visibility : boolean;
    
    password: string;

    address: string;

    zipCode: string;

    city : string;

    role : string;

    image : string;

}

export interface userId extends user {

    id : number;

}