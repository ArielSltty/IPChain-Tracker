import React from 'react';
import GeoIPMap from './GeoIPMap';

// Example History component usage:
function History({ history, setShowAudit, setLoggedIn }) {
  return (
    <main>
      <h2>Login History</h2>
      <GeoIPMap logs={history} />
      {history.length === 0 ? (
        <div style={{textAlign: 'center', color: '#888', margin: '2em 0'}}>No login history found.</div>
      ) : (
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
            {history.map((log, idx) => (
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
      )}
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2em'}}>
        <button onClick={() => setShowAudit(true)}>Audit Trail</button>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </div>
    </main>
  );
}

export default History;