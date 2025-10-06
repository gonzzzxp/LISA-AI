import { 
  VectorStoreIndex, 
  Settings,
  storageContextFromDefaults,
} from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { Groq } from "@llamaindex/groq";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

class RAGService {
  private index: VectorStoreIndex | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.initializationPromise = this.initialize();
  }

  private async initialize() {
    try {
      console.log("🚀 Initializing LISA RAG system...");
      
      Settings.llm = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
      });

      const dataPath = join(process.cwd(), "data", "datasets");
      const storagePath = join(process.cwd(), "storage");
      
      if (!existsSync(dataPath)) {
        console.log("⚠️  No data directory found. RAG will use base LLM without additional context.");
        this.isInitialized = true;
        return;
      }

      const files = readdirSync(dataPath).filter(f => 
        f.endsWith('.txt') || f.endsWith('.md') || f.endsWith('.json')
      );

      if (files.length === 0) {
        console.log("📂 No documents found in data/datasets. Add your space biology datasets there!");
        this.isInitialized = true;
        return;
      }

      console.log(`📚 Found ${files.length} documents. Loading...`);

      if (existsSync(join(storagePath, "docstore.json"))) {
        console.log("💾 Loading existing vector index from storage...");
        const storageContext = await storageContextFromDefaults({
          persistDir: storagePath,
        });
        
        this.index = await VectorStoreIndex.init({
          storageContext,
        });
        console.log("✅ Vector index loaded successfully!");
      } else {
        console.log("🔄 Building new vector index from documents...");
        const reader = new SimpleDirectoryReader();
        const documents = await reader.loadData(dataPath);

        const storageContext = await storageContextFromDefaults({
          persistDir: storagePath,
        });

        this.index = await VectorStoreIndex.fromDocuments(documents, {
          storageContext,
        });

        console.log("✅ Vector index created and saved!");
      }

      this.isInitialized = true;
      console.log("🎉 LISA RAG system ready!");
    } catch (error) {
      console.error("❌ Error initializing RAG service:", error);
      this.isInitialized = true;
    }
  }

  async waitForInitialization() {
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  async query(question: string, conversationHistory: any[] = []): Promise<string> {
    await this.waitForInitialization();

    if (!this.index) {
      return "RAG system not initialized. Using base LLM response.";
    }

    try {
      const queryEngine = this.index.asQueryEngine({
        similarityTopK: 3,
      });

      let contextualQuestion = question;
      if (conversationHistory.length > 0) {
        const recentHistory = conversationHistory.slice(-4);
        const historyContext = recentHistory
          .map((msg: any) => `${msg.role}: ${msg.content}`)
          .join("\n");
        contextualQuestion = `Given this conversation history:\n${historyContext}\n\nQuestion: ${question}`;
      }

      const response = await queryEngine.query({
        query: contextualQuestion,
      });

      return response.toString();
    } catch (error) {
      console.error("Error querying RAG system:", error);
      throw error;
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  hasDocuments(): boolean {
    return this.index !== null;
  }
}

export const ragService = new RAGService();
