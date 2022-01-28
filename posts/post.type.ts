import type  { Dict }  from "../types";
interface BlogBody {
    text : string;
    img : string;
}

interface Comment {
    date : Date,
    username : string,
    email : string,
    text : string
}


interface PostType {
    title : string;
    id : string;
    author : string;
    dateCreated : Date;
    dateModified? : Date;
    body : Dict<BlogBody>;
    short: string;
    likes : number;
    dislikes : number;
    comments : Array<Comment>,
    like() : void;
    dislike() : void;
    updatePost() : void;
    addComment(user  : string, email  : string, text : string) : void;
}

export {BlogBody, PostType, Comment};