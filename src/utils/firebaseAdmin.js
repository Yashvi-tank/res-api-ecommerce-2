// src/utils/firebaseAdmin.js
const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("✅ Firebase Admin initialized");
} catch (err) {
  console.error("❌ Failed to load Firebase service account:", err);
  // don’t crash the entire app—just let auth middleware reject
}

module.exports = admin;
