import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMKCRaLueL649R4dCyek4cI_wgy8nvvZY",
  authDomain: "crop-recommendation-b0802.firebaseapp.com",
  databaseURL: "https://crop-recommendation-b0802-default-rtdb.firebaseio.com",
  projectId: "crop-recommendation-b0802",
  storageBucket: "crop-recommendation-b0802.appspot.com",
  messagingSenderId: "343276248922",
  appId: "1:343276248922:web:276519f5e768bc465f9d63",
  measurementId: "G-1DQPSLVG83",
};

const app = initializeApp(firebaseConfig);
export default app;
