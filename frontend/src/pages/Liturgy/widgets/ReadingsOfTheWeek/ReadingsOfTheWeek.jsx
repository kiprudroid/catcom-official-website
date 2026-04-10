import React, { useState, useEffect } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus } from "react-icons/fa";
import { fetchReadings } from "@/api/readings.api";

const normalizeSpacing = (text = "") => text.replace(/\s+/g, " ").trim();

const splitSentences = (text = "") =>
  normalizeSpacing(text)
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((s) => s.trim()) || [];

const mergeIntoFixedCount = (parts, targetCount) => {
  if (parts.length <= targetCount) return parts;

  const merged = [];
  let cursor = 0;

  for (let i = 0; i < targetCount; i += 1) {
    const remainingParts = parts.length - cursor;
    const remainingSlots = targetCount - i;
    const take = Math.ceil(remainingParts / remainingSlots);
    merged.push(
      parts
        .slice(cursor, cursor + take)
        .join(" ")
        .trim(),
    );
    cursor += take;
  }

  return merged.filter(Boolean);
};

const splitLongestPartByComma = (parts) => {
  let bestIndex = -1;
  let bestWordCount = -1;

  parts.forEach((part, idx) => {
    if (!part.includes(",")) return;
    const words = part.split(/\s+/).filter(Boolean).length;
    if (words > bestWordCount) {
      bestWordCount = words;
      bestIndex = idx;
    }
  });

  if (bestIndex === -1) return null;

  const candidate = parts[bestIndex];
  const commaSlices = candidate
    .split(/,\s+/)
    .map((slice) => slice.trim())
    .filter(Boolean);

  if (commaSlices.length < 2) return null;

  const middle = Math.ceil(commaSlices.length / 2);
  const left = `${commaSlices.slice(0, middle).join(",")},`.trim();
  const right = commaSlices.slice(middle).join(", ").trim();

  const next = [...parts];
  next.splice(bestIndex, 1, left, right);
  return next.filter(Boolean);
};

const splitDisplayLines = (text = "") => {
  const normalized = normalizeSpacing(text);
  if (!normalized) return ["", "", "", ""];

  const strongParts = normalized
    .split(/(?<=[.;:!?])\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  let parts = strongParts.length ? [...strongParts] : [normalized];

  // Prefer punctuation-aware shape first.
  while (parts.length < 4) {
    const next = splitLongestPartByComma(parts);
    if (!next) break;
    parts = next;
  }

  if (parts.length > 4) {
    parts = mergeIntoFixedCount(parts, 4);
  }

  // Strict mode: always return exactly 4 lines.
  if (parts.length !== 4) {
    const words = normalized.split(/\s+/).filter(Boolean);
    const strict = [];
    let cursor = 0;

    for (let i = 0; i < 4; i += 1) {
      const remainingWords = words.length - cursor;
      const remainingSlots = 4 - i;
      const take =
        remainingWords > 0 ? Math.ceil(remainingWords / remainingSlots) : 0;

      strict.push(
        words
          .slice(cursor, cursor + take)
          .join(" ")
          .trim(),
      );

      cursor += take;
    }

    parts = strict;
  }

  return parts.map((line) => normalizeSpacing(line));
};

const extractResponseAndBodyFromChunk = (chunk = "") => {
  const sentences = splitSentences(chunk);
  if (!sentences.length) return { response: "", body: "" };

  const responseParts = [];
  let index = 0;

  if (/^R\./i.test(sentences[0])) {
    responseParts.push(sentences[0]);
    index = 1;

    while (index < sentences.length && /^or:\s*R\./i.test(sentences[index])) {
      responseParts.push(sentences[index]);
      index += 1;
    }
  }

  const response = responseParts.join(" ").trim();
  const body = sentences.slice(index).join(" ").trim();

  return { response, body };
};

const parseResponsorialPsalm = (text = "") => {
  const normalized = normalizeSpacing(text);
  const markerRegex = /\bR\.\s*(?:\([^)]+\)\s*)?/gi;
  const markers = [...normalized.matchAll(markerRegex)];

  if (!markers.length) {
    return {
      response: "",
      stanzas: splitDisplayLines(normalized).length
        ? [splitDisplayLines(normalized)]
        : [],
    };
  }

  const chunks = markers.map((match, idx) => {
    const start = match.index;
    const end =
      idx + 1 < markers.length ? markers[idx + 1].index : normalized.length;
    return normalized.slice(start, end).trim();
  });

  let canonicalResponse = "";
  const stanzas = [];

  chunks.forEach((chunk) => {
    const { response, body } = extractResponseAndBodyFromChunk(chunk);
    if (!canonicalResponse && response) canonicalResponse = response;

    const lines = splitDisplayLines(body);
    if (lines.length) stanzas.push(lines);
  });

  return {
    response: canonicalResponse,
    stanzas,
  };
};

const ReadingOfTheWeek = () => {
  const [warning, setWarning] = useState(null);
  const [reading, setReading] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  //fetchReadings
  useEffect(() => {
    const loadReadings = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchReadings();
        setReading(data);
      } catch (err) {
        console.error("Error fetching Readings:", err);
        setError(err?.message || "Error fetching Readings");
      } finally {
        setLoading(false);
      }
    };

    loadReadings();
  }, []);

  console.log(reading);
  const sections = Array.isArray(reading?.sections) ? reading.sections : [];

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(null), 3500);
  };

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>
      {reading?.title && <SectionHeading>{reading.title}</SectionHeading>}

      <div className={styles.grid}>
        {sections.map((section, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src="/litugy-images/Bible.jpg"
                alt={section.header}
                className={styles.image}
              />
              <div className={styles.overlay}></div>
              <div
                className={styles.cardHeader}
                onClick={() =>
                  setExpandedIndex((current) => (current === idx ? null : idx))
                }
              >
                <Paragraph className={styles.cardTitle}>
                  <strong>{section.header}</strong>
                </Paragraph>
                {Array.isArray(section.readings) &&
                  section.readings[0]?.verses?.[0]?.text && (
                    <Paragraph>{section.readings[0].verses[0].text}</Paragraph>
                  )}
                <FaPlus />
              </div>
            </div>
            {expandedIndex === idx && (
              <div className={styles.cardContent}>
                <SectionHeading>
                  <strong>{section.header}</strong>
                </SectionHeading>
                {Array.isArray(section.readings) &&
                  section.readings.map((item, itemIdx) => {
                    const isResponsorialPsalm =
                      /responsorial psalm/i.test(section?.header || "") ||
                      section?.type === "PSALM";

                    if (isResponsorialPsalm && typeof item?.text === "string") {
                      const parsedPsalm = parseResponsorialPsalm(item.text);

                      return (
                        <div key={itemIdx}>
                          {parsedPsalm.stanzas.map((stanzaLines, stanzaIdx) => (
                            <div key={stanzaIdx}>
                              {stanzaLines.map((line, lineIdx) => (
                                <Paragraph key={`${stanzaIdx}-${lineIdx}`}>
                                  {line}
                                </Paragraph>
                              ))}
                              {parsedPsalm.response && (
                                <Paragraph>
                                  <strong>{parsedPsalm.response}</strong>
                                </Paragraph>
                              )}
                            </div>
                          ))}
                          {Array.isArray(item.verses) &&
                            item.verses.map((verse, verseIdx) => (
                              <Paragraph key={verseIdx}>{verse.text}</Paragraph>
                            ))}
                        </div>
                      );
                    }

                    return (
                      <div key={itemIdx}>
                        <Paragraph>{item.text}</Paragraph>
                        {Array.isArray(item.verses) &&
                          item.verses.map((verse, verseIdx) => (
                            <Paragraph key={verseIdx}>{verse.text}</Paragraph>
                          ))}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingOfTheWeek;
