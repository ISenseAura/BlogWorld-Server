import express from "express";
import hash = require("bcryptjs");
import { body, validationResult } from "express-validator";
import getuser from '../middleware/getuser';

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let salt = await hash.genSalt(10); //update later
    let pass = await hash.hash(req.body.password, salt)

    req.body.password = pass;

    let response = Users.addUser(req.body);

    res.send({ "authtoken": response });


   

  });


router.post('/emaillogin', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], (req: any, res: any) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let success = false;
  const { email, password } = req.body;
  if (!Users.emailExists(req.body.email.trim())) return res.send({success , msg : "Please authenticate using a valid email"});

  let user = Users.getByEmail(email);

  if (user) {
    let passCompare = hash.compare(password, user.password);
    if (!passCompare) return res.send({success , msg : "Please authenticate using correct credentials"});
    
    let auth = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
    let token: string = jwt.sign(auth, "test_token")
  
    success = true;
    res.json({ success, token })

  }


});





export = router;


