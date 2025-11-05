import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
export interface CharacterBannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: any;
}

export default function CharacterBannerDialog({
  open,
  onOpenChange,
  character,
}: CharacterBannerDialogProps) {
  if (!character) return null;
  console.log(character);

  const gearSlots = [
    "Mainhand",
    "Head",
    "Body",
    "Hands",
    "Legs",
    "Feet",
    "Earrings",
    "Necklace",
    "Bracelets",
    "Ring1",
    "Ring2",
    "Soulcrystal",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-[#0a0a0a]/95 border border-[#2c2c2c] text-white rounded-2xl shadow-xl overflow-hidden md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold text-center mb-4">
            {character.Name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center md:w-1/3 bg-[#141414]/70 p-4 rounded-xl border border-[#2c2c2c] shadow-md">
            <img
              src={character.Avatar}
              alt={character.Name}
              className="rounded-xl shadow-lg border border-[#3a3a3a] w-40 h-40 object-cover"
            />

            <h2 className="mt-3 text-xl font-semibold text-gold text-center">
              {character.Title ? (
                <p className="flex flex-col">
                  <span className="text-parchment/95">{character.Title}</span>
                  {`${character.Name}`}
                </p>
              ) : (
                character.Name
              )}
            </h2>

            <p className="text-sm text-gray-400">
              {character.Race} ({character.Tribe})
            </p>
            <p className="text-sm text-gray-500">{character.Gender}</p>
            <p className="text-sm text-gray-400 mt-2">
              {character.World} ({character.DC})
            </p>

            <Separator className="my-3 bg-[#2c2c2c]" />

            <div className="flex flex-col gap-1 text-sm text-gray-300">
              <div>
                <strong className="text-gold">Nameday:</strong>{" "}
                {character.Nameday}
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={character.GuardianDeity?.Icon}
                  className="w-5 h-5"
                  alt={character.GuardianDeity?.Name}
                />
                <span>{character.GuardianDeity?.Name}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={character.Town?.Icon}
                  className="w-5 h-5"
                  alt={character.Town?.Name}
                />
                <span>{character.Town?.Name}</span>
              </div>
            </div>

            <Separator className="my-3 bg-[#2c2c2c]" />

            <div className="text-center">
              <p className="text-sm text-gray-300 font-medium">Free Company</p>
              {character.FreeCompany ? (
                <div className="flex flex-row items-center mt-1">
                  <img
                    src={character.FreeCompany?.IconLayers?.MIDdle}
                    className="w-6 h-6"
                    alt="FC Emblem"
                  />
                  <span className="text-gold text-sm mt-1">
                    {character.FreeCompany?.Name}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500 text-sm italic">None</span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col md:w-2/3 bg-[#141414]/70 p-4 rounded-xl border border-[#2c2c2c] shadow-md overflow-y-auto max-h-[80vh]">
            {/* LEVEL */}
            <h3 className="text-lg font-semibold text-gold mb-2">
              Level:{" "}
              <span className="text-parchment/80">{character.Level}</span>
            </h3>
            {/* ATTRIBUTES */}
            <h3 className="text-lg font-semibold text-gold mb-2">Attributes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm text-gray-300">
              <div>STR: {character.Strength}</div>
              <div>DEX: {character.Dexterity}</div>
              <div>VIT: {character.Vitality}</div>
              <div>INT: {character.Intelligence}</div>
              <div>MND: {character.Mind}</div>
              <div>PIE: {character.Piety}</div>
              <div>CRT: {character.CriticalHitRate}</div>
              <div>DET: {character.Determination}</div>
              <div>DH: {character.DirectHitRate}</div>
              <div>SS: {character.SkillSpeed}</div>
              <div>Spell Speed: {character.SpellSpeed}</div>
              <div>Tenacity: {character.Tenacity}</div>
              <div>HP: {character.Hp}</div>
              <div>
                {character.MpGpCpParameterName}: {character.MpGpCp}
              </div>
            </div>

            <Separator className="my-4 bg-[#2c2c2c]" />

            {/* GEAR */}
            <h3 className="text-lg font-semibold text-gold mb-3">Gear Set</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gearSlots.map((slot) => {
                const gear = character[slot];
                if (!gear) return null;
                return (
                  <div
                    key={slot}
                    className="flex flex-col bg-[#1b1b1b] p-2 rounded-lg border border-[#2c2c2c] hover:border-gold/50 transition"
                  >
                    <span className="text-xs text-gold font-semibold mb-1">
                      {slot}
                    </span>
                    <p className="text-sm text-gray-300">{gear.Name}</p>
                    {gear.ItemLevel && (
                      <span className="text-xs text-gray-400">
                        {gear.ItemLevel}
                      </span>
                    )}
                    {gear.Stain && (
                      <span className="text-xs text-gray-500">
                        Dyed: {gear.Stain}
                      </span>
                    )}
                    {gear.MirageName && (
                      <span className="text-xs text-gray-500">
                        Glamour: {gear.MirageName.replace(/<.*?>/g, "")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <Separator className="my-4 bg-[#2c2c2c]" />

            {/* JOBS */}
            <h3 className="text-lg font-semibold text-gold mb-3">
              Class & Job Icons
            </h3>
            {character.ClassjobIcons?.List?.length ? (
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {character.ClassjobIcons.List.map((job, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center bg-[#1b1b1b] p-2 rounded-md border border-[#2c2c2c] hover:border-gold/50"
                  >
                    <img
                      src={job.Icon}
                      alt="Job Icon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No job icons available.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
