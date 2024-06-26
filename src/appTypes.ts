export interface Note {
    id: number;
    body : string;
    shareable : boolean;
    owner : number;
    createdAt: Date;
    updatedAt : Date;
}

export interface User {
    username : string;
    email : string;
    password? : string;
    id: number;
}

export interface AuthUser {
    user: Partial<User>;
    token: string;
}