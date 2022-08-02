
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "react-playground-5d79f.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)