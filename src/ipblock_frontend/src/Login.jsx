import React from 'react';

export default function Login({ email, setEmail, password, setPassword, handleEmailLogin, handleIIlogin, setShowRegister }) {
  return (
    <main>
      <img src="/assets/logo.jpg" alt="Logo" className="logo-img" style={{margin: "0 auto 1em auto", display: "block"}} />
      <h2>Welcome to IPTrackChain</h2>
      <p style={{textAlign: 'center', color: '#4f8edc', marginBottom: '1.5em'}}>
        Login to track your IP activity securely on ICP Blockchain.
      </p>
      <form onSubmit={handleEmailLogin}>
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
        <button type="submit">Login (Email)</button>
      </form>
      <button onClick={() => setShowRegister(true)} style={{width: '100%', marginTop: '0.5em'}}>Sign Up</button>
      <div style={{textAlign: 'center', margin: '1em 0'}}>or</div>
      <button onClick={handleIIlogin} style={{width: '100%'}}>Login with Internet Identity</button>
    </main>
  );
}
