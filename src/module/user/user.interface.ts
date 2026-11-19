export interface IUser {
    name: string,
    email: string,
    password: string,
    age? : number | null
}


export interface updateUser {
    name? : string,
    password?: string,
    age? : number | null,
    is_Active? : boolean
}