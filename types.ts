import { BlogBody, PostType } from "./posts/post.type";
import {UserType, AuthorType} from "./users/user.type";

interface Dict<T> {
    [Key: string]: T;
}

export { BlogBody, PostType,Dict, UserType, AuthorType };