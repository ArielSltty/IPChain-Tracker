import React from 'react';

export default function AdminDashboard({
  adminLoggedIn, setAdminLoggedIn,
  adminUser, setAdminUser,
  adminPass, setAdminPass,
  stats, setStats,
  allAnomalies, setAllAnomalies,
  setShowAdmin,
  ipblock_backend
}) {
  async function handleAdminLogin(e) {
    e.preventDefault();
    const ok = await ipblock_backend.adminLogin(adminUser, adminPass);
    setAdminLoggedIn(ok);
    if (ok) {
      const users = await ipblock_backend.getTotalUsers();
      const logs = await ipblock_backend.getTotalLogs();
      const anomalies = await ipblock_backend.getAnomalyCount();
      setStats({ users, logs, anomalies });
      setAllAnomalies(await ipblock_backend.getAllAnomalies());
    }
  }

  function handleExportAnomalies() {
    const csv = [
      ["Date", "IP", "Location", "ISP", "Device"].join(","),
      ...allAnomalies.map(log =>
        [
          new Date(Number(log.timestamp)).toLocaleString(),
          log.ip,
          `${log.geo.city}, ${log.geo.country}`,
          log.geo.isp,
          log.device.replace(/,/g, " "),
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anomalies.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!adminLoggedIn) {
    return (
      <main>
        <h2>Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <input
            type="text"
            placeholder="Username"
            value={adminUser}
            onChange={e => setAdminUser(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={adminPass}
            onChange={e => setAdminPass(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={() => setShowAdmin(false)}>Back</button>
      </main>
    );
  }
  return (
    <main>
      <h2>Admin Dashboard</h2>
      <div>
        <strong>Total Users:</strong> {stats.users}<br />
        <strong>Total Logs:</strong> {stats.logs}<br />
        <strong>Total Anomalies:</strong> {stats.anomalies}
      </div>
      <h3>All Anomalies</h3>
      <button onClick={handleExportAnomalies}>Export CSV</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>IP</th>
            <th>Location</th>
            <th>ISP</th>
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {allAnomalies.map((log, idx) => (
            <tr key={idx}>
              <td>{new Date(Number(log.timestamp)).toLocaleString()}</td>
              <td>{log.ip}</td>
              <td>{log.geo.city}, {log.geo.country}</td>
              <td>{log.geo.isp}</td>
              <td>{log.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAdmin(false)}>Back</button>
    </main>
  );
}
