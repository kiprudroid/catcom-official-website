export const PENDING_PREFIX = "PENDING: ";

export const SCC_OPTIONS = [
  "St. Charles SCC",
  "St. Jude SCC",
  "St. Martin SCC",
  "St. Paul SCC",
  "St. Stephen SCC",
  "St. Therese SCC",
  "St. Veronica SCC",
  "MMOG SCC",
];

export const GROUP_OPTIONS = [
  "Choir",
  "Pastoral",
  "Bible Prayer Service",
  "Technical Team",
  "Liturgical Dancers",
  "Communion and Liberation",
];

export function lastNDaysDate(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export const isGroupJoinPending = (v) =>
  typeof v === "string" && v.startsWith(PENDING_PREFIX);

export const stripPendingPrefix = (v) =>
  isGroupJoinPending(v) ? v.slice(PENDING_PREFIX.length) : v;

export function buildCopyText(r) {
  const lines = [`Name: ${r.name || r.full_name}`];
  if (r.email) lines.push(`Email: ${r.email}`);
  if (r.phone_number) lines.push(`Phone: ${r.phone_number}`);
  if (r.college) lines.push(`College: ${r.college}`);
  if (r.gender) lines.push(`Gender: ${r.gender}`);
  if (r.year_study) lines.push(`Year: Year ${r.year_study}`);
  if (r.scc_name && r.scc_name !== "TBD") lines.push(`SCC: ${r.scc_name}`);
  if (r.group_joined)
    lines.push(`Group(s): ${stripPendingPrefix(r.group_joined)}`);
  lines.push(`Request: ${r.note || r.type}`);
  return lines.join("\n");
}
