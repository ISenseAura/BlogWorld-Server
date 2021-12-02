import express from 'express';
import Db from "./db";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', 1);

    next();
});

app.use("/api/auth", require("./routes/auth"));


app.get('/', (req : any, res : any) => {
    res.send('Well done!');
})

Db.importDatabases();


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})