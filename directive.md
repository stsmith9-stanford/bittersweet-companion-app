# Bitter Sweet MVP — 2-Hour Build Directive

## Objective:
Create a working local prototype of the **Scenario Card Generator** for the Bitter Sweet game. This app should replicate the experience of drawing a scenario card — using GPT-4 to dynamically generate the content — so players can use their phones to access fresh, personalized dilemmas.

## Priority:
✅ Focus on **speed to first demo** — this is for cofounders to visualize direction, not a final product.

---

## What To Build (in this 2-hour window):

### 1. UI (React):
- [x] Simple interface with:
  - Character selector (dropdown)
  - Age input (number)
  - “Generate Scenario” button
- [x] Display:
  - Scenario
  - Two options (A/B)
  - “Reveal Outcome” button → reveals both consequences and emotional weights

### 2. Backend (Node/Express):
- [x] Basic POST endpoint `/api/generateScenario`
- [x] Accepts `character` and `age`
- [x] Sends prompt to OpenAI and parses structured JSON result
- [x] Returns that result to frontend

### 3. LLM Prompting:
- [x] Use clear, consistent prompt format with character + age
- [x] Expect OpenAI to return JSON with:
  - `scenario`, `options[]`, `outcome`, `weight`

---

## What NOT To Focus On:
- No login/auth
- No database or state saving
- No elaborate styling
- No routing or navigation
- No mobile app deployment yet

---

## Output Format Reminder:
```json
{
  "scenario": "...",
  "options": [
    { "text": "...", "outcome": "...", "weight": "Light|Medium|Heavy" },
    { "text": "...", "outcome": "...", "weight": "Light|Medium|Heavy" }
  ]
}
```

---

## Success = 
A clean, functional local web prototype that generates and reveals LLM-created scenario cards — and wows cofounders in a 2-minute demo.

