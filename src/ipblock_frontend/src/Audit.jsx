import React from 'react';

export default function Audit({
  auditQuery, setAuditQuery,
  auditResult, setAuditResult,
  setShowAudit,
  ipblock_backend
}) {
  async function handleAuditSearch(e) {
    e.preventDefault();
    if (!auditQuery) return;
    const logs = await ipblock_backend.queryPublicLogs(auditQuery);
    setAuditResult(logs);
  }

  return (
    <main>
      <h2>Public Audit</h2>
      <form onSubmit={handleAuditSearch}>
        <input
          type="text"
          placeholder="Wallet Principal"
          value={auditQuery}
          onChange={e => setAuditQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>IP</th>
            <th>Location</th>
            <th>ISP</th>
            <th>Anomaly</th>
          </tr>
        </thead>
        <tbody>
          {auditResult.map((log, idx) => (
            <tr key={idx}>
              <td>{new Date(Number(log.timestamp)).toLocaleString()}</td>
              <td>{log.ip}</td>
              <td>{log.geo.city}, {log.geo.country}</td>
              <td>{log.geo.isp}</td>
              <td>{log.isAnomalous ? '⚠️' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAudit(false)}>Back</button>
    </main>
  );
}
