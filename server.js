const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");

const PORT = 80;
const MONGO_URL = "mongodb+srv://ir7avi:QrDNheBivvUmZNBp@cluster0.cfyi8.mongodb.net";
const DB_NAME = "authDemo";

let db, users;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    users = db.collection("users");
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => console.error(err));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await users.findOne({ email });
  if (userExists) return res.json({ success: false, message: "Email already registered." });

  await users.insertOne({ name, email, password, createdAt: new Date() });
  res.json({ success: true, message: "✅ Registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email, password });
  if (user) {
    res.json({ success: true, name: user.name, email: user.email, createdAt: user.createdAt });
  } else {
    res.json({ success: false, message: "❌ Invalid credentials" });
  }
});

// GET all passwords in database (only passwords array, no emails/names)
app.get("/password-list", async (req, res) => {
  const passwords = await users.find({}, { projection: { password: 1, _id: 0 } }).toArray();
  // extract just password strings
  const passwordList = passwords.map(u => u.password);
  res.json(passwordList);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
