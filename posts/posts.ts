import Db from "../db";
import Post from "./post.entity"
import { BlogBody, PostType, Dict } from "../types";


class Posts extends Db {


    static createPost(title: string, body: Dict<BlogBody>, author: string): string {
        if (Object.keys(body).length < 1) return "ERROR : The post body is empty";

        try {
            let postData: any = {};
            postData.title = title;
            postData.author = author;

            let post = new Post(postData);
            if (!this.data.posts) this.data.posts = {};
            this.data.posts[post.id] = post;
            this.exportDatabase("posts");
            return post.id;
        } catch (e: any) {
            console.log(e);
        }

        finally {
            return "";
        }

    }

}

export default Posts;