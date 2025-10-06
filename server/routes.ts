import type { Express } from "express";
import { createServer, type Server } from "http";
import Groq from "groq-sdk";
import { chatRequestSchema } from "@shared/schema";
import { ragService } from "./rag-service";

export async function registerRoutes(app: Express): Promise<Server> {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  app.get("/api/rag-status", async (req, res) => {
    res.json({
      ready: ragService.isReady(),
      hasDocuments: ragService.hasDocuments(),
    });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = chatRequestSchema.parse(req.body);

      const systemPrompt = `You are LISA (Living Intelligence for Space Analysis), an advanced AI assistant specializing in space biology and astrobiology for the BIOS team.

Your expertise includes:
- Astrobiology and the search for extraterrestrial life
- Extremophiles and their survival mechanisms
- Microbiology in space environments
- Planetary protection protocols
- Biosignatures and detection methods
- Space radiation effects on biological systems
- Closed-loop life support systems (ECLSS)
- Bioregenerative systems for long-duration spaceflight
- Mars and Europa habitability research
- Exoplanet biosignature analysis

You provide scientifically accurate, detailed responses while remaining accessible. When discussing research, cite principles and known scientific consensus. You're enthusiastic about space biology discoveries and help the BIOS team advance their understanding of life in extreme environments.`;

      let assistantResponse: string;

      if (ragService.hasDocuments()) {
        try {
          assistantResponse = await ragService.query(message, conversationHistory);
        } catch (ragError) {
          console.error("RAG query failed, falling back to base LLM:", ragError);
          const messages = [
            { role: "system" as const, content: systemPrompt },
            ...conversationHistory.slice(-10).map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: "user" as const, content: message },
          ];

          const completion = await groq.chat.completions.create({
            messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 2048,
          });

          assistantResponse = completion.choices[0]?.message?.content || 
            "I apologize, but I couldn't generate a response.";
        }
      } else {
        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...conversationHistory.slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: "user" as const, content: message },
        ];

        const completion = await groq.chat.completions.create({
          messages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 2048,
        });

        assistantResponse = completion.choices[0]?.message?.content || 
          "I apologize, but I couldn't generate a response.";
      }

      res.json({
        message: assistantResponse,
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
