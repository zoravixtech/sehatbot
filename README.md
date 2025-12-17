# 🏥 SehatBot - AI-Powered Medical Document Analysis Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Security & Privacy](#security--privacy)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**SehatBot** is an intelligent healthcare document analysis platform that leverages AI to interpret and summarize medical documents. The application uses Google's Gemini 2.5 Flash AI model to analyze medical prescriptions and lab reports, providing patients with easy-to-understand summaries in multiple languages.

### Key Capabilities

- **Prescription Analysis**: Extracts structured data from handwritten or printed medical prescriptions
- **Lab Report Interpretation**: Summarizes blood tests, radiology reports, and other medical diagnostics
- **Multi-language Support**: Outputs results in English, Hindi, and Bengali with native script support
- **Secure Document Storage**: Integrates with Firebase Storage and Google Cloud Storage
- **Real-time Processing**: Fast AI-powered analysis with structured JSON responses

### Problem Statement

Medical documents often contain complex terminology and hard-to-read handwriting, making it difficult for patients to understand their prescriptions and test results. SehatBot bridges this gap by providing clear, structured, and translated medical information while maintaining safety disclaimers.

---

## ✨ Features

### 1. **Prescription Parsing**

- Extracts patient details (name, age, sex, weight)
- Identifies medications with dosage, frequency, duration, and timing
- Captures diagnosis/complaints and diagnostic test recommendations
- Provides general medical advice and follow-up instructions
- Handles unclear text with safety markers (`[unclear - looks like ...]`)

### 2. **Medical Report Summarization**

- Interprets lab reports (CBC, LFT, RFT, HbA1c, etc.)
- Highlights normal findings (good news ✅)
- Flags abnormal values (points to note ⚠️)
- Provides overall summary and actionable health tips
- Simple, patient-friendly language with emoji indicators

### 3. **Multi-language Output**

- **English**: Default language
- **Hindi**: देवनागरी script support
- **Bengali**: বাংলা script support
- All medical terms and advice translated appropriately

### 4. **Document Management**

- PDF file upload support (max 20MB)
- Firebase Storage integration for client-side uploads
- Google Cloud Storage for signed URL generation
- Secure file access with time-limited URLs (20-minute expiry)

### 5. **Error Handling & Validation**

- Input validation using Zod schemas
- Graceful handling of non-medical documents
- Clear error messages for users
- AI parsing status indicators (Success, SuccessWithUncertainty, Failure)

### 6. **Safety & Disclaimers**

- Mandatory medical disclaimers on all outputs
- Warnings against using AI interpretation without doctor verification
- Emphasis on cross-checking medication details with pharmacists

---

## 🛠️ Technology Stack

### Frontend (`apps/client`)

| Technology   | Version | Purpose                   |
| ------------ | ------- | ------------------------- |
| **React**    | 19.1.1  | UI framework              |
| **Vite**     | 7.1.2   | Build tool and dev server |
| **Firebase** | 12.2.1  | Client-side file storage  |
| **ESLint**   | 9.33.0  | Code linting              |

### Backend (`apps/server`)

| Technology                | Version | Purpose                                 |
| ------------------------- | ------- | --------------------------------------- |
| **Node.js**               | 18+     | Runtime environment                     |
| **Express**               | 5.1.0   | Web framework                           |
| **Google GenAI**          | 1.11.0  | AI model integration (Gemini 2.5 Flash) |
| **@google-cloud/storage** | 7.16.0  | GCS integration                         |
| **Zod**                   | 4.0.8   | Schema validation                       |
| **dotenv**                | 17.2.0  | Environment configuration               |
| **Nodemon**               | 3.1.10  | Development auto-reload                 |

### DevOps & Tools

- **pnpm**: Workspace package manager (v10.9.0)
- **Docker**: Containerization with multi-stage builds
- **Docker Compose**: Orchestration for dev and production
- **Google Cloud Storage**: Document storage backend
- **Firebase Storage**: Client-side upload handling

---

## 🏗️ Project Architecture

### Monorepo Structure

```
sehatbot_server/
├── apps/
│   ├── server/              # Backend API
│   │   ├── src/
│   │   │   ├── index.js              # Express server entry
│   │   │   ├── config.js             # Environment config
│   │   │   ├── controller/
│   │   │   │   ├── responseController.js    # AI processing logic
│   │   │   │   └── signedUrlController.js   # GCS signed URLs
│   │   │   ├── routes/
│   │   │   │   └── userRoutes.js            # API routes
│   │   │   └── schemas/
│   │   │       ├── responseSchema.js        # Input validation
│   │   │       └── signedUrlSchema.js       # URL validation
│   │   ├── Dockerfile                       # Multi-stage build
│   │   ├── healthcheck.js                   # Health monitoring
│   │   └── package.json
│   │
│   └── client/              # Frontend React App
│       ├── src/
│       │   ├── App.jsx                      # Main application
│       │   ├── firebase.js                  # Firebase config
│       │   ├── constants.js                 # App constants
│       │   ├── components/
│       │   │   ├── Layout.jsx               # Page layout
│       │   │   ├── Controls.jsx             # Form controls
│       │   │   ├── FileUploader.jsx         # PDF upload
│       │   │   ├── Loader.jsx               # Loading state
│       │   │   ├── ErrorBanner.jsx          # Error display
│       │   │   └── results/
│       │   │       ├── PrescriptionView.jsx # Prescription UI
│       │   │       ├── ReportView.jsx       # Report UI
│       │   │       └── RawView.jsx          # Fallback view
│       │   └── utils/
│       │       └── parseResult.js           # Response normalizer
│       ├── Dockerfile                        # Multi-stage build
│       ├── vite.config.js                    # Vite configuration
│       └── package.json
│
├── packages/                # Shared libraries (future)
├── docker-compose.yml       # Production setup
├── docker-compose.dev.yml   # Development setup
├── pnpm-workspace.yaml      # Monorepo configuration
├── gcp-key.json             # GCP service account key (gitignored)
└── README.md                # This file
```

### System Flow Diagram

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Upload PDF + Select Type/Language
       ▼
┌──────────────────┐
│  React Frontend  │
│  (apps/client)   │
└──────┬───────────┘
       │
       │ 2. Upload to Firebase Storage
       ▼
┌──────────────────┐
│ Firebase Storage │
└──────┬───────────┘
       │
       │ 3. Get Download URL
       ▼
┌──────────────────┐
│ Express Backend  │
│  (apps/server)   │
└──────┬───────────┘
       │
       │ 4. Validate Input (Zod)
       │ 5. Fetch PDF from URL
       │ 6. Send to Gemini AI with Prompt
       ▼
┌──────────────────┐
│  Google Gemini   │
│  2.5 Flash API   │
└──────┬───────────┘
       │
       │ 7. Structured JSON Response
       ▼
┌──────────────────┐
│ Response Parser  │
│  (Backend)       │
└──────┬───────────┘
       │
       │ 8. Return to Frontend
       ▼
┌──────────────────┐
│  Result Display  │
│  (UI Components) │
└──────────────────┘
```

### API Endpoints

| Endpoint              | Method | Description             |
| --------------------- | ------ | ----------------------- |
| `/health`             | GET    | Health check endpoint   |
| `/api/generate`       | POST   | AI document analysis    |
| `/api/get-signed-url` | POST   | Generate GCS signed URL |

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v10.9.0 (installed globally)
- **Docker** (optional, for containerized deployment)
- **Firebase Account**: For client-side storage
- **Google Cloud Account**: For GCP Storage and Gemini API
- **API Keys**:
  - Google Gemini API Key
  - Firebase configuration
  - GCP service account key

### Step 1: Clone the Repository

```bash
git clone https://github.com/saurodip1708/sehatbot_server.git
cd sehatbot_server
```

### Step 2: Install Dependencies

```bash
# Install pnpm globally if not already installed
npm install -g pnpm@10.9.0

# Install all workspace dependencies
pnpm install
```

### Step 3: Configure Environment Variables

#### Backend (`apps/server`)

Create a `.env` file in the `apps/server` directory:

```env
# Google Gemini API Key
API_KEY=your_google_gemini_api_key_here

# Server Configuration
PORT=8080
NODE_ENV=development
```

#### Frontend (`apps/client`)

Update `src/firebase.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Step 4: Configure Google Cloud Storage

Place your GCP service account key as `gcp-key.json` in the project root:

```bash
# Download from GCP Console > IAM & Admin > Service Accounts
mv ~/Downloads/your-service-account-key.json ./gcp-key.json
```

Update bucket name in `apps/server/src/controller/signedUrlController.js` if needed.

### Step 5: Run the Application

#### Option A: Development Mode (Separate Terminals)

```bash
# Terminal 1 - Backend
pnpm dev:server

# Terminal 2 - Frontend
pnpm dev:client
```

- Backend: http://localhost:8080
- Frontend: http://localhost:5173

#### Option B: Development Mode (Single Command)

```bash
pnpm dev
```

#### Option C: Docker Development

```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## 📖 Usage Guide

### Step-by-Step User Flow

1. **Open the Application**: Navigate to `http://localhost:5173`

2. **Select Document Type**:

   - **Prescription**: For doctor's prescriptions (handwritten or printed)
   - **Report**: For lab reports, blood tests, radiology scans, etc.

3. **Choose Language**:

   - English
   - Hindi (हिंदी)
   - Bengali (বাংলা)

4. **Upload PDF**:

   - Click "Choose PDF File"
   - Select a medical document (max 20MB)
   - Supported format: PDF only

5. **Analyze**:

   - Click "Analyze PDF"
   - Wait for processing (typically 5-15 seconds)

6. **View Results**:

   - **Prescription**: See structured medication details, patient info, diagnosis
   - **Report**: View purpose, good news, warnings, summary, and tips

7. **Read Disclaimer**: Always verify AI output with healthcare professionals

### Example Outputs

#### Prescription Response Structure

```json
{
  "parsing_status": "Success",
  "patient_details": {
    "name": "रोहित शर्मा",
    "age_sex": "35/पुरुष",
    "weight": "70 किलो"
  },
  "prescription_details": {
    "date": "15-11-2025",
    "doctor_name": "डॉ. अनिता वर्मा",
    "clinic_name": "सिटी हेल्थ क्लिनिक"
  },
  "diagnosis_complaints": ["बुखार", "खांसी", "गले में दर्द"],
  "medications": [
    {
      "name": "पैरासिटामोल 500mg",
      "dosage": "1 गोली",
      "frequency": "दिन में 3 बार",
      "duration": "5 दिन",
      "timing_instructions": "खाना खाने के बाद"
    }
  ],
  "diagnostic_tests": ["CBC", "CRP"],
  "general_advice": ["आराम करें", "गर्म पानी पिएं"],
  "disclaimer_text": "महत्वपूर्ण: यह AI द्वारा बनाई गई व्याख्या है..."
}
```

#### Report Response Structure

```json
{
  "purpose": "Complete Blood Count test measures different components...",
  "good_news": "✅ Your hemoglobin, platelet count, and most values are within normal range.",
  "points_to_note": "⚠️ Your white blood cell count is slightly elevated...",
  "summary": "💡 Overall, your blood test shows mostly healthy results...",
  "tips": "🍎 Maintain a balanced diet rich in iron... 😴 Get adequate sleep...",
  "disclaimer": "Important: This summary is for informational purposes only..."
}
```

---

## 🔌 API Documentation

### POST `/api/generate`

**Description**: Analyzes a medical document using AI and returns structured results.

**Request Body**:

```json
{
  "documentType": "prescription" | "report",
  "fileUrl": "https://storage.googleapis.com/...",
  "language": "english" | "hindi" | "bengali"
}
```

**Validation**:

- `documentType`: Must be either "prescription" or "report"
- `fileUrl`: Must be a valid URL
- `language`: Must be one of the supported languages

**Response** (200 OK):

```json
{
  "parsing_status": "Success",
  "patient_details": {...},
  "medications": [...],
  ...
}
```

**Error Response** (400 Bad Request):

```json
{
  "error": "Invalid input",
  "issues": [...]
}
```

**Error Response** (500 Internal Server Error):

```json
{
  "error": "AI generation failed",
  "details": "Error message"
}
```

### POST `/api/get-signed-url`

**Description**: Generates a signed URL for uploading files to Google Cloud Storage.

**Request Body**:

```json
{
  "fileName": "prescription_123.pdf",
  "documentType": "prescription",
  "fileSize": "1048576"
}
```

**Response** (200 OK):

```json
{
  "fileUploadUrl": "https://storage.googleapis.com/...",
  "fileViewUrl": "https://storage.googleapis.com/document_bucket-1/..."
}
```

**Error Response** (400 Bad Request):

```json
{
  "error": "max file size 20Mb allowed"
}
```

### GET `/health`

**Description**: Health check endpoint for monitoring.

**Response** (200 OK):

```json
{
  "status": "OK",
  "timestamp": "2025-11-18T10:30:00.000Z"
}
```

---

## 🐳 Deployment

### Production Deployment with Docker

#### Build and Run Production Server

```bash
# Build and start production server
docker compose up --build -d

# Check logs
docker compose logs -f

# Stop server
docker compose down
```

**Production Configuration**:

- Multi-stage Dockerfile for optimized image size
- Healthcheck configuration for monitoring
- Non-root user for security
- Port 8080 exposed

#### Environment Variables for Production

Create a `.env` file or set environment variables:

```bash
API_KEY=your_production_api_key
NODE_ENV=production
PORT=8080
```

### Deployment to Cloud Platforms

#### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/sehatbot-server apps/server

# Deploy to Cloud Run
gcloud run deploy sehatbot-server \
  --image gcr.io/YOUR_PROJECT_ID/sehatbot-server \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars API_KEY=your_api_key
```

#### AWS ECS / EC2

```bash
# Build Docker image
docker build -t sehatbot-server:latest apps/server

# Tag for ECR
docker tag sehatbot-server:latest YOUR_AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/sehatbot-server

# Push to ECR
docker push YOUR_AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/sehatbot-server
```

#### Frontend Deployment (Netlify/Vercel)

```bash
# Build frontend
cd apps/client
pnpm build

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Or deploy to Vercel
vercel --prod
```

**Note**: Update API endpoint in frontend to point to production backend.

---

## 🔒 Security & Privacy

### Security Measures

1. **API Key Protection**:

   - Environment variables for sensitive keys
   - Never commit `.env` or `gcp-key.json` to version control
   - Use `.gitignore` to exclude sensitive files

2. **Input Validation**:

   - Zod schemas validate all API inputs
   - File size limits (20MB max)
   - Content-type validation (PDF only)

3. **Access Control**:

   - Signed URLs with 20-minute expiry
   - Firebase Storage security rules
   - GCP IAM roles for service accounts

4. **Docker Security**:

   - Non-root user in production containers
   - Read-only volumes for sensitive files
   - Minimal base images (Alpine)

5. **Error Handling**:
   - No sensitive data in error messages
   - Graceful degradation
   - Comprehensive logging for debugging

### Privacy Considerations

- **No Data Persistence**: Documents are analyzed in-memory and not stored on backend
- **User Consent**: Medical disclaimers emphasize AI limitations
- **HIPAA Compliance**: Consider additional measures for production (encryption at rest/transit)
- **Audit Logs**: Implement logging for compliance if required

### Recommendations for Production

- [ ] Enable HTTPS/TLS
- [ ] Implement rate limiting
- [ ] Add authentication/authorization
- [ ] Use secret management services (AWS Secrets Manager, GCP Secret Manager)
- [ ] Enable CORS with specific origins
- [ ] Implement request logging and monitoring
- [ ] Regular security audits
- [ ] Data encryption at rest and in transit

---

## 🚧 Future Enhancements

### Planned Features

1. **User Authentication**:

   - Firebase Authentication integration
   - User profiles and document history
   - Secure document storage per user

2. **Additional Document Types**:

   - ECG reports
   - Imaging reports (MRI, CT scan)
   - Vaccination certificates
   - Health insurance documents

3. **Enhanced AI Capabilities**:

   - OCR improvements for handwritten text
   - Multi-page document support
   - Drug interaction checking
   - Medication reminders

4. **Mobile Applications**:

   - React Native mobile app
   - Camera integration for direct photo capture
   - Offline mode with sync

5. **Localization**:

   - Support for additional Indian languages (Tamil, Telugu, Marathi, etc.)
   - Regional language support for global markets

6. **Analytics & Insights**:

   - Health trends over time
   - Medication adherence tracking
   - Report comparison features

7. **Integrations**:

   - Pharmacy finder and medication ordering
   - Doctor appointment booking
   - Telemedicine integration

8. **Performance Optimizations**:
   - Caching strategies
   - CDN for static assets
   - WebSocket for real-time updates

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**
4. **Test Thoroughly**
5. **Commit with Clear Messages**:
   ```bash
   git commit -m "feat: add prescription history feature"
   ```
6. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**

### Code Standards

- Follow existing code style
- Use ESLint for JavaScript linting
- Write meaningful commit messages (Conventional Commits)
- Add comments for complex logic
- Update documentation for new features

### Testing

- Test all endpoints manually
- Verify UI components render correctly
- Check multi-language support
- Test error handling scenarios

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

**Copyright © 2025 SehatBot Team. All rights reserved.**

---

## 👥 Team & Contact

**Project Owner**: Soumajit Saurodip  
**Repository**: [github.com/saurodip1708/sehatbot_server](https://github.com/saurodip1708/sehatbot_server)

For questions, issues, or support:

- Open an issue on GitHub
- Contact: [Your email or contact method]

---

## 🙏 Acknowledgments

- **Google Gemini AI**: For powerful language model capabilities
- **Firebase**: For reliable cloud storage
- **React Community**: For excellent frontend tools
- **Node.js & Express**: For robust backend framework
- **Open Source Community**: For countless helpful libraries

---

## 📊 Project Statistics

- **Lines of Code**: ~3,500+
- **Components**: 15+ React components
- **API Endpoints**: 3
- **Supported Languages**: 3 (English, Hindi, Bengali)
- **Supported Document Types**: 2 (Prescriptions, Reports)
- **Max File Size**: 20MB
- **Docker Images**: 2 (client, server)

---

**⚠️ Important Disclaimer**: This application is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
