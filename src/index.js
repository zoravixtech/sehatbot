
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";


const app=express();

app.use(bodyParser.json())

// Health check endpoint for Docker
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/',userRouter)

app.listen(8080,()=>{
    console.log("your server is running")
})

