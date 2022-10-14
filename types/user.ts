export interface wowUser{

    mail : string;

    visibility : boolean;
    
    password: string;

    address: string;

    zipCode: string;

    city : string;

    role : string;

    image : string;

}

export interface Wow extends wowUser {

    id : number;

}