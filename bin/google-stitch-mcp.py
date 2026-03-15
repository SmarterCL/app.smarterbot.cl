#!/usr/bin/env python3
"""
Google Stitch MCP Server

Provides Model Context Protocol integration for Google Stitch AI services.
Exposes tools for AI agents to interact with Google Stitch capabilities.
"""
import os
import sys
import json
import asyncio
from typing import Optional
from mcp.server.fastmcp import FastMCP

try:
    import httpx
except ImportError:
    print("Error: httpx is required. Install with: pip install httpx")
    sys.exit(1)

# Configuration from environment
GOOGLE_STITCH_API_KEY = os.getenv("GOOGLE_STITCH_API_KEY")
GOOGLE_STITCH_PROJECT_ID = os.getenv("GOOGLE_STITCH_PROJECT_ID")
GOOGLE_STITCH_LOCATION = os.getenv("GOOGLE_STITCH_LOCATION", "us-central1")

# Initialize FastMCP server
mcp = FastMCP("Google Stitch MCP")


def _get_headers() -> dict:
    """Get authentication headers for Google Stitch API calls."""
    if not GOOGLE_STITCH_API_KEY:
        raise ValueError("GOOGLE_STITCH_API_KEY environment variable is not set")
    
    return {
        "Authorization": f"Bearer {GOOGLE_STITCH_API_KEY}",
        "Content-Type": "application/json"
    }


def _get_api_base_url() -> str:
    """Get the base URL for Google Stitch API."""
    if GOOGLE_STITCH_PROJECT_ID and GOOGLE_STITCH_LOCATION:
        return f"https://{GOOGLE_STITCH_LOCATION}-aiplatform.googleapis.com/v1/projects/{GOOGLE_STITCH_PROJECT_ID}/locations/{GOOGLE_STITCH_LOCATION}"
    return "https://generativelanguage.googleapis.com/v1"


@mcp.tool()
async def generate_content(
    prompt: str,
    model: str = "gemini-2.0-pro",
    temperature: float = 0.7,
    max_tokens: int = 2048
) -> str:
    """
    Generate content using Google Stitch AI models.
    
    Args:
        prompt: The text prompt to generate content from
        model: The model to use (default: gemini-2.0-pro)
        temperature: Sampling temperature (0.0-1.0)
        max_tokens: Maximum tokens to generate
    
    Returns:
        Generated content as JSON string
    """
    async with httpx.AsyncClient() as client:
        try:
            base_url = _get_api_base_url()
            endpoint = f"{base_url}/publishers/google/models/{model}:generateContent"
            
            payload = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": temperature,
                    "maxOutputTokens": max_tokens,
                    "topP": 0.95,
                    "topK": 40
                }
            }
            
            headers = _get_headers()
            resp = await client.post(
                endpoint,
                json=payload,
                headers=headers,
                timeout=60.0
            )
            resp.raise_for_status()
            return json.dumps(resp.json(), indent=2)
            
        except httpx.HTTPStatusError as e:
            return json.dumps({
                "error": f"HTTP error: {e.response.status_code}",
                "details": e.response.text
            }, indent=2)
        except Exception as e:
            return json.dumps({
                "error": f"Error generating content: {str(e)}"
            }, indent=2)


@mcp.tool()
async def list_models() -> str:
    """
    List available Google Stitch AI models.
    
    Returns:
        List of available models as JSON string
    """
    async with httpx.AsyncClient() as client:
        try:
            base_url = _get_api_base_url()
            endpoint = f"{base_url}/publishers/google/models"
            
            headers = _get_headers()
            resp = await client.get(
                endpoint,
                headers=headers,
                timeout=30.0
            )
            resp.raise_for_status()
            return json.dumps(resp.json(), indent=2)
            
        except Exception as e:
            return json.dumps({
                "error": f"Error listing models: {str(e)}"
            }, indent=2)


@mcp.tool()
async def analyze_image(
    image_url: str,
    prompt: str = "Describe this image in detail.",
    model: str = "gemini-2.0-pro"
) -> str:
    """
    Analyze an image using Google Stitch AI vision capabilities.
    
    Args:
        image_url: URL of the image to analyze
        prompt: Question or instruction about the image
        model: The vision model to use
    
    Returns:
        Analysis result as JSON string
    """
    async with httpx.AsyncClient() as client:
        try:
            base_url = _get_api_base_url()
            endpoint = f"{base_url}/publishers/google/models/{model}:generateContent"
            
            payload = {
                "contents": [{
                    "parts": [
                        {
                            "text": prompt
                        },
                        {
                            "file_data": {
                                "mime_type": "image/jpeg",
                                "file_uri": image_url
                            }
                        }
                    ]
                }]
            }
            
            headers = _get_headers()
            resp = await client.post(
                endpoint,
                json=payload,
                headers=headers,
                timeout=60.0
            )
            resp.raise_for_status()
            return json.dumps(resp.json(), indent=2)
            
        except Exception as e:
            return json.dumps({
                "error": f"Error analyzing image: {str(e)}"
            }, indent=2)


@mcp.tool()
async def embed_text(
    text: str,
    model: str = "text-embedding-004"
) -> str:
    """
    Generate text embeddings using Google Stitch AI.
    
    Args:
        text: The text to embed
        model: The embedding model to use
    
    Returns:
        Embedding vector as JSON string
    """
    async with httpx.AsyncClient() as client:
        try:
            base_url = _get_api_base_url()
            endpoint = f"{base_url}/publishers/google/models/{model}:predict"
            
            payload = {
                "instances": [{
                    "content": text
                }],
                "parameters": {
                    "outputDimensionality": 768
                }
            }
            
            headers = _get_headers()
            resp = await client.post(
                endpoint,
                json=payload,
                headers=headers,
                timeout=30.0
            )
            resp.raise_for_status()
            return json.dumps(resp.json(), indent=2)
            
        except Exception as e:
            return json.dumps({
                "error": f"Error generating embeddings: {str(e)}"
            }, indent=2)


@mcp.tool()
async def chat_completion(
    messages: list,
    model: str = "gemini-2.0-pro",
    temperature: float = 0.7
) -> str:
    """
    Get a chat completion from Google Stitch AI.
    
    Args:
        messages: List of message objects with 'role' and 'content'
        model: The model to use for chat
        temperature: Sampling temperature
    
    Returns:
        Chat completion response as JSON string
    """
    async with httpx.AsyncClient() as client:
        try:
            base_url = _get_api_base_url()
            endpoint = f"{base_url}/publishers/google/models/{model}:generateContent"
            
            # Convert chat messages to Gemini format
            contents = []
            for msg in messages:
                role = msg.get("role", "user")
                content = msg.get("content", "")
                
                # Map roles to Gemini format
                if role in ["user", "system"]:
                    contents.append({
                        "role": "user",
                        "parts": [{"text": content}]
                    })
                elif role == "assistant":
                    contents.append({
                        "role": "model",
                        "parts": [{"text": content}]
                    })
            
            payload = {
                "contents": contents,
                "generationConfig": {
                    "temperature": temperature,
                    "topP": 0.95,
                    "topK": 40
                }
            }
            
            headers = _get_headers()
            resp = await client.post(
                endpoint,
                json=payload,
                headers=headers,
                timeout=60.0
            )
            resp.raise_for_status()
            return json.dumps(resp.json(), indent=2)
            
        except Exception as e:
            return json.dumps({
                "error": f"Error getting chat completion: {str(e)}"
            }, indent=2)


def list_tools_cli():
    """CLI function to list available tools."""
    print("Google Stitch MCP - AI Tools Available:")
    print(" - generate_content: Generate text content using AI models")
    print(" - list_models: List available AI models")
    print(" - analyze_image: Analyze images with vision AI")
    print(" - embed_text: Generate text embeddings")
    print(" - chat_completion: Get chat completions")


def main():
    """Main entry point."""
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        list_tools_cli()
    else:
        # Run MCP server (STDIO mode)
        mcp.run()


if __name__ == "__main__":
    main()
