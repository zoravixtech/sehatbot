import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";

console.log('Starting SehatBot Server...');
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  hasApiKey: !!process.env.API_KEY
});

const app=express();

app.use(bodyParser.json())


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/', (req,res,next)=>{ if (req.path === '/') return res.redirect('/health'); next(); });
app.use('/api',userRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`✅ Server is running successfully on port ${PORT}`);
    console.log(`🏥 Health check available at: http://localhost:${PORT}/health`);
    console.log(`📊 Server started at: ${new Date().toISOString()}`);
})
