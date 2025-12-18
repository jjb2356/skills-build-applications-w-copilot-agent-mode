import React, { useEffect, useState, useCallback } from 'react';
import API_BASE from '../api';
import Modal from './Modal';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/users`;
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Users response', json);
        const data = json?.results ?? json ?? [];
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => {
        console.error('Users fetch error', err);
        setError(err?.message || String(err));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    const keys = items.reduce((acc, it) => {
      if (it && typeof it === 'object') Object.keys(it).forEach(k => acc.add(k));
      return acc;
    }, new Set());
    return Array.from(keys);
  }, [items]);

  function openModal(row) { setModalContent(row); setShowModal(true); }
  function renderCell(value) { if (value === null || value === undefined) return ''; if (typeof value === 'object') return JSON.stringify(value); return String(value); }

  return (
    <div className="card app-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Users</h3>
        <div className="card-header-actions">
          <button className="btn btn-sm btn-primary" onClick={fetchData} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
        </div>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {items.length === 0 ? (
          <p className="text-muted">No users to show.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  {columns.map(c => <th key={c}>{c}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    {columns.map(c => <td key={c} className="table-json-cell">{renderCell(it?.[c])}</td>)}
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openModal(it)}>View</button>
                      <a className="btn btn-sm btn-link" href="#">Link</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal show={showModal} title="User JSON" onClose={() => setShowModal(false)}>
        <pre>{JSON.stringify(modalContent, null, 2)}</pre>
      </Modal>
    </div>
  );
}
