# 🔐 Brute Force Attack Demo (Educational Simulation)

This project simulates a brute force password attack for **educational and ethical hacking demonstrations only**. It shows how attackers might guess weak passwords using common patterns and wordlists.

> ❗ **DISCLAIMER:** This project is for educational purposes **only**. Never use it on real systems or accounts without permission. Misuse may violate laws and terms of service.

---

## 📂 Project Structure

- `hack.html` — Main UI for entering email and simulating brute force
- `hacked.html` — Displays "cracked" password and security tips
- `server.js` — Basic Node.js backend for fake login and password list API
- `passwords.json` — Simulated password database (used after common passwords fail)

---

## 🚀 Local Installation

### 1. Requirements

- [Node.js](https://nodejs.org/) v14 or later
- npm (comes with Node.js)

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/brute-force-demo.git
cd brute-force-demo

npm install express body-parser

node server.js
```

### The demo will be available at:
🌐 http://localhost:3000/hack.html




# ☁️ AWS EC2 Deployment (Ubuntu/Debian)

## 1. Launch EC2 Instance
Choose Ubuntu/Debian or Replace apt with yum for Amazon Linux, CentOS

Open port HTTP in the Security Group

## 2. Connect via SSH
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## 3. Install Node.js
```bash
sudo apt update
sudo apt install nodejs npm -y
```

## 4. Upload Project Files

Option 1: Git (recommended)

```bash
sudo apt install git
git clone https://github.com/r7avi/Hacking-Simple-Brute-Force.git
cd Hacking-Simple-Brute-Force
```

Option 2: Use scp from your local machine: (transfer git files from ur pc to linux)

```bash
scp -i your-key.pem -r ./brute-force-demo ubuntu@your-ec2-public-ip:/home/ubuntu/
```

## 5. Install Dependencies & Start Server

```bash
npm install express body-parser
node server.js
```

## 6. Access the Demo
Open in browser:
🌐 http://your-ec2-public-ip:3000/ & http://your-ec2-ip:3000/hack.html


## 🔄 How It Works

User inputs an email and clicks "Start Brute Force"

Script checks against common passwords first

If failed, it fetches passwords.json and tries each (randomly shuffled)

On success, a popup shows the password and redirects to hacked.html

## 🛡️ Educational Message
The hacked.html page educates users about password hygiene, 2FA, and how attackers exploit weak credentials.
This is made to demonstrate hacking at Bright minds academy chitradurga

# ✉️ Author - RAVI
Made with ❤️ for cybersecurity demos and ethical awareness.
