import Db from "../db";
import Post from "./post.entity"
import { BlogBody, PostType, Dict } from "../types";


class Posts extends Db {


    static createPost(title: string, body: Dict<BlogBody>, author: string): string {
        if (Object.keys(body).length < 1) return "ERROR : The post body is empty";

        let output = "";
        try {
            let postData: any = {};
            postData.title = title;
            postData.author = author;
            postData.body = body;

            let post = new Post(postData);
            if (!this.data.posts) this.data.posts = {};
            this.data.posts[post.id] = post;
            this.exportDatabase("posts");
            console.log("post added");
            output = post.id;
        } catch (e: any) {
            console.log(e);
        }

     return output;

    }


    static getAllPosts() : Array<PostType> {

      //if(this.data.posts) {
        let keys = Object.keys(this.data.posts);
        let posts : Array<PostType> = [];
        keys.forEach((key) => {
            posts.push(this.data.posts[key]);
        });
        return posts;
       // }
     
    }

    static get(id : string) : PostType {
        return new Post(this.data.posts[id.trim()]);
    }

    static exists(id : string) : boolean {
        if(!this.data.posts[id]) return false;
        return true;
    }
 
}

export default Posts;