import express from "express";
import hash = require("bcryptjs");
import { body, validationResult } from "express-validator";
import getuser from '../middleware/getuser';
import {UserType} from "../types";

import Users from "../users/users";
import Posts from "../posts/posts";

import jwt = require('jsonwebtoken');

const router: any = express.Router();

// REQUIRE A FEW DETAILS FOR NOW

router.post(
  "/create", getuser,
  [
    body("title", "Enter a valid post title (minimum 5 letters maximum 30 letters").isLength({ min: 5,max:30 }),
    body("img", "Enter a valid image link").isLength({min : 3}),
    body("text", "Enter some more text").isLength({
      min: 10
    })
  ],
  async (req: any, res: any) => {
    console.log("test")
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    

    let user : any = Users.getById(req.user.id);
    let body = {img : req.body.img, text : req.body.text}

    let response = user.addPost(req.body.title,body,req.body.short);

    let success = false;
    if((typeof response).toLowerCase() == "object") success = true;
    res.send({ success ,post: response });

  });


router.get('/posts', (req: any, res: any) => {

  let success = false;
  let response = Posts.getAllPosts();
  if(response.length) success = true;
    res.json({ success, "post" : response })

});

router.get('/get/:id', (req: any, res: any) => {

 let success = false;
   let id = req.params.id.trim();
  
  let msg = "";
  console.log(id);
  let pe = Posts.exists(id);
  if(pe) {
    let post = Posts.get(id);
    success = true;
    }
    else {
      msg = "Post not found"
    }
  
    res.json({success,msg})
  

});

router.get('/like/:id', getuser,  (req: any, res: any) => {

  let success = false;
   let id = req.params.id.trim();
  
  let msg = "";
  console.log(id);
  let pe = Posts.exists(id);
  let user = Users.getById(req.user.id);
  if(pe) {
    let post = Posts.get(id);
    if(!user.likes.includes(id)) {
    success = true;
    user.likePost(id);
    
      Users.exportDatabase("users");
    Posts.exportDatabase("posts");
      msg = "Liked post"
    }
    else {
      msg = "You have already liked this post"
    }
  }
  else {
    msg = "Post doesnt exist";
  }
    res.json({success,msg})
  
});


router.get('/dislike/:id', getuser,  (req: any, res: any) => {

  let success = false;
   let id = req.params.id.trim();
  
  let msg = "";
  console.log(id);
  let pe = Posts.exists(id);
  let user = Users.getById(req.user.id);
  if(pe) {
    let post = Posts.get(id);
    if(!user.dislikes.includes(id)) {
    success = true;
    user.dislikePost(id);
    
      Users.exportDatabase("users");
    Posts.exportDatabase("posts");
      msg = "Disliked post"
    }
    else {
      msg = "You have already disliked this post"
    }
  }
  else {
    msg = "Post doesnt exist";
  }
    res.json({success,msg})
  
});



router.get('/delete/:id', getuser, (req: any, res: any) => {

  let id = req.params.id.trim();
  let success = false;
  let msg = "";
  console.log(id);
  let pe = Posts.exists(id);

  if(pe) {
    let post = Posts.get(id);
    if(Posts.toId(post.author) === req.user.id) {
    success = true;
    delete Posts.data.posts[id];
    Posts.exportDatabase("posts");
      msg = "Post deleted"
    }
    else {
      msg = "Access Denied"
    }
  }
  else {
    msg = "Post doesnt exist";
  }
    res.json({success,msg})
});





export = router;


