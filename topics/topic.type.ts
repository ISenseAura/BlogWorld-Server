
interface TopicType {
    name :string;
    posts : Array<string>;
    description? : string;
    img? : string;
    category : string;
    id : string;
    dateCreated : Date;
    dateModified? : Date;
    author : string;
    color : string;

    updateTopic() : void;
    addPost(id:string) : void;
}


export default TopicType;


