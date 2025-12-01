import { useState } from "react";
import CharacterBannerDialog from "./CharacterBannerDialog";
import type { CharacterSearchResult, CharacterDetail } from "../types/character";
import { API_ENDPOINTS } from "../config/constants";

export default function CharacterCard({ char }: { char: CharacterSearchResult }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (id: number) => {
    if (!id) {
      setError("No ID found for specified character.");
      return;
    }

    setLoading(true);
    setCharacter(null);
    setError(null);

    try {
      const res = await fetch(API_ENDPOINTS.CHARACTER_BY_ID(id));

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setCharacter(data);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching character:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch character details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        key={char.ID}
        className="bg-lodestoneBlue/60 rounded-xl p-4 flex flex-col items-center border border-gold/30 hover:border-gold transition-all shadow-md cursor-pointer"
        onClick={() => handleClick(char.ID)}
      >
        <img
          src={char.Avatar}
          alt={char.Name}
          className="w-24 h-24 rounded-full border-2 border-gold mb-3"
        />
        {!loading && (
          <h2 className="text-xl font-semibold text-gold">{char.Name}</h2>
        )}
        {loading ? (
          <p className="text-parchment/80">Loading...</p>
        ) : (
          <p className="text-parchment/80 text-sm mb-2">
            {char.World} ({char.DC})
          </p>
        )}
        {char.RankName && !loading && (
          <div className="flex items-center gap-2">
            <img src={char.RankIcon} alt={char.RankName} className="w-5 h-5" />
            <span className="text-sm text-parchment/80">{char.RankName}</span>
          </div>
        )}
      </div>

      <CharacterBannerDialog
        open={open}
        onOpenChange={setOpen}
        character={character}
        error={error}
      />
    </>
  );
}
