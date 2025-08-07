# Bitter Sweet - Scenario Generator MVP

## Quick Start (2-minute setup)

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies  
cd api
npm install
cd ..
```

### 2. Configure API Key
Edit `.env` file and add your OpenAI API key:
```
OPENAI_API_KEY=your-actual-openai-api-key-here
```

### 3. Run the App
```bash
# Terminal 1: Start backend (from project root)
cd api
npm run dev

# Terminal 2: Start frontend (from project root)  
npm run dev
```

### 4. Demo Ready!
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## How It Works
1. Select character (Mila, Lucy, Canela) and age (25-35)
2. Click "Generate Scenario" 
3. Read the dilemma and two options
4. Click "Reveal Outcome" to see consequences with emotional weights:
   - 🪶 Light = Minor impact
   - 🧱 Medium = Moderate burden  
   - 🪨 Heavy = Significant impact

Perfect for cofounder demos - generates fresh, personalized scenarios every time!