import React, { useState } from "react";

export default function Register({ setShowRegister, handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main>
      <img src="/assets/logo.jpg" alt="Logo" className="logo-img" style={{margin: "0 auto 1em auto", display: "block"}} />
      <h2>Sign Up</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleRegister(email, password);
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setShowRegister(false)} style={{width: '100%', marginTop: '0.5em'}}>Back to Login</button>
    </main>
  );
}
