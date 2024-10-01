import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/database';


dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
}); 



const PORT: string | number = process.env.PORT || 5000;


app.listen(PORT, (error?:Error) => {
    if (!error) {
      console.log("Server running at port http://localhost:5000")
      connectDB();
    } else {
      console.error("Error occurred, The server can't start", error);
    }
  })