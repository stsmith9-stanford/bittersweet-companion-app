export default function ScenarioCard({ data, reveal, onReveal }) {
  if (!data) return null;

  const { scenario, options } = data;

  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-xl shadow-lg mt-4 space-y-4 min-h-[400px] relative overflow-hidden"
      style={{
        backgroundImage: `url('/bittersweet cards/card-blue-yellow.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
      <div className="relative z-10">
        <p className="text-lg font-medium text-white text-shadow-lg">{scenario}</p>
        {options.map((opt, i) => (
          <div key={i} className="bg-white bg-opacity-90 p-3 rounded-lg">
            <p className="font-semibold text-gray-800">Option {String.fromCharCode(65 + i)}:</p>
            <p className="text-gray-700">{opt.text}</p>
            {reveal && (
              <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <p><strong>Outcome:</strong> {opt.outcome}</p>
                <p><strong>Weight:</strong> {opt.weight === 'Light' ? '🪶' : opt.weight === 'Medium' ? '🧱' : '🪨'} {opt.weight}</p>
              </div>
            )}
          </div>
        ))}
        {!reveal && (
          <button
            className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            onClick={onReveal}
          >
            Reveal Outcome
          </button>
        )}
      </div>
    </div>
  );
}
