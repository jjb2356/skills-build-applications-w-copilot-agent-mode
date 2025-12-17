import React, { useEffect, useState } from 'react';
import API_BASE from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${API_BASE}/leaderboard/`;
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Leaderboard response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error('Leaderboard fetch error', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {items.length === 0 ? (
        <p>No leaderboard data.</p>
      ) : (
        <ul className="list-group">
          {items.map((it, idx) => (
            <li key={idx} className="list-group-item">{JSON.stringify(it)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
