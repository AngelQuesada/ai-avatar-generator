export default `
  Actúa como un validador de imágenes estricto para una App de Avatares.
  Analiza esta imagen y dime si cumple estos requisitos:
  1. Aparece UNA sola persona.
  2. Es una foto real (no un dibujo).
  3. La cara se ve claramente.
  4. La cara se ve con la suficiente luz
  
  Si cumple todo, describe brevemente la persona (género, rasgos).
  Si NO cumple, explica por qué.
  
  Devuelve un objeto JSON con esta estructura exacta:
  {
    "valid": boolean,
    "reason": "Explicación breve de por qué cumple o no cumple"
  }
` as const;