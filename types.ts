import { BlogBody, PostType, Comment } from "./posts/post.type";
import {UserType, AuthorType} from "./users/user.type";
import TopicType from "./topics/topic.type";


interface Dict<T> {
    [Key: string]: T;
}

export { BlogBody, PostType,Dict, UserType, AuthorType, Comment, TopicType };