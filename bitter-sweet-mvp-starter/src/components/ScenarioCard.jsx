const backgroundsByCharacter = {
  Mila: {
    webp: "/bittersweet-cards/card-yellow-orange-blue.webp",
    png: "/bittersweet-cards/card-yellow-orange-blue.png",
  },
  Lucy: {
    webp: "/bittersweet-cards/card-blue-yellow.webp",
    png: "/bittersweet-cards/card-blue-yellow.png",
  },
  Canela: {
    webp: "/bittersweet-cards/card-red-orange-purple.webp",
    png: "/bittersweet-cards/card-red-orange-purple.png",
  },
};

export default function ScenarioCard({ data, persona, reveal, onReveal }) {
  if (!data) return null;

  const { scenario, options, character } = { character: 'Mila', ...data };
  const effectivePersona = persona || character || 'Mila';
  const bg = backgroundsByCharacter[effectivePersona] || backgroundsByCharacter.Mila;

  const weightEmoji = (w) => (w === 'Light' ? '🪶' : w === 'Medium' ? '🧱' : '🪨');
  const weightBadge = (w) =>
    w === 'Light'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : w === 'Medium'
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : 'border-rose-200 bg-rose-50 text-rose-800';

  return (
    <div
      className="max-w-md mx-auto p-5 sm:p-6 lg:p-8 rounded-2xl shadow-lg mt-4 space-y-5 sm:space-y-6 lg:space-y-7 min-h-[420px] relative overflow-hidden animate-fade-in"
      style={{
        backgroundImage: `image-set(url('${bg.webp}') type('image/webp'), url('${bg.png}') type('image/png'))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
      <div className="relative z-10">
        <p className="text-base sm:text-lg leading-7 sm:leading-8 font-medium text-white text-shadow-lg max-w-[58ch]">{scenario}</p>
        <hr className="mt-2 mb-4 sm:mb-5 border-white/40" />
        <div className="space-y-4 sm:space-y-5 lg:space-y-6 mb-8">
          {options.map((opt, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-white/60 shadow-md transition-all duration-200 min-h-[88px]"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${i === 0 ? 'bg-amber-500' : 'bg-sky-500'}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-semibold text-gray-900">Option {String.fromCharCode(65 + i)}:</span>
                </div>
                {reveal && (
                  <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs ${weightBadge(opt.weight)}`}>
                    <span>{weightEmoji(opt.weight)}</span>
                    <span>{opt.weight}</span>
                  </span>
                )}
              </div>
              <p className="text-gray-800 leading-relaxed">{opt.text}</p>
              {reveal && (
                <div className="mt-3 sm:mt-4 text-sm text-gray-700 bg-gray-50/90 p-3 sm:p-4 rounded-xl border border-gray-200/70">
                  <p className="mb-1"><strong>Outcome:</strong> {opt.outcome}</p>
                  <p className="sm:hidden"><strong>Weight:</strong> {weightEmoji(opt.weight)} {opt.weight}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {!reveal && (
          <button
            className="mt-6 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
            onClick={onReveal}
          >
            Reveal Outcome
          </button>
        )}
      </div>
    </div>
  );
}
