import { z } from "zod";

const getSignedUrlSchema = z.object({
  fileName: z.string(),
  documentType: z.string(),
  fileSize: z.string(),
});

export default getSignedUrlSchema;
