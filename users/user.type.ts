
interface UserType {
    username : string;
    id : string;
    email : string;
    password : string;
    posts : Array<string>;
    topics : Array<string>;
    likes : Array<string>;
    dislikes : Array<string>;
    ip : string;
    likePost(id:string) : boolean;
    dislikePost(id:string) : boolean;

}

interface AuthorType {
    username : string;
    id : string;
    email : string;
}


export { UserType, AuthorType };