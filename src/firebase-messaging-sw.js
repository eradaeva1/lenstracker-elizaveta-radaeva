importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging.js");


firebase.initializeApp({
  apiKey: "AIzaSyA6UtmHTeIS8_cdGpTfyclkz9xjsqj9KVI",
  authDomain: "lenstracker-e6592.firebaseapp.com",
  projectId: "lenstracker-e6592",
  messagingSenderId: "658071888170",
  appId: "1:658071888170:web:f89bdd099d30931d2d3e53",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("🌙 Background message received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png", // Optional icon
  });
});
