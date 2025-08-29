import { z } from "zod";

const generateResponseSchema = z.object({
  documentType: z.enum(["report", "prescription"]),
  fileUrl: z.string().url(),
  language: z.enum(["english", "bengali", "hindi"]),
});
export default generateResponseSchema;
