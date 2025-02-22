import { useEffect, useState } from "react";
import { requestForToken, onMessageListener } from "../firebase";
import axios from "axios";

const NotificationComponent = ({ userId }) => {
  const [notification, setNotification] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  // Request for FCM token and store it in the backend
  const getFcmToken = async () => {
    try {
      const token = await requestForToken();
      if (token) {
        console.log("FCM Token:", token);
        setFcmToken(token);  // Store token in local state
        // Send FCM token to backend to store in MySQL
        await axios.post("http://localhost:5000/api/store-fcm-token", {
          userId,
          fcmToken: token,  // Ensure the key is correct based on your backend model
        });
        console.log("FCM Token stored successfully");
      }
    } catch (err) {
      console.error("Error getting FCM token:", err);
    }
  };

  // Listen for incoming foreground notifications
  const listenForNotifications = () => {
    onMessageListener()
      .then((payload) => {
        console.log("Notification received:", payload);
        setNotification(payload.notification);  // Set the notification to state
      })
      .catch((err) => console.log("Notification error:", err));
  };

  useEffect(() => {
    // Initialize FCM token retrieval and notification listener on mount
    getFcmToken();
    listenForNotifications();
  }, [userId]);

  return (
    <div>
      {/* Display notification if available */}
      {notification && (
        <div className="notification">
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}

      {/* Optionally, show the FCM token for debugging */}
      {fcmToken && (
        <div>
          <h5>FCM Token:</h5>
          <p>{fcmToken}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;