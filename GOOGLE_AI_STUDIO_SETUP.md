# Google AI Studio Setup & Troubleshooting Guide

## Issue Summary
Application not loading properly after integrating Google AI Studio (Gemini API) for AI-powered features.

## What Was Fixed

### 1. **Updated Gemini Model Name**
- Changed from: `gemini-2.5-flash` (invalid model)
- Changed to: `gemini-2.0-flash-exp` (correct model for @google/genai v1.25.0)

### 2. **Environment Variable Configuration**
- The app expects: `VITE_GEMINI_API_KEY` in your `.env` file
- API key should be obtained from: https://aistudio.google.com/apikey

## Setup Instructions

### Step 1: Get Your API Key from Google AI Studio

1. Visit: https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy the generated API key

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory with:

```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=your_actual_api_key_here

# Backend base URL
VITE_API_BASE_URL=http://localhost:4001/api

# Toggle mock data
VITE_USE_MOCKS=true
```

**Important:** Replace `your_actual_api_key_here` with your actual API key from Step 1.

### Step 3: Restart Development Server

```bash
npm run dev
```

## Testing the Integration

Once the app is running, test these features:

1. **Post Suggestion Generation**
   - Click the compose button
   - Enter a topic in the "Or enter a topic for AI..." field
   - Click "Get Suggestion"
   - Should generate an AI post suggestion

2. **Translation**
   - Change language using the language switcher
   - Posts should automatically translate to selected language

## Available Gemini Models

Current valid models for @google/genai SDK:
- `gemini-2.0-flash-exp` (Experimental, latest features)
- `gemini-1.5-flash` (Stable)
- `gemini-1.5-flash-8b` (Lightweight)
- `gemini-1.5-pro` (Advanced reasoning)

## Common Issues & Solutions

### Issue: "API key not configured" error
**Solution:** 
- Ensure `.env` file exists with `VITE_GEMINI_API_KEY`
- Restart the dev server after creating/modifying `.env`
- In Vite, env variables must start with `VITE_` to be exposed to client

### Issue: "Model not found" error
**Solution:** 
- Verify you're using a valid model name (see list above)
- Check Google AI Studio for model availability in your region

### Issue: Rate limiting errors
**Solution:**
- Free tier has rate limits
- Upgrade to paid tier if needed
- Implement request queuing/throttling

### Issue: CORS errors
**Solution:**
- For production, implement server-side proxy for API calls
- Never expose API keys in client-side code in production

## Prompt for Google AI Studio Support

If issues persist, use this prompt when contacting Google AI Studio support:

---

**Subject: Integration Issue with @google/genai SDK v1.25.0**

I'm integrating Google AI Studio (Gemini API) into a React/TypeScript application using the `@google/genai` npm package (v1.25.0). 

**Setup:**
- Framework: Vite + React + TypeScript
- Package: @google/genai v1.25.0
- API Key: Obtained from https://aistudio.google.com/apikey

**Implementation:**
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: 'Your prompt here'
});
```

**Issue:**
[Describe your specific issue here - e.g., model not found, authentication errors, unexpected responses, etc.]

**Error Message:**
[Paste exact error message from browser console]

**Questions:**
1. Is `gemini-2.0-flash-exp` the correct model name for the latest version?
2. Are there regional restrictions on model availability?
3. What are the current rate limits for the free tier?
4. Are there any known issues with the v1.25.0 SDK?

---

## Security Best Practices

### ⚠️ Development vs Production

**Development (Current Setup):**
- API key in `.env` file
- Direct API calls from browser
- ✅ OK for local testing

**Production (Required):**
```
Browser → Your Backend Server → Google AI Studio API
         (API key stored here)
```

**Why?**
- Prevents API key exposure
- Adds rate limiting control
- Enables request monitoring
- Protects against abuse

### Production Implementation

Create a backend endpoint:

```typescript
// backend/routes/ai.ts
app.post('/api/generate', async (req, res) => {
    const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY // Server-side only
    });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: req.body.prompt
    });
    
    res.json({ text: response.text });
});
```

## Additional Resources

- **Documentation:** https://googleapis.github.io/js-genai/
- **API Reference:** https://ai.google.dev/gemini-api/docs
- **Model Pricing:** https://ai.google.dev/pricing
- **GitHub Issues:** https://github.com/googleapis/js-genai/issues

## Current Status

✅ Application builds successfully
✅ Dev server starts without errors
✅ Google GenAI SDK properly imported
✅ Correct model name configured
⚠️ Requires valid API key in `.env` file to use AI features

## Need Help?

If you continue experiencing issues:
1. Check browser console for detailed error messages
2. Verify API key is valid and active
3. Test API key directly in Google AI Studio playground
4. Check Google Cloud Console for quota/billing status
