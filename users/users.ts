import Db from "../db";
import User from "./user.entity"
import { BlogBody, UserType, Dict } from "../types";
import jwt = require('jsonwebtoken');



class Users extends Db {

    static  addUser(data : UserType) : string {
        if(!this.data.users) this.data.users = {};
        let id = this.toId(data.username);
        if(id in this.data.users) return "Username already taken";
        if(this.emailExists(data.email)) return "That email is already in use";
        let userr : any = new User(data);
        this.data.users[id] = userr;
        this.exportDatabase("users");


        let auth = {
            user: {
                id : userr.id,
                username : userr.username,
              email : userr.email
            }
          }
          let token : string = jwt.sign(auth,"test_token")

        return token;

    }



    static emailExists(email : string) : boolean {
        if(!this.data.users) return false;
        let keys = Object.keys(this.data.users);
        for (let i = 0;i < keys.length; i++) {
            if(this.data.users[keys[i]].email == email) return true;
        }
        return false;
    }

    static getByEmail(email : string) : UserType | null {
        let keys = Object.keys(this.data.users);
        for(let i = 0;i < keys.length;i++) {
            let user = this.data.users[keys[i]];
            if(user.email.trim() == email.trim()) return user;
        }
        return null;
    }

    static getByUsername(username : string) : UserType | null {
        let keys = Object.keys(this.data.users);
        for(let i = 0;i < keys.length;i++) {
            let user = this.data.users[keys[i]];
            if(user.username.trim() == username.trim()) return user;
        }
        return null;
    }

    static getById(id: string) : UserType | null {
        return this.data.users[id.trim()];
    }

}

export default Users;