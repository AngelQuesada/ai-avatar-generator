import { z } from 'zod';

// Definimos los estilos permitidos.
export const AvatarStyles = [
  'simpsons',
  'anime',
  'cyberpunk',
  'pixar',
  'watercolor',
] as const;

// Creamos un tipo de TS a partir del array (ej: "simpsons" | "anime" | ...)
export type AvatarStyle = (typeof AvatarStyles)[number];

// 2. Esquema para validar lo que el cliente envía al servidor (API Request)
// Requisito: Una imagen (string base64) y un estilo válido.
export const GenerateRequestSchema = z.object({
  image: z.string().min(1, "La imagen es obligatoria"), // Validaremos que sea base64 real más adelante
  style: z.enum(AvatarStyles, {
    message: "Estilo no válido",
  }),
});

// Inferimos el tipo de TS automáticamente desde el esquema Zod
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

// 3. Esquema para la respuesta de nuestra API (API Response)
export type GenerateResponse = {
  success: boolean;
  imageUrl?: string; // URL o Base64 de la imagen generada
  error?: string;
};