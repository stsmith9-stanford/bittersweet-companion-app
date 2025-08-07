import { useState } from 'react';
import ScenarioCard from './components/ScenarioCard';
import axios from 'axios';

function App() {
  const [character, setCharacter] = useState('Mila');
  const [age, setAge] = useState(28);
  const [scenarioData, setScenarioData] = useState(null);
  const [reveal, setReveal] = useState(false);

  const handleGenerate = async () => {
    setReveal(false);
    const res = await axios.post('http://localhost:3000/api/generateScenario', {
      character,
      age,
    });
    setScenarioData(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Bitter Sweet — Scenario Generator</h1>
      <div className="space-x-2">
        <select value={character} onChange={e => setCharacter(e.target.value)} className="px-2 py-1">
          <option>Mila</option>
          <option>Lucy</option>
          <option>Canela</option>
        </select>
        <input
          type="number"
          value={age}
          onChange={e => setAge(parseInt(e.target.value))}
          className="px-2 py-1 w-20"
        />
        <button onClick={handleGenerate} className="bg-green-600 text-white px-3 py-1 rounded">
          Generate Scenario
        </button>
      </div>

      <ScenarioCard data={scenarioData} reveal={reveal} onReveal={() => setReveal(true)} />
    </div>
  );
}

export default App;
