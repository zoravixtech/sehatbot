
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

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

