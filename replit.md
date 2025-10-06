# LISA - Living Intelligence for Space Analysis

## Overview
LISA is an AI-powered chatbot specializing in space biology and astrobiology, built for the BIOS team. The application features a React + Vite frontend and Node.js backend with GROQ API integration for fast AI responses.

## Purpose
LISA serves as an expert assistant for the BIOS team on topics including:
- Astrobiology and extraterrestrial life research
- Extremophiles and their survival mechanisms
- Space microbiology and radiation effects
- Planetary protection protocols
- Biosignatures and detection methods
- Closed-loop life support systems
- Mars, Europa, and Enceladus habitability
- Exoplanet biosignature analysis

## Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **AI**: GROQ API (llama-3.3-70b-versatile model)
- **RAG Framework**: LlamaIndex.TS with automatic embedding configuration
- **Vector Store**: FAISS with persistent storage
- **Embeddings**: OpenAI text-embedding-3-small (auto-configured when API key present)

## Current Features
- Clean, modern chat interface optimized for conversation
- Real-time AI responses from GROQ
- Space biology specialist persona with expert knowledge
- Message history tracking
- Typing indicators and loading states
- Responsive design for desktop and mobile
- Dark mode support
- **RAG-ready architecture** - automatically activates when configured

## Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Chat page
│   │   └── lib/           # Query client & utilities
├── server/                # Backend Express server
│   ├── routes.ts          # API endpoints with space biology prompt
│   └── rag-service.ts     # RAG service with auto-configuration
├── shared/                # Shared TypeScript types
├── data/                  # RAG datasets directory
│   ├── datasets/          # Place your space biology documents here
│   │   └── space_biology_sample.txt  # Sample dataset included
│   ├── metadata/          # Optional metadata files
│   └── README.md          # Instructions for adding datasets
└── storage/               # Vector index storage (auto-generated when RAG active)
```

## Environment Variables
Required secrets (configured in Replit Secrets):
- `GROQ_API_KEY` - API key for GROQ (get from https://console.groq.com)

Optional for RAG (enables automatic document retrieval):
- `OPENAI_API_KEY` - OpenAI API key for embeddings (get from https://platform.openai.com)

## RAG Capabilities (Automatic Activation)
The application automatically enables RAG when prerequisites are met:

### How to Enable RAG:
1. **Add OPENAI_API_KEY** to Replit Secrets
2. **Add your documents** to `data/datasets/` folder (supports .txt, .md, .json)
3. **Restart the application**

That's it! The system will automatically:
- Configure OpenAI embeddings
- Load and process your documents
- Create vector embeddings
- Build and persist the FAISS index
- Enable retrieval-augmented responses

### Current Status
- ✅ All RAG infrastructure installed
- ✅ Sample space biology document included
- ✅ Automatic embedding configuration implemented
- ✅ FAISS vector store with persistence
- ⚠️  Awaiting OPENAI_API_KEY to activate

### Adding Datasets
- Place `.txt`, `.md`, or `.json` files in `data/datasets/`
- Optionally add metadata in `data/metadata/`
- See `data/README.md` for detailed instructions
- Sample dataset included: `space_biology_sample.txt`
- On first run with RAG enabled, index building takes ~30-60 seconds
- Subsequent runs load the index instantly from `storage/`

## Architecture
- **Client-side state management**: React hooks with TanStack Query
- **API communication**: RESTful endpoints with JSON
- **Real-time updates**: Optimistic UI updates with query invalidation
- **Error handling**: Toast notifications for user feedback
- **Type safety**: Full TypeScript coverage across frontend and backend
- **RAG Pipeline**: LlamaIndex → GROQ LLM + OpenAI Embeddings → FAISS Vector Store

## Development
The workflow "Start application" runs `npm run dev` which:
- Starts the Express backend on port 5000
- Launches Vite dev server for the frontend
- Enables hot module replacement for rapid development
- Initializes RAG service (auto-configures if OPENAI_API_KEY present)
- Workflow auto-restarts after package installations

## User Preferences
- Keep the current clean, conversation-focused interface
- LISA's space biology specialization is a core feature
- RAG functionality should be simple to activate (just add API key + documents)

## Recent Changes
- 2025-10-06: Initial implementation with GROQ integration
- 2025-10-06: Added space biology specialist system prompt
- 2025-10-06: Set up RAG infrastructure with LlamaIndex and FAISS
- 2025-10-06: Created directory structure for datasets and metadata
- 2025-10-06: Implemented automatic OpenAI embedding configuration
- 2025-10-06: Added sample space biology dataset
- 2025-10-06: Fixed RAG initialization to properly load documents when configured
