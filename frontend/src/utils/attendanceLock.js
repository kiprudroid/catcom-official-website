// Lock rules:
//   - Today's date: NEVER locked, regardless of when it was saved.
//     The admin can always correct today's attendance during the meeting.
//   - Past dates: locked 12 hours after the save timestamp was recorded.

const LOCK_STORAGE_KEY = "attendance_save_timestamps";
const LOCK_HOURS = 12;

export const recordSaveTimestamp = (meetingDate) => {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCK_STORAGE_KEY) || "{}");
    existing[meetingDate] = new Date().toISOString();
    localStorage.setItem(LOCK_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // silently ignore storage errors
  }
};

export const getSaveTimestamps = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCK_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const isLocked = (meetingDate) => {
  // Today is never locked — admin must be able to mark attendance live
  const today = new Date().toISOString().split("T")[0];
  // const today = new Date().toLocaleDateString("en-CA");
  if (meetingDate === today) return false;

  const timestamps = getSaveTimestamps();
  const savedAt = timestamps?.[meetingDate];
  if (!savedAt) return false;

  const elapsed = Date.now() - new Date(savedAt).getTime();
  return elapsed > LOCK_HOURS * 60 * 60 * 1000;
};
