import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA_sKCrZDr535buLd3FzoTM81wDo35_qs",
  authDomain: "my-duka-app.firebaseapp.com",
  projectId: "my-duka-app",
  storageBucket: "my-duka-app.appspot.com",
  messagingSenderId: "552025344699",
  appId: "1:552025344699:web:f855ec60a32586ed01379e",
  measurementId: "G-52GES5C5BL"
};

let app;

try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error", error);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, googleProvider };