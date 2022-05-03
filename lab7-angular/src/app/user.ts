export interface UserCredentialsDto {
    username: string,
    password: string,
}

export interface User {
    id: number,
    username: string,
    email: string
}

export interface RegisterUser {
    username: string,
    email: string,
    password: string,
    confirm_password: string
}