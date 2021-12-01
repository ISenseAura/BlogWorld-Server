
import { UserType, Dict, BlogBody } from "../types";
import Db from "../db";
import Posts from "../posts/posts";


class User implements UserType {
    public username: string;
    public id: string;
    public email: string;
    public password: string;
    public joined_on: Date;
    public posts: Array<string>;

    constructor(data: UserType) {
        this.username = data.username;
        this.id = Db.toId(this.username);
        this.email = data.email;
        this.password = data.password;
        this.joined_on = new Date();
        this.posts = data.posts ? data.posts : [];
    }

    addPost(title: string, data: Dict<BlogBody>): void {
        let id = Posts.createPost(title,data,this.username);
        this.posts.push(id);
    }




}

export default User;