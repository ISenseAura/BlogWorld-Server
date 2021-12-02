
import { UserType, Dict, BlogBody, PostType } from "../types";
import Db from "../db";
import Users from "./users";
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

    public addPost(title: string, data: Dict<BlogBody>): PostType {
        let id = Posts.createPost(title, data, this.username);
        console.log(id);
        this.posts.push(id);
        this.updateUser();
        return Posts.get(id);
    }

    private updateUser(): void {
        Users.data.users[this.id] = this;
        Users.exportDatabase("users");
    }




}

export default User;