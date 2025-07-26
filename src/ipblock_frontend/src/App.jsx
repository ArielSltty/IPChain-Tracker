import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import "./index.scss";
import fileLogo from "./assets/file.svg";
import icpLogo from "./assets/logo2.svg";
import LandingPage from "./LandingPage";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "../../declarations/ipblock_backend";

const SIDEBAR_MENU = [
  { label: "IP Activity Logs", icon: "🗂" },
  { label: "Anomaly Detection", icon: "🚨" },
  { label: "Location Map", icon: "🗺" },
  { label: "Device Info", icon: "💻" },
  { label: "Settings", icon: "⚙️" },
];

function shortenId(id) {
  return id ? id.slice(0, 6) + "..." + id.slice(-3) : "";
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');
  const [history, setHistory] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [showAudit, setShowAudit] = useState(false);
  const [auditQuery, setAuditQuery] = useState('');
  const [auditResult, setAuditResult] = useState([]);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [activeMenu, setActiveMenu] = useState(SIDEBAR_MENU[0].label);
  const [errorMsg, setErrorMsg] = useState("");

  // State untuk data
  const [ipLogs, setIpLogs] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [settings, setSettings] = useState({});

  // Tambahkan loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    AuthClient.create()
      .then(client => {
        setAuthClient(client);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error initializing auth:", err);
        setIsLoading(false);
      });
  }, []);

  // Fetch user logs from backend
  async function fetchHistory(principal) {
    try {
      const logs = await ipblock_backend.getUserLogs('', principal);
      setHistory(logs);
      setAnomalies(logs.filter(l => l.isAnomalous));
    } catch (err) {
      setErrorMsg("Gagal mengambil data log dari backend.");
    }
  }

  // Internet Identity login only
  async function handleIIlogin() {
    if (!authClient) return;
    await authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : "http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize",
      windowOpenerFeatures: "width=500,height=700",
      onSuccess: async () => {
        try {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          setPrincipal(principal);
          setIdentity(identity);
          setLoggedIn(true);
          fetchHistory(principal);
        } catch (err) {
          setErrorMsg("Gagal login dengan Internet Identity.");
        }
      },
      onError: (err) => {
        setErrorMsg("Internet Identity not available on local replica. Use mainnet or deploy II canister locally.");
      }
    });
  }

  // Fetch data dari backend setelah login
  useEffect(() => {
    if (identity) {
      const agent = new HttpAgent();
      const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });
      backend.get_ip_logs().then(setIpLogs).catch(() => setIpLogs([]));
      backend.get_anomalies().then(setAnomalies).catch(() => setAnomalies([]));
      backend.get_device_info().then(setDeviceInfo).catch(() => setDeviceInfo({}));
      backend.get_settings().then(setSettings).catch(() => setSettings({}));
    }
  }, [identity]);

  useEffect(() => {
    if (loggedIn) {
      fetchHistory(principal);
    }
  }, [loggedIn]);

  // Tampilkan loading indicator
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Tampilkan error jika ada
  if (errorMsg) {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <h2>⚠️ Error</h2>
        <div>{errorMsg}</div>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
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

  // Tampilkan landing page jika belum login
  if (!identity) {
    return (
      <div className="login-page">
        <img src={fileLogo} alt="IPTrackChain Logo" className="logo" />
        <h1>IPTrackChain</h1>
        <button className="connect-btn" onClick={handleIIlogin}>
          Connect with Internet Identity
        </button>
        <img src={icpLogo} alt="ICP Logo" className="icp-logo" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header
        loggedIn={loggedIn}
        handleIIlogin={handleIIlogin}
      />
      <aside className="sidebar">
        <img src={fileLogo} alt="IPTrackChain Logo" className="logo" />
        <div className="user-id">
          Greeting, <span>{shortenId(identity.getPrincipal().toText())}</span>
        </div>
        <nav>
          {SIDEBAR_MENU.map((item) => (
            <div
              key={item.label}
              className={`menu-item${activeMenu === item.label ? " active" : ""}`}
              onClick={() => setActiveMenu(item.label)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
        <img src={icpLogo} alt="ICP Logo" className="icp-logo" />
      </aside>
      <main className="main-content">
        {activeMenu === "IP Activity Logs" && (
          <section>
            <h2>IP Activity Logs</h2>
            {ipLogs.length === 0 ? (
              <div>Belum ada data log.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>IP</th>
                    <th>Location</th>
                    <th>Timestamp</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {ipLogs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.ip}</td>
                      <td>{log.location}</td>
                      <td>{log.timestamp}</td>
                      <td>{log.device}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
        {activeMenu === "Anomaly Detection" && (
          <section>
            <h2>Anomaly Detection</h2>
            {anomalies.length === 0 ? (
              <div>Belum ada data anomali.</div>
            ) : (
              <ul>
                {anomalies.map((anom, idx) => (
                  <li key={idx}>{anom.description}</li>
                ))}
              </ul>
            )}
          </section>
        )}
        {activeMenu === "Location Map" && (
          <section>
            <h2>Location Map</h2>
            {/* Map menggunakan react-leaflet */}
            <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", marginBottom: "2rem" }}>
              <MapContainer center={[-6.2, 106.8]} zoom={3} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-6.2, 106.8]}>
                  <Popup>
                    Lokasi contoh (Jakarta)
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>
        )}
        {activeMenu === "Device Info" && (
          <section>
            <h2>Device Info</h2>
            {Object.keys(deviceInfo).length === 0 ? (
              <div>Belum ada data device.</div>
            ) : (
              <ul>
                {Object.entries(deviceInfo).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {val}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
        {activeMenu === "Settings" && (
          <section>
            <h2>Settings</h2>
            {Object.keys(settings).length === 0 ? (
              <div>Belum ada pengaturan.</div>
            ) : (
              <ul>
                {Object.entries(settings).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {val.toString()}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
        <section className="faq-box">
          <h2>FAQ</h2>
          <div className="faq-content">
            {/* ...existing FAQ content... */}
          </div>
        </section>
      </main>
    </div>
  );
}