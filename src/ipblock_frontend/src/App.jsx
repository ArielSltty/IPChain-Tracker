import { useState, useEffect } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Audit from './Audit';
import History from './History';
import { ipblock_backend } from 'declarations/ipblock_backend';


function App() {
  const [greeting, setGreeting] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [ip, setIP] = useState('');
  const [geo, setGeo] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [principal, setPrincipal] = useState('');
  const [history, setHistory] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [showAnomalyDetail, setShowAnomalyDetail] = useState(null);
  const [showAudit, setShowAudit] = useState(false);
  const [auditQuery, setAuditQuery] = useState('');
  const [auditResult, setAuditResult] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [stats, setStats] = useState({ users: 0, logs: 0, anomalies: 0 });
  const [allAnomalies, setAllAnomalies] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    ipblock_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  // Detect public IP
  async function fetchIP() {
    const res = await fetch('https://api64.ipify.org?format=json');
    const data = await res.json();
    setIP(data.ip);
    return data.ip;
  }

  // Fetch geolocation
  async function fetchGeo(ip) {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    setGeo(data);
    return data;
  }

  // Fetch user logs from backend
  async function fetchHistory(email, principal) {
    const logs = await ipblock_backend.getUserLogs(email, principal);
    setHistory(logs);
    setAnomalies(logs.filter(l => l.isAnomalous));
  }

  // Mock email/password login
  async function handleEmailLogin(e) {
    e.preventDefault();
    setUser(email);
    setPrincipal('');
    setLoggedIn(true);
    const ip = await fetchIP();
    const geo = await fetchGeo(ip);
    await ipblock_backend.log_login({
      email,
      principal: '',
      ip,
      timestamp: Date.now(),
      device: navigator.userAgent,
      geo: {
        country: geo.country_name,
        city: geo.city,
        isp: geo.org,
        lat: geo.latitude,
        lon: geo.longitude,
      },
    });
    fetchHistory(email, '');
  }

  // Mock Internet Identity login
  async function handleIIlogin() {
    // Replace with real ICP login flow
    const principal = 'mock-principal';
    setUser(principal);
    setPrincipal(principal);
    setLoggedIn(true);
    const ip = await fetchIP();
    const geo = await fetchGeo(ip);
    await ipblock_backend.log_login({
      email: '',
      principal,
      ip,
      timestamp: Date.now(),
      device: navigator.userAgent,
      geo: {
        country: geo.country_name,
        city: geo.city,
        isp: geo.org,
        lat: geo.latitude,
        lon: geo.longitude,
      },
    });
    fetchHistory('', principal);
  }

  async function handleAuditSearch(e) {
    e.preventDefault();
    if (!auditQuery) return;
    const logs = await ipblock_backend.queryPublicLogs(auditQuery);
    setAuditResult(logs);
  }

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

  useEffect(() => {
    if (loggedIn) {
      fetchHistory(email, principal);
    }
  }, [loggedIn]);

  if (showAdmin) {
    return (
      <AdminDashboard
        adminLoggedIn={adminLoggedIn}
        setAdminLoggedIn={setAdminLoggedIn}
        adminUser={adminUser}
        setAdminUser={setAdminUser}
        adminPass={adminPass}
        setAdminPass={setAdminPass}
        stats={stats}
        setStats={setStats}
        allAnomalies={allAnomalies}
        setAllAnomalies={setAllAnomalies}
        setShowAdmin={setShowAdmin}
        ipblock_backend={ipblock_backend}
      />
    );
  }

  if (showAudit) {
    return (
      <Audit
        auditQuery={auditQuery}
        setAuditQuery={setAuditQuery}
        auditResult={auditResult}
        setAuditResult={setAuditResult}
        setShowAudit={setShowAudit}
        ipblock_backend={ipblock_backend}
      />
    );
  }

  if (!loggedIn) {
    return (
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleEmailLogin={handleEmailLogin}
        handleIIlogin={handleIIlogin}
      />
    );
  }

  return (
    <History
      history={history}
      anomalies={anomalies}
      showAnomalyDetail={showAnomalyDetail}
      setShowAnomalyDetail={setShowAnomalyDetail}
      setShowAudit={setShowAudit}
      setShowAdmin={setShowAdmin}
      setLoggedIn={setLoggedIn}
    />
  );
}

export default App;