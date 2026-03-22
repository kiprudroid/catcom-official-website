import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "../../../../components/Typography/Typography";
import { fetchJoinSccs, deleteJoinScc } from "@/api/joinScc.api";
import styles from "./JoinSccsSection.module.css";

function JoinSccsSection() {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJoinRequests = async () => {
      try {
        setLoading(true);
        const data = await fetchJoinSccs();
        setJoinRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJoinRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJoinScc(id);
      // Refresh the list
      const updated = await fetchJoinSccs();
      setJoinRequests(updated);
      alert("Request deleted successfully!");
    } catch (err) {
      alert("Failed to delete request");
      console.error(err);
    }
  };

  // Group requests by SCC
  const groupedRequests = joinRequests.reduce((acc, request) => {
    if (!acc[request.scc_name]) {
      acc[request.scc_name] = [];
    }
    acc[request.scc_name].push(request);
    return acc;
  }, {});

  if (loading) {
    return <Paragraph>Loading join requests...</Paragraph>;
  }

  if (error) {
    return <Paragraph style={{ color: "red" }}>Error: {error}</Paragraph>;
  }

  return (
    <div className={styles.adminPanel}>
      <SectionHeading as="h2">Join SCC Admin Panel</SectionHeading>

      {Object.keys(groupedRequests).length === 0 ? (
        <Paragraph>No join requests yet.</Paragraph>
      ) : (
        Object.entries(groupedRequests).map(([scc, requests]) => (
          <div key={scc} className={styles.sccGroup}>
            <SectionHeading as="h3">{scc}</SectionHeading>
            <div className={styles.requestsList}>
              {requests.map((request) => (
                <div key={request.user_id} className={styles.requestItem}>
                  <Paragraph><strong>Name:</strong> {request.full_name}</Paragraph>
                  <Paragraph><strong>Phone:</strong> {request.phone_number}</Paragraph>
                  <Paragraph><strong>Email:</strong> {request.email}</Paragraph>
                  <Paragraph><strong>Year:</strong> {request.year_study}</Paragraph>
                  <Paragraph><strong>Gender:</strong> {request.gender}</Paragraph>
                  <button
                    onClick={() => handleDelete(request.user_id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JoinSccsSection;