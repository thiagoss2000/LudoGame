import express, { json } from "express";
import cors from 'cors';

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(cors())

app.listen(8000, () => {
    console.log("server on");
})