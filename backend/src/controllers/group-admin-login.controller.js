const admin = await getGroupAdminById(group_id);
if (!admin) return res.json(null);

const { last_login_at, weekly_status } = await getWeeklyLoginStatus(admin.id);
res.json({ ...admin, last_login_at, weekly_status });
