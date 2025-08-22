import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from "./routes/index.js"
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api',mainRouter);
const port=process.env.PORT || 5000;


app.listen(port,(error)=>{
    error? console.error(`Error ${port}`) : (console.log(`App is listening at the port ${port}`))
});
