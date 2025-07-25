import React from 'react';

export default function Login({ email, setEmail, password, setPassword, handleEmailLogin, handleIIlogin }) {
  return (
    <main>
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
      <div style={{textAlign: 'center', margin: '1em 0'}}>or</div>
      <button onClick={handleIIlogin} style={{width: '100%'}}>Login with Internet Identity</button>
    </main>
  );
}
