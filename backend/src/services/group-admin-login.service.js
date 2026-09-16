import {
  recordAdminLogin,
  getRecentLogins,
} from "../models/group-admin-login.model.js";

const DAY = 24 * 60 * 60 * 1000;

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + diffToMonday);
  return d;
};

const loggedInOn = (logins, targetDay) =>
  logins.some((l) => new Date(l.logged_in_at).getDay() === targetDay);

export const logGroupAdminLogin = (group_admin_id) =>
  recordAdminLogin(group_admin_id);

export const getWeeklyLoginStatus = async (group_admin_id) => {
  const weekStart = startOfWeek(new Date());
  const logins = await getRecentLogins(group_admin_id, weekStart);
  const today = new Date().getDay();

  const hitThursday = loggedInOn(logins, 4);
  const hitSunday = loggedInOn(logins, 0);

  let status = "compliant";
  if (!hitThursday && today > 4) status = "missed_thursday";
  else if (
    hitThursday &&
    !hitSunday &&
    today >= 0 &&
    today !== 4 &&
    new Date() > new Date(weekStart.getTime() + 6 * DAY)
  )
    status = "missed_sunday";
  else if (!hitThursday && today <= 4) status = "pending_thursday";
  else if (hitThursday && !hitSunday) status = "pending_sunday";

  const lastLogin = logins[0]?.logged_in_at || null;

  return { last_login_at: lastLogin, weekly_status: status };
};
