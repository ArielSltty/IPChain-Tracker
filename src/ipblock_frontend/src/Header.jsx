import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ loggedIn, handleIIlogin }) {
  return (
    <header className="main-header">
      <img src="/assets/file.svg" alt="Logo" className="logo-img" />
      <span className="brand-title">IPTrackChain</span>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {!loggedIn && (
          <button className="connect-btn" onClick={handleIIlogin}>
            Connect
          </button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
