import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generateScenario', async (req, res) => {
  const { character, age } = req.body;

  const prompt = `Create a Bitter Sweet scenario for a ${age}-year-old named ${character}. Format the result in this JSON format: { "scenario": "...", "options": [ { "text": "...", "outcome": "...", "weight": "Light|Medium|Heavy" }, { "text": "...", "outcome": "...", "weight": "Light|Medium|Heavy" } ] }`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = completion.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON from OpenAI');
    const json = JSON.parse(jsonMatch[0]);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate scenario' });
  }
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
