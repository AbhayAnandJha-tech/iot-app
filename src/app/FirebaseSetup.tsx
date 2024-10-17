import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChDturrCl7hxASdkkiZ8ZoAL7fTiOs0fg",
  authDomain: "iot-dashboard-solution.firebaseapp.com",
  databaseURL: "https://iot-dashboard-solution-default-rtdb.firebaseio.com", // Make sure to include your database URL
  projectId: "iot-dashboard-solution",
  storageBucket: "iot-dashboard-solution.appspot.com",
  messagingSenderId: "800303889421",
  appId: "1:800303889421:web:c899e6e6f72f99555e2944",
  measurementId: "G-REQKTEZ3YQ",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
