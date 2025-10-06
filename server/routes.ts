import type { Express } from "express";
import { createServer, type Server } from "http";
import Groq from "groq-sdk";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = chatRequestSchema.parse(req.body);

      const messages = [
        {
          role: "system" as const,
          content: "You are LISA, an AI assistant for the BIOS team. You are helpful, professional, and knowledgeable. Provide clear, concise responses that help the team be more productive.",
        },
        ...conversationHistory.slice(-10).map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user" as const,
          content: message,
        },
      ];

      const completion = await groq.chat.completions.create({
        messages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 2048,
      });

      const assistantMessage = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

      res.json({
        message: assistantMessage,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process chat request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
