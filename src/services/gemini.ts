import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function diagnosePlant(base64Image: string, mimeType: string): Promise<GeminiResponse> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this plant leaf image. 
  Identify the plant species and determine if it is healthy or diseased.
  If it is diseased, identify the disease and provide detailed symptoms, causes, treatment, and prevention steps.
  If it is healthy, state it is healthy and provide general care tips in the treatment/prevention fields.`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isHealthy: { type: Type.BOOLEAN },
          plantName: { type: Type.STRING },
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          causes: { type: Type.ARRAY, items: { type: Type.STRING } },
          treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
          prevention: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["isHealthy", "plantName", "confidence", "symptoms", "causes", "treatment", "prevention"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as GeminiResponse;
}
