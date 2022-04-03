import express from "express";
import hash = require("bcryptjs");
import { body, validationResult } from "express-validator";
import getuser from '../middleware/getuser';
import {UserType} from "../types";

import Users from "../users/users";
import Topics from "../topics/topics";

import jwt = require('jsonwebtoken');
import Posts from "../posts/posts";

const router: any = express.Router();

// REQUIRE A FEW DETAILS FOR NOW

router.post(
  "/create", getuser,
  [
    body("name", "Enter a valid topic title (minimum 5 letters maximum 50 letters").isLength({ min: 5,max:50 }),
    body("category", "Enter some more text").isLength({
      min: 5
    }),
  ],
  async (req: any, res: any) => {
    console.log("test")
    console.log(req.body)
    let success =  false;
    let msg ='';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({success,  errors: errors.array() });
    }
    

    let user : any = Users.getById(req.user.id);
    let body = {img : req.body.img, text : req.body.text}

    /*if(req.body.topicid.length > 5) {
      let pid = req.body.topicid.trim();
      let pe = Topics.exists(pid);
      if(pe) {
         let topic = Topics.get(pid);
         topic.editBlog(req.user.username,body.img, body.text, req.body.title)
        success = true;
        msg = "Successful"
        }
        else {
          msg = "Topic not found"
        }
        return res.send({ success ,msg });
    }*/

    let response = user.addTopic(req.body.name,req.body.category,req.body.color,req.body.description,req.body.description);

    
    if(response) success = true;
    res.send({ success ,topic: response });

  });

  router.get('/cats', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  let success = false;
  let response = Object.keys(Topics.data.topics);
  if(response.length) success = true;
    res.json({ success, "topics" : response })

});

router.get('/topics/:id', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let id = req.params.id.trim();
    console.log(id)

  let success = false;
  let response = Topics.getAllTopics(id);
  if(response.length) success = true;
    res.json({ success, "topics" : response })

});

router.get('/topic/:cat/:id', (req: any, res: any) => {

 let success = false;
   let id = req.params.id.trim();
   let cat = req.params.cat.trim();

  let data : any = {topic : {},posts : [] };
  
  let msg = "";
  console.log(id);
  let pe = Topics.exists(id,cat);
  if(pe) {
     data.topic = Topics.get(id,cat);
if(data.topic.posts.length > 1) {
  data.topic.posts.forEach((a : string) => {
    if(typeof a == "string" && Posts.exists(a)) data.posts.push(Posts.get(a))
  })
  
}
    success = true;
    }
    else {
      data = "Topic not found";
    }
  console.log(data);
    res.json({success,data})
  

});






export = router;


