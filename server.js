import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: prompt,
    });

    res.json({ answer: response.text });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
