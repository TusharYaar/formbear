import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_APIKEY,
  authDomain: NEXT_PUBLIC_AUTHDOMAIN,
  projectId: NEXT_PUBLIC_PROJECTID,
  storageBucket: NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: NEXT_PUBLIC_SENDERID,
  appId: NEXT_PUBLIC_APPID,
  measurementId: NEXT_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
