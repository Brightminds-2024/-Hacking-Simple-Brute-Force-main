const { MongoClient } = require("mongodb");

const MONGO_URL = "mongodb+srv://ir7avi:QrDNheBivvUmZNBp@cluster0.cfyi8.mongodb.net";
const DB_NAME = "authDemo";

const N = 250; // number of users to insert

// Helper to generate random string for password and name
function randomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for(let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper to generate random email
function randomEmail() {
  const providers = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
  return randomString(7).toLowerCase() + "@" + providers[Math.floor(Math.random() * providers.length)];
}

async function seed() {
  const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const users = db.collection("users");

    const bulkOps = [];
    for (let i = 0; i < N; i++) {
      const name = randomString(8);
      const email = randomEmail();
      const password = randomString(10);
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)); // random within last year

      bulkOps.push({
        insertOne: {
          document: { name, email, password, createdAt }
        }
      });

      if (bulkOps.length === 1000) { // insert in batches of 1000 for performance
        await users.bulkWrite(bulkOps);
        bulkOps.length = 0;
        console.log(`Inserted ${i + 1} users...`);
      }
    }
    if (bulkOps.length > 0) {
      await users.bulkWrite(bulkOps);
      console.log(`Inserted remaining users.`);
    }
    console.log("✅ Successfully inserted 10,000 random users!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

seed();
