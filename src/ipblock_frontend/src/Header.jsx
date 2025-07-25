import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="main-header">
      <img src="/assets/logo.jpg" alt="Logo" className="logo-img" />
      <span className="brand-title">IPTrackChain</span>
      <ThemeToggle />
    </header>
  );
}
