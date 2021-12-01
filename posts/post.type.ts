import type  { Dict }  from "../types";
interface BlogBody {
    text : string;
    img : string;
}


interface PostType {
    title : string;
    id : string;
    author : string;
    dateCreated : Date;
    dateModified? : Date;
    body : Dict<BlogBody>;
    likes : number;
    dislikes : number;
}

export {BlogBody, PostType};