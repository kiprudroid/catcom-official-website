import React, { useState, useEffect, useRef } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus, FaSpinner, FaCalendarAlt, FaChevronUp } from "react-icons/fa";
import { fetchReadings, fetchReadingsByDate } from "@/api/readings.api";
import ReadingsCalendar from "./widgets/ReadingsCalendar/ReadingsCalendar";

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
  return { blockText: normalizeWhitespace(block.join(" ")), nextIndex: index };
};

const splitAtBalancedComma = (text = "") => {
  const normalized = normalizeWhitespace(text);
  const chunks = normalized.split(/,\s+/).filter(Boolean);
  if (chunks.length < 2) return [normalized];
  const midpoint = Math.ceil(chunks.length / 2);
  const leftRaw = chunks.slice(0, midpoint).join(", ").trim();
  const rightRaw = chunks.slice(midpoint).join(", ").trim();
  const left = /[,:;.!?]$/.test(leftRaw) ? leftRaw : `${leftRaw},`;
  return [left, rightRaw].filter(Boolean);
};

const sentenceToDisplayLines = (sentence = "") => {
  const normalized = normalizeWhitespace(sentence);
  if (!normalized) return [];
  const semicolonParts =
    normalized
      .match(/[^;]+;?|[^;]+$/g)
      ?.map((p) => normalizeWhitespace(p))
      .filter(Boolean) || [];
  const lines = [];
  semicolonParts.forEach((part) => {
    const wordCount = part.split(/\s+/).filter(Boolean).length;
    if (part.includes(",") && wordCount > 10)
      lines.push(...splitAtBalancedComma(part));
    else lines.push(part);
  });
  return lines.filter(Boolean);
};

const buildDisplayLinesForStanza = (stanzaSentences = []) => {
  const lines = stanzaSentences.flatMap((s) => sentenceToDisplayLines(s));
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
    } else
      counts.set(key, { ...counts.get(key), count: counts.get(key).count + 1 });
  });
  let winnerKey = order[0];
  order.forEach((key) => {
    if (counts.get(key).count > counts.get(winnerKey).count) winnerKey = key;
  });
  return counts.get(winnerKey)?.value || "";
};

const buildFallbackStanzas = (sentences = []) => {
  const stanzas = [];
  for (let i = 0; i < sentences.length; i += 2)
    stanzas.push(sentences.slice(i, i + 2));
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
  if (currentStanza.length) stanzaSentenceGroups.push(currentStanza);

  const groupedStanzas = stanzaSentenceGroups.length
    ? stanzaSentenceGroups
    : buildFallbackStanzas(sentences);
  const stanzas = groupedStanzas
    .map((g) => buildDisplayLinesForStanza(g))
    .filter((l) => l.length > 0);
  return { response: pickCanonicalResponse(responses), stanzas };
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getTodayString = () => {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
};

const ReadingOfTheWeek = () => {
  const [reading, setReading] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const loadReadings = async (date) => {
    setLoading(true);
    setError("");
    setReading({});
    setExpandedIndex(null);
    setShowCalendar(false);
    try {
      const isToday = date === getTodayString();
      const data = isToday
        ? await fetchReadings()
        : await fetchReadingsByDate(date);
      setReading(data);
    } catch (err) {
      setError(err?.message || "No readings found for this day.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReadings(selectedDate);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showCalendar]);

  // selecting a date does NOT close the calendar — user must press Fetch
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFetch = () => {
    loadReadings(selectedDate); // closes calendar inside loadReadings
  };

  const sections = Array.isArray(reading?.sections) ? reading.sections : [];

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>

      <div className={styles.calendarSection} ref={calendarRef}>
        <button
          className={styles.calendarToggle}
          onClick={() => setShowCalendar((v) => !v)}
          type="button"
        >
          <FaCalendarAlt />
          {selectedDate ? formatDisplayDate(selectedDate) : "Select a date"}
          <FaChevronUp
            className={`${styles.chevron} ${showCalendar ? styles.chevronOpen : ""}`}
          />
        </button>

        {showCalendar && (
          <div className={styles.calendarDropdown}>
            <ReadingsCalendar
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
              onFetch={handleFetch}
            />
          </div>
        )}
      </div>

      {loading && (
        <div className={styles.loadingWrap}>
          <FaSpinner className={styles.spinner} />
          <span>Loading readings…</span>
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <span className={styles.errorDot}>!</span>
          {error}
        </div>
      )}

      {!loading && !error && reading?.title && (
        <SectionHeading>{reading.title}</SectionHeading>
      )}

      {!loading && !error && sections.length > 0 && (
        <div className={styles.grid}>
          {sections.map((section, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src="/litugy-images/Bible.jpg"
                  alt={section.header}
                  className={styles.image}
                />
                <div className={styles.overlay} />
                <div
                  className={styles.cardHeader}
                  onClick={() =>
                    setExpandedIndex((c) => (c === idx ? null : idx))
                  }
                >
                  <Paragraph className={styles.cardTitle}>
                    <strong>{section.header}</strong>
                  </Paragraph>
                  {Array.isArray(section.readings) &&
                    section.readings[0]?.verses?.[0]?.text && (
                      <Paragraph>
                        {section.readings[0].verses[0].text}
                      </Paragraph>
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

                      if (
                        isResponsorialPsalm &&
                        typeof item?.text === "string"
                      ) {
                        const parsedPsalm = parseResponsorialPsalm(item.text);
                        return (
                          <div key={itemIdx}>
                            {parsedPsalm.stanzas.map(
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
                              item.verses.map((verse, vi) => (
                                <Paragraph key={vi}>{verse.text}</Paragraph>
                              ))}
                          </div>
                        );
                      }

                      return (
                        <div key={itemIdx}>
                          <Paragraph>{item.text}</Paragraph>
                          {Array.isArray(item.verses) &&
                            item.verses.map((verse, vi) => (
                              <Paragraph key={vi}>{verse.text}</Paragraph>
                            ))}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingOfTheWeek;
