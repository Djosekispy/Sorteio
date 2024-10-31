
import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGEIN_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "./variables.env";

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGEIN_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

