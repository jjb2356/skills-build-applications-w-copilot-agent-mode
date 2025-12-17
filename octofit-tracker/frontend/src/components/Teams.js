import React, { useEffect, useState } from 'react';
import API_BASE from '../api';

export default function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${API_BASE}/teams/`;
    console.log('Fetching Teams from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Teams response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error('Teams fetch error', err));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {items.length === 0 ? (
        <p>No teams to show.</p>
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
