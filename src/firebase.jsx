// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { requestForToken } from "./firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6UtmHTeIS8_cdGpTfyclkz9xjsqj9KVI",
  authDomain: "lenstracker-e6592.firebaseapp.com",
  projectId: "lenstracker-e6592",
  storageBucket: "lenstracker-e6592.appspot.com",
  // storageBucket: "lenstracker-e6592.firebasestorage.app",
  messagingSenderId: "658071888170",
  appId: "1:658071888170:web:f89bdd099d30931d2d3e53",
  measurementId: "G-MQ65K7GHYY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to request notification permission and retrieve FCM token
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("🔔 Notification Permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
      console.log("🎯 FCM Token:", token);
      if (!token) throw new Error("FCM Token is null. Check service worker.");
      return token;
    } else {
      console.error("❌ Permission denied for notifications.");
    }
  } catch (error) {
    console.error("⚠️ Error fetching token:", error);
  }
};

console.log("✅ Firebase initialized:", firebaseApp);

// Listen for incoming messages in the foreground
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Message Received:", payload);
      resolve(payload);
    });
  });

export { messaging };






// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);