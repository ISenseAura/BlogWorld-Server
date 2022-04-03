import type  { TopicType,Comment, BlogBody,Dict }  from "../types";
import Db from "../db";
//import Posts from "./posts"

let colors : Array<string> = ["red","pruple","blue","orange","green","pink"]

class Topic implements TopicType {

     name : string;
    author : string;
    id: string;
    dateCreated : Date;
    dateModified? : Date;
    posts : Array<string>;
  description? : string;
  category : string;
    img? : string;
   color : string;

    constructor(data: TopicType) {
        this.name = data.name;
        this.author = data.author;
        this.dateCreated = data.dateCreated ? data.dateCreated : new Date();
        this.id = data.id ? data.id : Db.toId(this.name);
        this.dateModified = data.dateModified ? data.dateModified : new Date();
        this.posts = data.posts ? data.posts : [];
      this.description = data.description ? data.description : '';
        this.img = data.img ? data.img : "";
        this.category = data.category;
        this.color = data.color ? data.color : Db.sampleOne(colors);

    }

    addPost(id  : string) : void {
    this.posts.push(id);
    this.updateTopic();
    }
 
   updateTopic(): void {
        Db.data.topics[this.category][this.id] = this;
        Db.exportDatabase("topics");
    }

}


export default Topic;