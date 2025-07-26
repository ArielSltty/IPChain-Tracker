<p align="center">
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/25b2544e7f02bd5161fa4b6b4ded6462951b867c/src/ipblock_frontend/src/assets/logo.jpg" alt="IPChain-Tracker Logo" width="200" />
</p>

# IPTrackChain

**IPTrackChain** is a modern decentralized application (dApp) built on the Internet Computer Protocol (ICP) blockchain. It enables users to track, audit, and secure their login IP activity with full transparency and robust data security.

## How Does IPTrackChain Work?

- **Seamless Web3 Login:** Users connect using Internet Identity, ensuring secure and passwordless authentication.
- **Automatic Logging:** Every login event records your IP address, location, timestamp, and device information directly on the ICP blockchain.
- **Audit Trail & Visualization:** Instantly audit your login history and visualize activity on a global map.
- **Anomaly Detection:** The system automatically flags suspicious logins (e.g., drastic location/IP changes) as anomalies.

## Key Advantages

- 🔒 **Strong Data Security:** All login data is stored immutably on the ICP blockchain and cannot be altered or deleted.
- 🛡️ **Privacy by Design:** Only you can access your login history unless you share your principal.
- 🌐 **Fully Decentralized:** No central servers—everything runs on smart contracts.
- ⚡ **Early Anomaly Alerts:** Get notified of unusual login activity in real time.
- 🛰️ **Global Visualization:** See your login activity mapped worldwide.

---

## How to Run This Application

Follow these steps to set up and run IPTrackChain locally:

1. **Clone the repository and enter the project directory:**
   ```bash
   cd ipblock
   ```

2. **Clean up previous builds (optional but recommended):**
   ```bash
   dfx stop
   dfx cache delete
   dfx start --clean --background
   ```

3. **Install dependencies:**
   ```bash
   npm install
   cd src/ipblock_frontend
   npm install
   cd ../..
   ```

4. **Deploy canisters (backend & frontend):**
   ```bash
   dfx deploy
   ```

5. **Start the frontend development server:**
   ```bash
   cd src/ipblock_frontend
   npm run start
   ```
   Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

## Notes for WSL Ubuntu Users

- Run all commands from your WSL terminal (not Windows CMD/PowerShell).
- Use Linux-style paths (e.g. `/home/youruser/ipblock`).
- If you see errors about missing files or directories, check your current directory with `pwd` and use `ls` to verify structure.
- If you get permission errors, try running `dfx` commands with `sudo` (not usually needed, but can help if you installed dfx with sudo).

---

## Demo

<p align="center">
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/774a87849e33572978f2ffc991d16a5206f83224/src/ipblock_frontend/src/assets/Screenshot%20(138).png" width="400" />
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/774a87849e33572978f2ffc991d16a5206f83224/src/ipblock_frontend/src/assets/Screenshot%20(139).png" width="400" />
</p>
