import jwt = require('jsonwebtoken');
const JWT_SECRET = 'TEST_SECRET';

const getuser = (req: any, res: any, next: any) => {

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
  console.log(req.body);
  if(token.length < 10) return res.send({msg : "You need to login first", success : false});
    if (!token) {
        res.status(401).send("Please authenticate using a valid token");
    return;
    }
    try {
        const data : any = jwt.verify(token, "test_token");
        console.log(data);
        req.user = data.user ? data.user : "";
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Authentication Token")
    }
}





export default getuser;