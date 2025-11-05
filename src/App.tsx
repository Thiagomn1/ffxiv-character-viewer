import { useState } from "react";
import bg from "./assets/bg.jpeg";

interface CharacterResult {
  Avatar: string;
  ID: number;
  Lang: string;
  Name: string;
  RankName: string;
  RankIcon: string;
  World: string;
  DC: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CharacterResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a character name.");

    setLoading(true);
    setResults([]);

    try {
      const nameTrimmed = name.trim();
      const res = await fetch(
        `http://localhost:8080/api/character/${nameTrimmed}`
      );
      if (!res.ok) throw new Error("Failed to fetch character data.");

      const data = await res.json();
      setResults(data.List || []);
    } catch (err) {
      console.error("Error fetching character:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-parchment overflow-auto"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-lodestoneBlue/80 p-10 rounded-2xl shadow-lg backdrop-blur-md text-center w-[90%] max-w-2xl mb-10 mt-10">
        <h1 className="text-4xl font-bold text-gold mb-6">
          FFXIV Lodestone Character Viewer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Enter your character name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-lodestoneBlue/50 border border-gold text-parchment placeholder-parchment/70 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-gold text-lodestoneBlue font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Fetch Character"}
          </button>
        </form>

        {/* Character Results */}
        {results.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results.map((char) => (
              <div
                key={char.ID}
                className="bg-lodestoneBlue/60 rounded-xl p-4 flex flex-col items-center border border-gold/30 hover:border-gold transition-all shadow-md"
              >
                <img
                  src={char.Avatar}
                  alt={char.Name}
                  className="w-24 h-24 rounded-full border-2 border-gold mb-3"
                />
                <h2 className="text-xl font-semibold text-gold">{char.Name}</h2>
                <p className="text-parchment/80 text-sm mb-2">
                  {char.World} ({char.DC})
                </p>
                {char.RankName && (
                  <div className="flex items-center gap-2">
                    <img
                      src={char.RankIcon}
                      alt={char.RankName}
                      className="w-5 h-5"
                    />
                    <span className="text-sm text-parchment/80">
                      {char.RankName}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && (
          <p className="mt-8 text-parchment/60 text-sm">
            Enter a character name to begin your search.
          </p>
        )}
      </div>
    </div>
  );
}
