export interface candidat {
    
    UserId : number;

    lastName : string;
    
    firstName : string;
    
    birthday : string;

}

export interface candidatId extends candidat {

    id : number;

}