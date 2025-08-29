import dotenv from 'dotenv';
dotenv.config();

export const API_KEY = process.env.API_KEY;

// Log configuration status (without exposing the key)
console.log('Configuration loaded:', {
  hasApiKey: !!API_KEY,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT
});

if (!API_KEY) {
  console.error('WARNING: API_KEY environment variable is not set!');
}
