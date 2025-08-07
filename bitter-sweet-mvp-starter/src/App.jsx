import { useEffect, useState } from 'react';
import ScenarioCard from './components/ScenarioCard';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

function App() {
  const [character, setCharacter] = useState('Mila');
  const [age, setAge] = useState(28);
  const [scenarioData, setScenarioData] = useState(null);
  const [history, setHistory] = useState([]);
  const [reveal, setReveal] = useState(false);

  const generateMutation = useMutation({
    mutationFn: async ({ character, age }) => {
      const res = await axios.post('http://localhost:3000/api/generateScenario', { character, age }, {
        timeout: 25000,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setScenarioData(data);
      setHistory((prev) => {
        const next = [data, ...prev].slice(0, 5);
        localStorage.setItem('bs_history', JSON.stringify(next));
        return next;
      });
    },
  });

  const handleGenerate = async () => {
    setReveal(false);
    generateMutation.mutate({ character, age });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bs_history');
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

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
        <button
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          className={`px-3 py-1 rounded text-white ${generateMutation.isPending ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {generateMutation.isPending ? 'Generating…' : 'Generate Scenario'}
        </button>
      </div>

      {generateMutation.isError && (
        <div className="mt-3 max-w-md text-sm text-red-800 bg-red-100 border border-red-200 rounded p-2">
          Failed to generate scenario. Please try again.
        </div>
      )}

      {generateMutation.isPending && (
        <div className="mt-4 text-center text-gray-600">Generating card…</div>
      )}
      <ScenarioCard data={scenarioData} reveal={reveal} onReveal={() => setReveal(true)} />

      {history.length > 0 && (
        <div className="max-w-md mx-auto mt-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Recent cards</h2>
          <ul className="space-y-2">
            {history.map((h, idx) => (
              <li key={idx} className="text-sm text-gray-700 line-clamp-2">{h.scenario}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
