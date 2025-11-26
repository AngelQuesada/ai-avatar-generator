import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY: string | undefined = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("No se ha encontrado ninguna API key");
}

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY);

export default genAI;