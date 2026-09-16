export const formatRelativeTime = (isoString) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  const plural = (value, unit) =>
    `${value} ${unit}${value === 1 ? "" : "s"} ago`;

  if (seconds < 10) return "just now";
  if (seconds < 60) return plural(seconds, "second");
  if (minutes < 60) return plural(minutes, "minute");
  if (hours < 24) return plural(hours, "hour");
  if (days < 30) return plural(days, "day");
  if (months < 12) return plural(months, "month");
  return new Date(isoString).toLocaleDateString();
};
