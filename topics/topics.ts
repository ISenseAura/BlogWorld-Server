import Db from "../db";
import Topic from "./topic.entity"
import { BlogBody, TopicType, Dict } from "../types";


class Topics extends Db {


    static createTopic(name: string, category : string, author: string,color?:string | boolean, posts?: Array<string>, short? : string,img?:string): string {
       // if (Object.keys(posts).length < 1) return "ERROR : The topic body is empty";

        let output = "";
        try {
            let topicData: any = {};
            topicData.name = name;
            topicData.author = author;
            topicData.posts = [];
            topicData.category = this.toId(category);
            topicData.posts.push(posts);
          topicData.description = short;
          topicData.img = img;
          if(color) topicData.color = color;

            let topic = new Topic(topicData);
            if (!this.data.topics) this.data.topics = {};
            if(!this.data.topics[this.toId(category)]) this.data.topics[this.toId(category)] = {};
            this.data.topics[this.toId(category)][topic.id] = topic
            this.exportDatabase("topics");
            console.log("topic added");
            output = topic.id;
            return output;
        } catch (e: any) {
            console.log(e);
            return output;
        }

     

    }


    static getAllTopics(cat : string) : Array<TopicType> {

      //if(this.data.topics) {
        let keys : Array<string> = Object.keys(this.data.topics[this.toId(cat)]);
        let topics : Array<TopicType> = [];
        keys.forEach((key) => {
            topics.push(this.data.topics[this.toId(cat)][key]);
        });
        return topics;
       // }
     
    }

    static get(id : string,cat :string) : TopicType  {
      return new Topic(this.data.topics[cat][id]);
    }

    static exists(id : string,cat:string) : boolean {
        if(!this.data.topics[cat] || !this.data.topics[cat][id] ) return false;
        
        return true;
    }
 
}

export default Topics;