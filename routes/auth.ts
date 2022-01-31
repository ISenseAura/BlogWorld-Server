import express from "express";
import hash = require("bcryptjs");
import { body, validationResult } from "express-validator";

import Users from "../users/users";

import jwt = require('jsonwebtoken');

const router: any = express.Router();

// REQUIRE A FEW DETAILS FOR NOW

router.post(
  "/signup",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters long").isLength({
      min: 8
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
    req.body.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let response = Users.addUser(req.body);

    let success = false;
    if(response.length > 15) success = true;
    console.log(response);
    res.json({ success, "authtoken": response });



   

  });


router.post('/emaillogin', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req: any, res: any) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let success = false;
  const { email, password } = req.body;
  if (!Users.emailExists(req.body.email.trim())) return res.send({success , msg : "Please authenticate using a valid email"});

  let user = Users.getByEmail(email);

  if (user) {
    let passCompare = await hash.compare(password, user.password);
    if (!passCompare) return res.send({success , msg : "Please authenticate using correct credentials"});
    
    let auth = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
    let token: string = jwt.sign(auth, "test_token")
  console.log(token);
    success = true;
    res.json({ success, token ,name : user.username})

  }


});



router.post('/userlogin', [
  body('username', 'Enter a valid username minimum length 3').isLength({min:3}),
  body('password', 'Password cannot be blank').exists(),
], (req: any, res: any) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let success = false;
  const { username, password } = req.body;
  if (!Users.emailExists(req.body.email.trim())) return res.send({success , msg : "Please authenticate using a valid email"});

  let user = Users.getByUsername(username);

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


