import { GoogleGenAI } from "@google/genai";
import generateResponseSchema from "../schemas/responseSchema.js";
import { API_KEY } from "../config.js";

// Initialize AI with error handling
let ai;
try {
  if (!API_KEY) {
    throw new Error("API_KEY is not configured");
  }
  ai = new GoogleGenAI({ apiKey: API_KEY });
  console.log("Google GenAI initialized successfully");
} catch (error) {
  console.error("Failed to initialize Google GenAI:", error.message);
  ai = null;
}

export const generateResponse = async (req, res) => {
  // Check if AI is properly initialized
  if (!ai) {
    return res.status(500).json({
      error: "Service unavailable",
      message:
        "AI service is not properly configured. Please check API_KEY environment variable.",
    });
  }

  const parsed = generateResponseSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.issues,
    });
  }

  const { fileUrl, documentType, language } = parsed.data;
  let textPrompt;

  if (documentType === "prescription") {
    textPrompt = `
You are an **Expert Pharmacist AI** specialized in **structured data extraction**. Your only task is to analyze the provided image of a medical prescription (handwritten or printed) and generate a single, complete, and valid **JSON object**. Follow the rules exactly to ensure safety and reliability.

--- DYNAMIC_VARIABLES:
TARGET_LANGUAGE: [${language}]

--- INSTRUCTIONS:

1. **Primary Output:** Your response MUST be a single, valid JSON object. Do NOT include any extra text, markdown, explanations, or code blocks. Start with { and end with }.

2. **Language Translation:** All values inside the JSON object must be translated into the TARGET_LANGUAGE using native script (e.g., Hindi → देवनागरी).

3. **JSON Schema:**
{
  "parsing_status": "String",
  "patient_details": {
    "name": "String | null",
    "age_sex": "String | null",
    "weight": "String | null"
  },
  "prescription_details": {
    "date": "String | null",
    "doctor_name": "String | null",
    "clinic_name": "String | null"
  },
  "diagnosis_complaints": ["String"],
  "medications": [
    {
      "name": "String | null",
      "dosage": "String | null",
      "frequency": "String | null",
      "duration": "String | null",
      "timing_instructions": "String | null"
    }
  ],
  "diagnostic_tests": ["String"],
  "general_advice": ["String"],
  "structured_output": {
    "patient_name": "String | null",
    "test_name": "String | null",
    "findings": "String | null",
    "causes": "String | null",
    "advice": "String | null",
    "disclaimer": "String"
  },
  "disclaimer_text": "String"
}

4. **Fallback for Incorrect Documents:**
If the uploaded document is NOT a prescription (e.g., it’s a blood report, radiology scan, or general report), return exactly this object:

{
  "parsing_status": "Failure",
  "patient_details": { "name": null, "age_sex": null, "weight": null },
  "prescription_details": { "date": null, "doctor_name": null, "clinic_name": null },
  "diagnosis_complaints": [],
  "medications": [],
  "diagnostic_tests": [],
  "general_advice": [],
  "structured_output": {
    "patient_name": null,
    "test_name": null,
    "findings": null,
    "causes": null,
    "advice": null,
    "disclaimer": "User uploaded a non-prescription medical report. Unable to extract prescription details."
  },
  "disclaimer_text": "Important: This is an AI-generated interpretation and may contain errors, especially with handwritten notes. For your safety, every medicine listed must be cross-checked with your doctor or a registered pharmacist. ALWAYS verify all medication names, dosages, and instructions before taking or administering any medicine. Do not use this as a substitute for professional medical advice."
}

5. **Extraction Guidance:**
- Extract header details into \`patient_details\` and \`prescription_details\`.
- Populate \`diagnosis_complaints\` with symptoms/diagnoses.
- Add one object per medicine into \`medications\`, filling all available fields.
- List any prescribed tests under \`diagnostic_tests\`.
- Extract any dietary or follow-up notes under \`general_advice\`.

6. **Handling Unclear Text (Safety Rule):**
If any part of a medicine’s name, dosage, or instruction is unclear, DO NOT GUESS. Use:
"name": "[unclear - looks like ...]"
Then set "parsing_status" to "SuccessWithUncertainty".

7. **Required Disclaimer:**
The \`disclaimer_text\` field must always contain this exact string (translated into the target language script):

"Important: This is an AI-generated interpretation and may contain errors, especially with handwritten notes. For your safety, every medicine listed must be cross-checked with your doctor or a registered pharmacist. ALWAYS verify all medication names, dosages, and instructions before taking or administering any medicine. Do not use this as a substitute for professional medical advice."
`;
  } else {
    textPrompt = `
You are a medically trained AI assistant integrated into a health report interpretation app. Your only task is to read and summarize medical reports (e.g., CBC, LFT, RFT, Radiology, HbA1c, etc.) into a JSON response suitable for frontend rendering in a mobile or web application.

--- DYNAMIC_VARIABLES:
TARGET_LANGUAGE: [${language}]

--- INSTRUCTIONS:

1. Response Format (IMPORTANT):
Output ONLY valid JSON. Do not include any explanations, markdown, text before or after the JSON. Do not wrap in triple backticks. Do not include code formatting or comments. Just plain JSON.

2. JSON Output Structure:
The JSON must contain the following fields:
{
  "purpose": "string",            // Purpose of the test
  "good_news": "string",          // Normal findings ✅
  "points_to_note": "string",     // Abnormal findings ⚠️
  "summary": "string",            // Overall interpretation 💡
  "tips": "string",               // Simple health tips 🍎😴
  "disclaimer": "string"          // Disclaimer in target language
}

3. Language & Tone:
- All values must be in TARGET_LANGUAGE using its native script (e.g., Hindi → Devanagari).
- Use a calm, informative, and encouraging tone.
- Keep it very simple and patient-friendly (avoid complex medical jargon).
- Use helpful emojis like ✅ ⚠️ 💡 🍎 😴 to improve readability.

4. If the uploaded document is NOT a lab report or radiology report:
Respond with this exact JSON in the TARGET_LANGUAGE:
{
  "error": "⚠️ Sorry! This app is designed to understand medical reports such as blood tests or scans. Please upload a valid medical report (PDF)."
}

5. Final Disclaimer Translation:
Translate and always include this in the "disclaimer" field:
"Important: This summary is for informational purposes only and does not replace professional medical advice. Always consult your doctor for accurate diagnosis and treatment decisions."
`;
  }

  const pdfResp = await fetch(fileUrl).then((response) =>
    response.arrayBuffer()
  );

  const contents = [
    { text: textPrompt },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(pdfResp).toString("base64"),
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
  res.send(response.text);
};
