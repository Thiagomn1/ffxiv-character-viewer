import { useState } from "react";
import CharacterBannerDialog from "./CharacterBannerDialog";

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

export default function CharacterCard({ char }: { char: CharacterResult }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleClick = async (id: number) => {
    if (!id) return alert("No ID found for specified character.");

    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`http://localhost:8080/api/character/id/${id}`);
      if (!res.ok) throw new Error("Failed to fetch character data.");

      const data = await res.json();
      console.log(data);
      setResults(data || null);
    } catch (err) {
      console.error("Error fetching character:", err);
    } finally {
      setOpen(true);
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
        character={results}
      />
    </>
  );
}
