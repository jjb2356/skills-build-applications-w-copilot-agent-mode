import React, { useEffect, useState } from 'react';
import API_BASE from '../api';

export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${API_BASE}/users/`;
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Users response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error('Users fetch error', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {items.length === 0 ? (
        <p>No users to show.</p>
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
