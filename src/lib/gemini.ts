import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export async function analyzePlantImage(imageData: string): Promise<any> {
  try {
    const base64Data = imageData.split(",")[1];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this plant image and provide the following information in JSON format:
    - name: common name of the plant
    - species: scientific name
    - description: brief description of the plant (2-3 sentences)
    - family: botanical family name
    - nativeRegion: where the plant originates from
    - toxicity: whether it's toxic to humans or pets
    - growthHabit: plant's growth pattern and form
    - careRequirements: object containing water, light, soil, and temperature requirements
    - characteristics: object containing height, spread, flowerColor, and seasonality
    Please ensure the response is valid JSON.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
