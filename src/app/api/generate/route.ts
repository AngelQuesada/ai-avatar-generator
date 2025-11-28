import { NextRequest, NextResponse } from "next/server";
import { GenerateRequestSchema } from "@/types/definitions";
import ai from "@/lib/gemini";
import image_validation_prompt from "./prompts/image_validation_prompt";

export async function POST(req: NextRequest) {
  try {

    // Validar que el modelo de Gemini esté configurado
    if (!process.env.GEMINI_MODEL) {
      return NextResponse.json(
        { success: false, error: "No se ha encontrado el modelo de Gemini en las variables de entorno" },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Validar los datos con Zod
    const validation = GenerateRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Datos inválidos: " + validation.error.message },
        { status: 400 }
      );
    }

    const { image } = validation.data;

    const base64Data = image.includes("base64,") 
      ? image.split("base64,")[1] 
      : image;

    // Llamar a la IA
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { text: image_validation_prompt },
            { 
              inlineData: { 
                mimeType: 'image/jpeg', 
                data: base64Data 
              } 
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text;
    const analysis = JSON.parse(responseText || "{}");

    if (!analysis.valid) {
      return NextResponse.json(
        { success: false, error: analysis.reason },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Imagen válida. " + analysis.reason 
    });

  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}