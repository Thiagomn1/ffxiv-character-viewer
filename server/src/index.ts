import express from "express";
import cors from "cors";
import { CharacterSearch, Character } from "@xivapi/nodestone";

const app = express();
const searchParser = new CharacterSearch();
const charParser = new Character();

app.use(cors());

app.get("/", (_, res) => {
  res.send("FFXIV Char API");
});

// Search by name
app.get("/api/character/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const results = await searchParser.parse({ query: { name } } as any);
    res.json(results);
  } catch (error) {
    console.error("Failed to search character:", error);
    res.status(500).json({ error: "Failed to search character" });
  }
});

// Fetch full profile by ID
app.get("/api/character/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await charParser.parse({
      params: { characterId: id },
    } as any);

    if (!character) {
      return res
        .status(404)
        .json({ error: "Character not found on Lodestone" });
    }

    res.json(character);
  } catch (error) {
    console.error("Failed to fetch full character:", error);
    res.status(500).json({ error: "Failed to fetch full character" });
  }
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
