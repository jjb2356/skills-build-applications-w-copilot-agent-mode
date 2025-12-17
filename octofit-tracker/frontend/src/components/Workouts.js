import React, { useEffect, useState } from 'react';
import API_BASE from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${API_BASE}/workouts/`;
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Workouts response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error('Workouts fetch error', err));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {items.length === 0 ? (
        <p>No workouts to show.</p>
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
