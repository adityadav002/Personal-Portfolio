export function parseProjectDesc(desc = "") {
  const text = (desc || "").trim();

  if (!text) return { overview: "", features: [], techStack: [] };

  const featuresIdx = text.search(/key features:?/i);
  const techIdx = text.search(/tech stack:?/i);

  const overviewEnd =
    featuresIdx !== -1 ? featuresIdx : techIdx !== -1 ? techIdx : text.length;
  const overview = text.slice(0, overviewEnd).trim();

  let features = [];
  if (featuresIdx !== -1) {
    const featuresEnd = techIdx !== -1 && techIdx > featuresIdx ? techIdx : text.length;
    const block = text.slice(featuresIdx, featuresEnd).replace(/key features:?/i, "");
    features = block
      .split("\n")
      .map((line) => line.replace(/^[•\-\*\u2022]\s*/, "").trim())
      .filter(Boolean);
  }

  let techStack = [];
  if (techIdx !== -1) {
    const block = text.slice(techIdx).replace(/tech stack:?/i, "");
    techStack = block
      .split(/[,\n•\u2022]/)
      .map((t) => t.replace(/^[-\*]\s*/, "").trim())
      .filter(Boolean);
  }

  return { overview, features, techStack };
}