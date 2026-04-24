import { readFile } from "node:fs/promises";

let cachedMassReadings = null;

function formatLocalDateYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function loadMassReadings() {
  if (cachedMassReadings) return cachedMassReadings;
  const massJsonUrl = new URL("../data/readings/mass.json", import.meta.url);
  const raw = await readFile(massJsonUrl, "utf8");
  cachedMassReadings = JSON.parse(raw);
  return cachedMassReadings;
}

export async function getReadings(req, res) {
  try {
    const today = new Date();
    const formattedDate = formatLocalDateYYYYMMDD(today);
    const all = await loadMassReadings();
    const todays = Array.isArray(all)
      ? all.find((entry) => entry?.date === formattedDate)
      : null;

    if (!todays) {
      return res.status(404).json({
        message: "No readings found for today",
        date: formattedDate,
      });
    }

    return res.status(200).json(todays);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load readings",
      error: error?.message ?? String(error),
    });
  }
}

export async function getReadingsByDate(req, res) {
  try {
    const { date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const all = await loadMassReadings();
    const entry = Array.isArray(all) ? all.find((e) => e?.date === date) : null;

    if (!entry) {
      return res.status(404).json({
        message: `No readings found for ${date}`,
        date,
      });
    }

    return res.status(200).json(entry);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load readings",
      error: error?.message ?? String(error),
    });
  }
}
