import { z } from 'zod';

export const AvatarStyles = [
  'simpsons',
  'anime',
  'cyberpunk',
  'pixar',
  'watercolor',
] as const;

export type AvatarStyle = (typeof AvatarStyles)[number];

// Esquema para validar lo que el cliente envía al servidor (API Request)
export const GenerateRequestSchema = z.object({
  image: z.string().min(1, "La imagen es obligatoria"),
  style: z.enum(AvatarStyles, {
    message: "Estilo no válido",
  }),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

// Esquema de nuestra API Response
export type GenerateResponse = {
  success: boolean;
  imageUrl?: string; // URL o Base64 de la imagen generada
  error?: string;
};