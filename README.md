<h1 align="center" style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/main/src/ipblock_frontend/src/assets/logo.jpg" alt="IPTrackChain" style="height: 110px; border-radius: 12px;" />
  <span style="font-size: 40px; color: gray;">×</span>
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/main/src/ipblock_frontend/src/assets/logo2.svg" alt="ICP Blockchain" style="height: 70px;" />
</h1>

<p align="center">
  <b>Next-gen decentralized login IP tracker with anomaly alerts and full audit history built on Internet Computer Protocol.</b>
</p>


## 🚀 Overview

**IPTrackChain** is a powerful and modern decentralized application (dApp) that tracks, audits, and alerts user login IP activity, stored immutably on the Internet Computer blockchain. It prioritizes security, transparency, and user privacy.

### 🛠️ Built With

- 🌐 **ICP Blockchain (DFINITY)**
- 🔐 **Internet Identity (WebAuthn Login)**
- ⚛️ **React + Tailwind CSS**
- 🧠 **Smart Canisters (Motoko)**
- 📍 **IP + Location Logging with Map Visualization**
- ⚠️ **Real-time Anomaly Detection System**

---

## 🔍 Key Features

✅ **Secure Web3 Login**  
Connect via Internet Identity no password needed.

✅ **IP Tracking & History**  
Records IP address, timestamp, and device info on every login.

✅ **Global Map Visualization**  
Login events displayed on an interactive world map.

✅ **Anomaly Detection Alerts**  
Detects suspicious behavior like sudden IP/location change.

✅ **Audit Trail**  
Easily browse and review immutable login records.

✅ **Decentralized Backend**  
All logic and data hosted on smart canisters no central server.

---

## 🧪 Live Demo

<p align="center">
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/774a87849e33572978f2ffc991d16a5206f83224/src/ipblock_frontend/src/assets/Screenshot%20(138).png" width="400" />
  <img src="https://raw.githubusercontent.com/ArielSltty/IPChain-Tracker/774a87849e33572978f2ffc991d16a5206f83224/src/ipblock_frontend/src/assets/Screenshot%20(139).png" width="400" />
</p>

---

## 🧭 Getting Started

To run this project locally on your machine:

### 1. Clone the Repository


```bash
# 1. Clone the repo
git clone https://github.com/ArielSltty/IPChain-Tracker.git
cd IPChain-Tracker

# 2. Clean environment & start DFX
dfx stop
dfx cache delete
dfx start --clean --background

# 3. Install all dependencies
npm install
cd src/ipblock_frontend && npm install && cd ../..

# 4. Deploy all canisters
dfx deploy

# 5. Run frontend (dev mode)
cd src/ipblock_frontend
npm run start
