import { useState } from "react";
import bg from "./assets/bg.jpeg";
import CharacterCard from "./components/CharacterCard";
import type { CharacterSearchResult } from "./types/character";
import { API_ENDPOINTS } from "./config/constants";

export default function App() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CharacterSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a character name.");
      return;
    }

    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const nameTrimmed = name.trim();
      const res = await fetch(API_ENDPOINTS.CHARACTER_SEARCH(nameTrimmed));

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const characterList = data.List || [];

      if (characterList.length === 0) {
        setError("No characters found with that name.");
      } else {
        setResults(characterList);
      }
    } catch (err) {
      console.error("Error fetching character:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch character data. Please try again."
      );
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
            className="mt-4 bg-gold text-lodestoneBlue font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Loading..." : "Fetch Character"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Character Results */}
        {results.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results.map((char) => (
              <CharacterCard key={char.ID} char={char} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && !error && (
          <p className="mt-8 text-parchment/60 text-sm">
            Enter a character name to begin your search.
          </p>
        )}
      </div>
    </div>
  );
}
