const tokenString = document.getElementById("token");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");
// Initialize Firebase
const config = {
  apiKey: "AIzaSyAZ5XbUN_b4WteeBLs4EHDHSrsx0CfaQsM",
  authDomain: "push-notif-10d87.firebaseapp.com",
  databaseURL: "https://push-notif-10d87.firebaseio.com",
  projectId: "push-notif-10d87",
  storageBucket: "push-notif-10d87.appspot.com",
  messagingSenderId: "860746931881",
  appId: "1:860746931881:web:2e6e6e9b27796fa30813b8",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    message.innerHTML = "Notifications allowed";
    return messaging.getToken();
  })
  .then((token) => {
    tokenString.innerHTML = "Token Is : " + token;
    //subscribeTokenToTopic(token, "allUsers");
  })
  .catch((err) => {
    errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
    console.log("Unable to get permission to notify", err);
  });

messaging.onMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "https://push-notif-10d87.web.app/64.png",
    badge: "https://push-notif-10d87.web.app/24.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "https://push-notif-10d87.web.app/64.png",
    badge: "https://push-notif-10d87.web.app/24.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

function subscribeTokenToTopic(token, topic) {
  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization: "key=SERVICE KEY",
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        throw (
          "Error subscribing to  the following topic: " +
          response.status +
          " - " +
          response.text()
        );
      } else {
        console.log('Successfully subscribed to "' + topic + '"');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
