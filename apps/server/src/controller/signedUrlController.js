import { Storage } from "@google-cloud/storage";
import getSignedUrlSchema from "../schemas/signedUrlSchema.js";

const storage = new Storage({
  projectId: "sehat-42ec3",
  keyFilename: "gcp-key.json",
});

const bucketName = "document_bucket-1";

const bucket = storage.bucket(bucketName);

export const getSignedUrl = async (req, res) => {
  const parsed = getSignedUrlSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.issues,
    });
  }
  try {
    const { fileName, documentType, fileSize } = parsed.data;
    if (parseInt(fileSize) > 20971520) {
      return res.status(400).json({ error: "max file size 20Mb allowed" });
    }
    const file = bucket.file(fileName);
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 20 * 60 * 1000,
      contentType: "application/pdf",
      extensionHeaders: {
        "content-length": parseInt(fileSize),
      },
    };
    const [url] = await file.getSignedUrl(options);

    res.status(200).json({
      fileUploadUrl: url,
      fileViewUrl: `https://storage.googleapis.com/document_bucket-1/${fileName}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate signed URL", details: err.message });
    console.log("Signed URL Error:", err);
  }
};
