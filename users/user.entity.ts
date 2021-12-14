
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
    public likes : Array<string>;
    public dislikes : Array<string>;

    constructor(data: UserType) {
        this.username = data.username;
        this.id = Db.toId(this.username);
        this.email = data.email;
        this.password = data.password;
        this.joined_on = new Date();
        this.posts = data.posts ? data.posts : [];
        this.likes : data.likes ? data.likes : [];
      this.dislikes : data.dislikes ? data.dislikes : [];
    }

    public addPost(title: string, data: Dict<BlogBody>): PostType {
        let id = Posts.createPost(title, data, this.username);
        console.log(id);
        this.posts.push(id);
        this.updateUser();
        return Posts.get(id);
    }

public likePost(id:string) : boolean {
  let post = posts.get(id);
  if(this.likes.includes(id)) return false;
  post.like();
  post.updatePost();

  this.likes.push(id);
  this.updateUser();
  return true;
}

public dislikePost(id:string) : boolean {
  let post = posts.get(id);
   if(this.dislikes.includes(id)) return false;
  post.dislike();
  post.updatePost();
  this.dislikes.push(id);
  this.updateUser();
  return true;
}

    private updateUser(): void {
        Users.data.users[this.id] = this;
        Users.exportDatabase("users");
    }




}

export default User;