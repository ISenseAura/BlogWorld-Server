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

    let response = user.addPost(req.body.title,body);

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

router.get('/posts/like/:id', (req: any, res: any) => {

  let success = false;
  let response = Posts.getAllPosts();
  if(response.length) success = true;
    res.json({ success, "post" : response })

});

router.get('/delete/:id', getuser, (req: any, res: any) => {

  let id = req.params.id.trim();
  let success = false;
  console.log(id);
  let pe = Posts.exists(id);
console.log(pe);
  if(pe) {
    success = true;
    delete Posts.data.posts[id];
    Posts.exportDatabase("posts");
  }
  else {
    console.log("post doesnt exist");
  }
    res.json({success})
});





export = router;


