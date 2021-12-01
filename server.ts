import express from 'express';
import Db from "./db";

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));


app.get('/', (req : any, res : any) => {
    res.send('Well done!');
})

Db.importDatabases();


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})