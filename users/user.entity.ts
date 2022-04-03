
import { UserType, Dict, BlogBody, PostType } from "../types";
import Db from "../db";
import Users from "./users";
import Posts from "../posts/posts";
import Topics from "../topics/topics";



class User implements UserType {
    public username: string;
    public id: string;
    public email: string;
    public password: string;
    public joined_on: Date;
    public posts: Array<string>;
    public topics: Array<string>;
    public likes : Array<string>;
    public dislikes : Array<string>;
    public ip : string;

    constructor(data: UserType) {
        this.username = data.username;
        this.id = Db.toId(this.username);
        this.email = data.email;
        this.password = data.password;
        this.joined_on = new Date();
        this.posts = data.posts ? data.posts : [""];
        this.topics = data.topics ? data.topics : [""];

        this.likes = data.likes ? data.likes : [""];
      this.dislikes = data.dislikes ? data.dislikes : [""];
      this.ip = data.ip ? data.ip : '';
    }

    public addPost(title: string, data: Dict<BlogBody>, short : string,topic?:string,cat? :string): PostType {
        let id = Posts.createPost(title, data, this.username,short);
        console.log(id);
        this.posts.push(id);
        this.updateUser();
        if(topic && cat) {
          if(Topics.exists(topic,cat)) {
            Topics.get(Topics.toId(topic),Topics.toId(cat)).addPost(id);
          }
          else {
            console.log(`Topic : ${topic} ddoesnt exist`)
          }
        }
        return Posts.get(id);
    }

    public addTopic(title: string, cat :string,color? : string | boolean, short? : string,img?:string): boolean {
      let id = Topics.createTopic(title, cat, this.username,color,[],short,img);
      console.log(id);
      this.topics.push(id);
      this.updateUser();
      return true;
  }

public likePost(id:string) : boolean {
  let post = Posts.get(id);
  console.log(post);
  if(this.likes.includes(id)) return false;
  if(this.dislikes.includes(id) && post.dislikes > 0) {
    post.dislikes = post.dislikes - 1;
  }
  post.like();
  post.updatePost();

  this.likes.push(id);
  this.updateUser();
  return true;
}

public dislikePost(id:string) : boolean {
  let post = Posts.get(id);
   if(this.dislikes.includes(id)) return false;
   if(this.likes.includes(id) && post.likes > 0) {
    post.likes = post.likes - 1;
  }
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