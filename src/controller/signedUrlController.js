import {Storage} from "@google-cloud/storage"
import getSignedUrlSchema from "../schemas/signedUrlSchema.js";


const storage= new Storage({
    keyFilename: 'gcp-key.json',
});

const bucketName='document_bucket-1';

const bucket = storage.bucket(bucketName);

export const getSignedUrl=async(req,res)=>{
const paresed=getSignedUrlSchema.safeParse(req.body);

if(!paresed.success){
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.issues,
    });
}
try{
const {fileName,documentType,fileSize}=paresed.data;
if(parseInt(fileSize)>20971520){
   return res.status(400).json({error:"max file size 20Mb allowed"})
}
const file = bucket.file(fileName);
const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 20 * 60 * 1000,
      documentType,
      extensionHeaders: {
    'Content-Length':  fileSize.toString,
  }
      
    };
    const [url] = await file.getSignedUrl(options);
    
   res.status(200).json({
  fileUploadUrl: url,
  fileViewUrl: `https://storage.googleapis.com/document_bucket-1/${fileName}`
});

}
catch(err){
    res.status(400).json({err})
    console.log(err)
}


}