# Google Stitch MCP Service

This service provides Model Context Protocol (MCP) integration with Google Stitch AI services, enabling AI agents to access advanced generative AI capabilities.

## Features

- **Content Generation**: Generate text content using Gemini models
- **Image Analysis**: Analyze images with vision AI
- **Text Embeddings**: Create vector embeddings for semantic search
- **Chat Completions**: Conversational AI responses
- **Model Listing**: Discover available AI models

## Architecture

```
[AI Agent (Cursor/Claude)]
         |
         | (MCP stdio protocol)
         v
[google-stitch-mcp.py]
         |
         | (HTTP REST API)
         v
[Google Cloud AI Platform]
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_STITCH_API_KEY` | Your Google Cloud API key | Required |
| `GOOGLE_STITCH_PROJECT_ID` | Google Cloud Project ID | Required |
| `GOOGLE_STITCH_LOCATION` | GCP Region | `us-central1` |

### Setup Steps

1. **Get Google Cloud Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Vertex AI API
   - Create an API key or service account

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Create Docker Secret**:
   ```bash
   echo "your-api-key-here" > secrets/google_stitch_api_key
   ```

4. **Start Service**:
   ```bash
   docker-compose up -d google-stitch-mcp
   ```

## Tools Available

### `generate_content`

Generate text content using Google's Gemini models.

**Parameters**:
- `prompt` (string): The text prompt
- `model` (string): Model name (default: `gemini-2.0-pro`)
- `temperature` (float): Sampling temperature 0.0-1.0 (default: 0.7)
- `max_tokens` (int): Maximum tokens to generate (default: 2048)

### `list_models`

List all available AI models in your Google Cloud project.

### `analyze_image`

Analyze images using vision AI capabilities.

**Parameters**:
- `image_url` (string): URL of the image
- `prompt` (string): Question about the image
- `model` (string): Vision model to use

### `embed_text`

Generate text embeddings for vector search.

**Parameters**:
- `text` (string): Text to embed
- `model` (string): Embedding model (default: `text-embedding-004`)

### `chat_completion`

Get conversational chat responses.

**Parameters**:
- `messages` (array): List of `{role, content}` objects
- `model` (string): Chat model
- `temperature` (float): Sampling temperature

## Local Testing

Test the MCP server locally without Docker:

```bash
# Install dependencies
pip install mcp httpx

# Set environment variables
export GOOGLE_STITCH_API_KEY="your-key-here"
export GOOGLE_STITCH_PROJECT_ID="your-project-id"

# Run the server
python bin/google-stitch-mcp.py

# List available tools
python bin/google-stitch-mcp.py list
```

## Integration with Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-stitch": {
      "command": "python",
      "args": ["bin/google-stitch-mcp.py"],
      "env": {
        "GOOGLE_STITCH_API_KEY": "${GOOGLE_STITCH_API_KEY}",
        "GOOGLE_STITCH_PROJECT_ID": "${GOOGLE_STITCH_PROJECT_ID}"
      }
    }
  }
}
```

## API Reference

The service communicates with Google Cloud's Vertex AI API:

```
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION
```

## Error Handling

All tools return JSON responses. Errors are formatted as:

```json
{
  "error": "Error description",
  "details": "Additional context"
}
```

## Security Notes

- Never commit API keys to version control
- Use Docker secrets for production deployments
- Rotate credentials regularly
- Monitor API usage in Google Cloud Console

## License

Part of SmarterOS project.
