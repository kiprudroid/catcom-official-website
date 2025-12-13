When frontend calls
GET /api/events

Flow

Route → Controller → Service → Model → Database


Frontend never talks to database directly.
Backend layers stay clean and testable.

3. How this matches your React frontend

Your frontend routes like

/liturgy
/scc
/groups
/admin


Each page fetches data from the backend.

Example frontend fetch for events

useEffect(() => {
  fetch("/api/events")
    .then((res) => res.json())
    .then((data) => setEvents(data));
}, []);


Admin panel creates data

fetch("/api/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
  body: JSON.stringify(formData),
});







migrations define the database structure
• models talk to the database
• services apply church rules and logic
• controllers handle HTTP requests
• routes expose clean APIs
• frontend only consumes APIs

No one jumps layers.

This structure will scale when you add
Daily readings
Mass schedules
Leaders
Groups
Admin moderation
