---
layout: post
title: Setup Continue Extension in VS Code with a Local LLM model
date: 2026-3-26
tags: [LLM, agent]
comments: false
toc: false
pinned: false
---

This guide documents how to set up the [Continue](https://www.continue.dev/) extension in VS Code to use a self-hosted LLM served via an OpenAI-compatible API (e.g., vLLM, SGLang).

<!-- more -->

## Prerequisites

- VS Code with the **Continue** extension installed (tested with v1.2.18)
- A self-hosted LLM serving an OpenAI-compatible API (e.g., vLLM or SGLang)
- The API endpoint URL and API key

## Step 1: Verify the API Endpoint

Before configuring Continue, confirm that your API server is reachable and check the **exact model name** it reports:

```bash
curl -s http://<your-server>:30000/v1/models \
  -H "Authorization: Bearer <your-api-key>"
```

Look at the `id` field in the response. The model name may include a full path, for example:

```json
{
  "data": [
    {
      "id": "/workplace/Qwen3.5-397B-A17B-FP8",
      ...
    }
  ]
}
```

**Important:** The `model` field in your config must match this `id` exactly — including any leading path like `/workplace/`.

You can also test a quick chat completion:

```bash
curl -s http://<your-server>:30000/v1/chat/completions \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "/workplace/Qwen3.5-397B-A17B-FP8",
    "messages": [{"role": "user", "content": "Say hello"}],
    "max_tokens": 20
  }'
```

## Step 2: Create the Continue Config

Edit `~/.continue/config.yaml`. A working minimal config requires three **top-level fields** (`name`, `version`, `schema`) plus a `models` list:

```yaml
name: Local Config
version: "1.0.0"
schema: v1
models:
  - name: "Qwen3.5"
    provider: openai
    model: "/workplace/Qwen3.5-397B-A17B-FP8"
    apiBase: "http://<your-server>:30000/v1"
    apiKey: "<your-api-key>"
```

| Field | Description |
|-------|-------------|
| `name` | A label for this config profile |
| `version` | Config version string |
| `schema` | Must be `v1` for Continue v1.2.x |
| `provider` | Use `openai` for any OpenAI-compatible API |
| `model` | Exact model ID from the `/v1/models` endpoint |
| `apiBase` | Your server's base URL (include `/v1`) |
| `apiKey` | API key for authentication |

## Step 3: Reload VS Code

After saving `config.yaml`, reload VS Code for the changes to take effect:

`Ctrl+Shift+P` → **Developer: Reload Window**

The model should now appear in the Continue sidebar.

## Troubleshooting

### "No models configured"

This is the most common issue. Check the following:

1. **Missing top-level fields.** Continue v1.2.x validates config.yaml with a strict schema (Zod). If `name`, `version`, or `schema` is missing, the entire config fails to parse silently — resulting in "No models configured."

2. **Wrong model name.** The `model` field must match the exact `id` returned by `/v1/models`. A common mistake is using `Qwen3.5-397B-A17B-FP8` when the server reports `/workplace/Qwen3.5-397B-A17B-FP8`.

3. **YAML syntax errors.** Run a quick validation:
   ```bash
   python3 -c "import yaml; yaml.safe_load(open('$HOME/.continue/config.yaml'))"
   ```
   No output means the YAML is valid.

4. **Conflicting config files.** Make sure there is no stale `config.json` in `~/.continue/` that might override `config.yaml`.

### Slow or blank responses

Some models (e.g., Qwen3.5) use a reasoning/thinking step before generating the final answer, which can cause longer response times. If this is an issue, try increasing the timeout or `max_tokens` in your config.
