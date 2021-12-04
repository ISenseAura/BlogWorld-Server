
interface UserType {
    username : string;
    id : string;
    email : string;
    password : string;
    posts : Array<string>;
    likes? : Array<string>;
    dislikes? : Array<string>;
}

interface AuthorType {
    username : string;
    id : string;
    email : string;
}


export { UserType, AuthorType };