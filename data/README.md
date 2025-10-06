# LISA RAG Data Directory

This directory contains the datasets and metadata for LISA's knowledge base on space biology.

## Directory Structure

### `/datasets`
Place your space biology documents here. Supported formats:
- `.txt` - Plain text documents
- `.md` - Markdown files
- `.pdf` - PDF documents (will be parsed automatically)
- `.json` - Structured data

Example files to add:
- `astrobiology_research.txt`
- `extremophiles_study.md`
- `space_microbiology.pdf`
- `planetary_protection.txt`

### `/metadata`
Place metadata JSON files here that correspond to your datasets. Each metadata file should have the same name as the dataset with `.meta.json` extension.

Example: For `astrobiology_research.txt`, create `astrobiology_research.meta.json`

Metadata structure:
```json
{
  "source": "Research Paper Title or URL",
  "author": "Author Name",
  "date": "2024-01-01",
  "category": "astrobiology",
  "keywords": ["extremophiles", "Mars", "biosignatures"]
}
```

## How It Works

1. **Add your documents** to the `/datasets` folder
2. **Optionally add metadata** to the `/metadata` folder
3. **Restart the application** - LISA will automatically:
   - Load and process all documents
   - Create vector embeddings
   - Store them in the FAISS vector database
   - Use them to enhance responses with RAG

## Vector Storage

The processed vector index is stored in `/storage` directory. This is automatically managed by the system and persists across restarts for faster loading.

## Getting Started

To get started with sample data:
1. Add a text file to `/datasets` folder with space biology content
2. Restart the application
3. Ask LISA questions about the content!
