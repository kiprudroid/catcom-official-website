import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Members.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

function lastNDaysDate(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export default function Members() {
  const [requests, setRequests] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("admin_pending_requests")) || [
          // sample items (if none in localStorage)
          {
            id: 1,
            name: "Alice",
            requestedAt: new Date().toISOString(),
            note: "Join SCC",
          },
          {
            id: 2,
            name: "Bob",
            requestedAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 3
            ).toISOString(),
            note: "Member",
          },
        ]
      );
    } catch {
      return [];
    }
  });

  const [filterRange, setFilterRange] = useState("all"); // all, 1, 7, 30

  const filtered = useMemo(() => {
    if (filterRange === "all") return requests;
    const days = Number(filterRange);
    const cutoff = lastNDaysDate(days);
    return requests.filter((r) => new Date(r.requestedAt) >= cutoff);
  }, [requests, filterRange]);

  // accept / reject actions
  const accept = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const reject = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  useEffect(() => {
    localStorage.setItem("admin_pending_requests", JSON.stringify(requests));
  }, [requests]);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.logoGroup}>
          <Link to="/admin" className={styles.backLink}>
            ← Back to Admin
          </Link>
          <SectionHeading>Membership Requests</SectionHeading>
        </div>
      </div>

      <section className={styles.section}>
        <div style={{ marginBottom: 12 }}>
          <label>Show:</label>
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="all">All time</option>
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <ul className={styles.list}>
          {filtered.length === 0 && <div>No requests found.</div>}
          {filtered.map((r) => (
            <li key={r.id} className={styles.listItem}>
              <div className={styles.listRow}>
                <div>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {new Date(r.requestedAt).toLocaleString()}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => accept(r.id)}>Accept</button>
                  <button onClick={() => reject(r.id)}>Reject</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
