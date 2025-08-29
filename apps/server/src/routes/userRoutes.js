import express from "express";
import { generateResponse } from "../controller/responseController.js";
import { getSignedUrl } from "../controller/signedUrlController.js";

 const userRouter = express.Router();

userRouter.post('/generate',generateResponse);
userRouter.post('/get-signed-url',getSignedUrl);

export default userRouter;