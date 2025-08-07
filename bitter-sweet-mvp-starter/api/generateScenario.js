import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import { z } from 'zod';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema for validating LLM output
const scenarioSchema = z.object({
  scenario: z.string().min(10).max(400),
  options: z
    .array(
      z.object({
        text: z.string().min(3).max(200),
        outcome: z.string().min(3).max(300),
        weight: z.enum(['Light', 'Medium', 'Heavy']),
      })
    )
    .length(2),
});

app.post('/api/generateScenario', async (req, res) => {
  const { character, age } = req.body ?? {};

  if (!character || typeof character !== 'string' || !age || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid request. Expected { character: string, age: number }' });
  }

  const system =
    'You are generating concise, grounded Bitter Sweet game cards. Return only valid JSON matching the required schema. No markdown, no extra text.';
  const user = `Create a Bitter Sweet scenario for a ${age}-year-old named ${character}.
Constraints: realistic; short; options must be distinct; weights must be one of Light, Medium, Heavy.
Return JSON only with keys: scenario, options[ { text, outcome, weight } ].`;

  // Simple timeout via Promise.race
  const withTimeout = (p, ms) =>
    Promise.race([
      p,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Upstream timeout')), ms)),
    ]);

  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const completion = await withTimeout(
        openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
        25000
      );

      const content = completion.choices?.[0]?.message?.content || '{}';
      const parsed = JSON.parse(content);
      const validated = scenarioSchema.parse(parsed);
      return res.json(validated);
    } catch (err) {
      lastError = err;
      // brief backoff
      await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }
  console.error('OpenAI error:', lastError?.message);
  return res.status(502).json({ error: 'Failed to generate scenario. Please try again.' });
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
