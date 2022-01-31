import type  { PostType,Comment, BlogBody,Dict }  from "../types";
import Db from "../db";
import Posts from "./posts"


class Post implements PostType {

     title : string;
    author : string;
    id: string;
    dateCreated : Date;
    dateModified? : Date;
    body : Array<BlogBody>;
  short : string;
    likes : number;
    dislikes : number;
    comments : Array<Comment>;


    constructor(data: PostType) {
        this.title = data.title;
        this.author = data.author;
        this.dateCreated = data.dateCreated ? data.dateCreated : new Date();
        this.id = data.id ? data.id : Db.toId(this.title + this.dateCreated.toString().split(" ")[4] + this.author);
        this.dateModified = data.dateModified ? data.dateModified : new Date();
        this.body = data.body ? data.body : [];
      this.short = data.short ? data.short : '';
        this.likes = data.likes ? data.likes : 0;
        this.dislikes = data.dislikes ? data.dislikes : 0;
        this.comments = data.comments ? data.comments : [];
    }


    like() : number {
        this.likes =  this.likes + 1;
        return this.likes;
    }

    dislike() : number {
        this.dislikes =  this.dislikes + 1;
        return this.dislikes;
    }

    editBlog(u : string, img : string, txt : string, title : string) : void {
        let bd : BlogBody = {
            text : txt,
      username : u,
            img : img,
            title : title,
            date : new Date(),
            id : Db.toId(title + new Date().toString().split(" ")[4])
        }
        this.body.push(bd);
        this.updatePost();
    }

    addComment(user  : string, email  : string, text : string) : void {
    let com : Comment = {
        username : user,
        email : email,
        text : text,
        date : new Date(),
        id : Db.toId(user + new Date().toString().split(" ")[4])
    }

    this.comments.push(com);
    this.updatePost();
    }
 
   updatePost(): void {
        Posts.data.posts[this.id] = this;
        Posts.exportDatabase("posts");
    }

}


export default Post;