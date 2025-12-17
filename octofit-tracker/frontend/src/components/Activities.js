import React, { useEffect, useState } from 'react';
import API_BASE from '../api';

export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `${API_BASE}/activities/`;
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Activities response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error('Activities fetch error', err));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <pre style={{ display: 'none' }}>{/* keep JSON easy to inspect in DOM */}</pre>
      {items.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <ul className="list-group">
          {items.map((it, idx) => (
            <li key={idx} className="list-group-item">
              {JSON.stringify(it)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
