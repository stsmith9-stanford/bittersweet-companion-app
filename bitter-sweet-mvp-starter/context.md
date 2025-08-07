# Bitter Sweet — Project Context

**Bitter Sweet** is a physical narrative decision-making game where players embody a female character navigating adulthood from ages 25–35. Each year, players draw a **scenario card** that presents a personal dilemma with two options. Each option has an emotional or logistical **consequence**, represented by:

- 🪶 **Light object** = Minor weight or positive outcome  
- 🧱 **Medium object** = Moderate emotional/logistical burden  
- 🪨 **Heavy object** = Significant impact (e.g., burnout, guilt, loneliness)

The player’s choices accumulate into a reflective emotional journey.

---

## MVP Companion App Goal

Build a mobile-friendly web prototype that replaces printed scenario cards with dynamically generated ones using GPT-4. The app should:

- Let users input:
  - Character name (e.g. Mila, Lucy, etc.)
  - Age (25–35)
- Generate:
  - A short life dilemma
  - Two distinct choices
  - Consequences for each choice
  - Emotional weight for each consequence (Light, Medium, or Heavy)

---

## Example JSON Output

```json
{
  "age": 28,
  "character": "Mila",
  "scenario": "You’ve been invited to speak at a big conference the same week your sister’s baby is due.",
  "options": [
    {
      "text": "Decline the conference and be with your sister",
      "outcome": "You feel connected to your family but slightly resentful about the missed opportunity.",
      "weight": "Medium"
    },
    {
      "text": "Go to the conference and support your sister remotely",
      "outcome": "You advance your career but feel guilty when your sister says she really needed you.",
      "weight": "Heavy"
    }
  ]
}
```

---

## Tips for Prompting GPT-4

- Reference character traits (e.g., Mila values emotional support and freedom)
- Keep scenarios grounded in real-world dilemmas
- Prioritize emotional nuance and believable stakes
