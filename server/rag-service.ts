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
      
      if (!process.env.GROQ_API_KEY) {
        console.error("❌ GROQ_API_KEY is missing. Cannot initialize LISA.");
        this.isInitialized = true;
        return;
      }

      Settings.llm = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
      });

      if (process.env.OPENAI_API_KEY) {
        try {
          const { OpenAIEmbedding } = await import("@llamaindex/openai");
          Settings.embedModel = new OpenAIEmbedding({
            model: "text-embedding-3-small",
            apiKey: process.env.OPENAI_API_KEY,
          });
          console.log("✅ OpenAI embeddings configured automatically");
        } catch (error) {
          console.log("⚠️  @llamaindex/openai not installed. Run: npm install @llamaindex/openai");
        }
      }

      const dataPath = join(process.cwd(), "data", "datasets");
      const storagePath = join(process.cwd(), "storage");
      
      if (!existsSync(dataPath)) {
        console.log("⚠️  No data directory found. RAG will use base LLM without additional context.");
        this.isInitialized = true;
        return;
      }

      const files = readdirSync(dataPath).filter(f => 
        !f.startsWith('.') && (f.endsWith('.txt') || f.endsWith('.md') || f.endsWith('.json'))
      );

      if (files.length === 0) {
        console.log("📂 No documents found in data/datasets.");
        console.log("💡 LISA will use the base GROQ LLM without document retrieval.");
        console.log("📚 To enable RAG:");
        console.log("   1. Add OPENAI_API_KEY to Replit Secrets");
        console.log("   2. Add your space biology documents to data/datasets/");
        console.log("   3. Restart the application");
        console.log("   (Embeddings will be configured automatically if OPENAI_API_KEY is present)");
        this.isInitialized = true;
        return;
      }

      console.log(`📚 Found ${files.length} document(s). Checking for embedding configuration...`);

      let embedModel;
      try {
        embedModel = Settings.embedModel;
      } catch (error) {
        embedModel = null;
      }

      if (!embedModel) {
        console.log("⚠️  No embedding model configured. RAG document loading skipped.");
        console.log("📖 Documents found but cannot be indexed without embeddings.");
        console.log("💡 To enable RAG:");
        console.log("   1. Add OPENAI_API_KEY to Replit Secrets");
        console.log("   2. Restart the application");
        console.log("   (Embeddings will be configured automatically)");
        this.isInitialized = true;
        return;
      }

      if (existsSync(join(storagePath, "docstore.json"))) {
        console.log("💾 Loading existing vector index from storage...");
        try {
          const storageContext = await storageContextFromDefaults({
            persistDir: storagePath,
          });
          
          this.index = await VectorStoreIndex.init({
            storageContext,
          });
          console.log("✅ Vector index loaded successfully!");
        } catch (error) {
          console.error("❌ Failed to load existing index:", error);
          console.log("🔄 Will attempt to rebuild from documents...");
        }
      }

      if (!this.index) {
        console.log("🔄 Building new vector index from documents...");
        console.log("⏳ This may take a moment on first run (downloading embedding model)...");
        
        const reader = new SimpleDirectoryReader();
        const documents = await reader.loadData(dataPath);

        console.log(`📄 Loaded ${documents.length} document(s). Creating embeddings...`);

        const storageContext = await storageContextFromDefaults({
          persistDir: storagePath,
        });

        this.index = await VectorStoreIndex.fromDocuments(documents, {
          storageContext,
        });

        console.log("✅ Vector index created and saved to storage/");
      }

      this.isInitialized = true;
      console.log("🎉 LISA RAG system ready with document retrieval!");
      console.log(`📊 ${files.length} document(s) indexed and ready for queries`);
    } catch (error) {
      console.error("❌ Error initializing RAG service:", error);
      console.log("⚠️  LISA will operate in base mode without document retrieval.");
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
      throw new Error("RAG system not initialized with documents.");
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
