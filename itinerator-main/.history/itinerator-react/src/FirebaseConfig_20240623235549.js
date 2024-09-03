// FirebaseConfig.js

import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FirebaseConfig = ({ firebaseConfig }) => {
  useEffect(() => {
    // Initialize Firebase app if it's not already initialized
    if (!firebase.apps.length) {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const db = getFirestore(app);
      const auth = getAuth(app);
      
      // Optionally, you can return these Firebase instances or store them in context
      // For simplicity, we are not returning them here
    }
  }, [firebaseConfig]);

  return null; // This component doesn't render anything
};

export default FirebaseConfig;