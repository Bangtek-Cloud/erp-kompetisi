export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    usingAvatar: boolean;
    role: string;
}

export interface IUserSession {
    uid: string;
    name: string;
    mail: string;
    token: string;
    refresh: boolean;
}