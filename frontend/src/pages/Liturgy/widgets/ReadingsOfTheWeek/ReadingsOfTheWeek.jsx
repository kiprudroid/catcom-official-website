import React, { useState, useEffect } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus } from "react-icons/fa";
import { fetchReadings } from "@/api/readings.api";

const normalizeWhitespace = (text = "") => text.replace(/\s+/g, " ").trim();

const tokenizeSentences = (text = "") =>
  normalizeWhitespace(text)
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((s) => s.trim()) || [];

const isResponseSentence = (sentence = "") => {
  const value = normalizeWhitespace(sentence);
  return /^R\./i.test(value) || /^or:\s*R\./i.test(value);
};

const collectResponseBlock = (sentences = [], startIndex = 0) => {
  const block = [];
  let index = startIndex;

  if (!isResponseSentence(sentences[index])) {
    return { blockText: "", nextIndex: startIndex + 1 };
  }

  block.push(sentences[index]);
  index += 1;

  while (
    index < sentences.length &&
    /^or:\s*R\./i.test(normalizeWhitespace(sentences[index]))
  ) {
    block.push(sentences[index]);
    index += 1;
  }

  return {
    blockText: normalizeWhitespace(block.join(" ")),
    nextIndex: index,
  };
};

const splitAtBalancedComma = (text = "") => {
  const normalized = normalizeWhitespace(text);
  const chunks = normalized.split(/,\s+/).filter(Boolean);

  if (chunks.length < 2) return [normalized];

  const midpoint = Math.ceil(chunks.length / 2);
  const leftRaw = chunks.slice(0, midpoint).join(", ").trim();
  const rightRaw = chunks.slice(midpoint).join(", ").trim();

  const left = /[,:;.!?]$/.test(leftRaw) ? leftRaw : `${leftRaw},`;
  const right = rightRaw;

  return [left, right].filter(Boolean);
};

const sentenceToDisplayLines = (sentence = "") => {
  const normalized = normalizeWhitespace(sentence);
  if (!normalized) return [];

  const semicolonParts =
    normalized
      .match(/[^;]+;?|[^;]+$/g)
      ?.map((part) => normalizeWhitespace(part))
      .filter(Boolean) || [];

  const lines = [];
  semicolonParts.forEach((part) => {
    const wordCount = part.split(/\s+/).filter(Boolean).length;
    if (part.includes(",") && wordCount > 10) {
      lines.push(...splitAtBalancedComma(part));
    } else {
      lines.push(part);
    }
  });

  return lines.filter(Boolean);
};

const buildDisplayLinesForStanza = (stanzaSentences = []) => {
  const lines = stanzaSentences.flatMap((sentence) =>
    sentenceToDisplayLines(sentence),
  );
  if (lines.length) return lines;

  const fallback = normalizeWhitespace(stanzaSentences.join(" "));
  return fallback ? [fallback] : [];
};

const pickCanonicalResponse = (responses = []) => {
  if (!responses.length) return "";

  const counts = new Map();
  const order = [];

  responses.forEach((response) => {
    const key = normalizeWhitespace(response).toLowerCase();
    if (!key) return;

    if (!counts.has(key)) {
      counts.set(key, { count: 1, value: normalizeWhitespace(response) });
      order.push(key);
    } else {
      counts.set(key, {
        ...counts.get(key),
        count: counts.get(key).count + 1,
      });
    }
  });

  let winnerKey = order[0];
  order.forEach((key) => {
    const current = counts.get(key);
    const winner = counts.get(winnerKey);

    if (!winner || current.count > winner.count) {
      winnerKey = key;
    }
  });

  return counts.get(winnerKey)?.value || "";
};

const buildFallbackStanzas = (sentences = []) => {
  if (!sentences.length) return [];

  const stanzas = [];
  for (let i = 0; i < sentences.length; i += 2) {
    stanzas.push(sentences.slice(i, i + 2));
  }
  return stanzas;
};

const parseResponsorialPsalm = (text = "") => {
  const normalized = normalizeWhitespace(text);
  if (!normalized) return { response: "", stanzas: [] };

  const sentences = tokenizeSentences(normalized);
  if (!sentences.length) return { response: "", stanzas: [] };

  const responses = [];
  const stanzaSentenceGroups = [];
  let currentStanza = [];
  let index = 0;

  while (index < sentences.length) {
    const sentence = normalizeWhitespace(sentences[index]);

    if (isResponseSentence(sentence)) {
      if (currentStanza.length) {
        stanzaSentenceGroups.push(currentStanza);
        currentStanza = [];
      }

      const { blockText, nextIndex } = collectResponseBlock(sentences, index);
      if (blockText) responses.push(blockText);
      index = nextIndex;
      continue;
    }

    currentStanza.push(sentence);
    index += 1;
  }

  if (currentStanza.length) {
    stanzaSentenceGroups.push(currentStanza);
  }

  const groupedStanzas = stanzaSentenceGroups.length
    ? stanzaSentenceGroups
    : buildFallbackStanzas(sentences);

  const stanzas = groupedStanzas
    .map((group) => buildDisplayLinesForStanza(group))
    .filter((lines) => lines.length > 0);

  return {
    response: pickCanonicalResponse(responses),
    stanzas,
  };
};

const ReadingOfTheWeek = () => {
  const [warning, setWarning] = useState(null);
  const [reading, setReading] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

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

  const sections = Array.isArray(reading?.sections) ? reading.sections : [];

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(null), 3500);
  };

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>
      {reading?.title && <SectionHeading>{reading.title}</SectionHeading>}
      {warning && <Paragraph>{warning}</Paragraph>}
      {loading && <Paragraph>Loading readings...</Paragraph>}
      {error && <Paragraph>{error}</Paragraph>}

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
                onClick={() => {
                  if (!section) {
                    showWarning("Unable to open this reading right now.");
                    return;
                  }
                  setExpandedIndex((current) => (current === idx ? null : idx));
                }}
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
                      const hasParsedStanzas = parsedPsalm.stanzas.length > 0;

                      return (
                        <div key={itemIdx}>
                          {hasParsedStanzas &&
                            parsedPsalm.stanzas.map(
                              (stanzaLines, stanzaIdx) => (
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
                              ),
                            )}

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
