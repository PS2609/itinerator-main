import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import '../'';

const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

const Results = () => {
  const { quizId } = useParams();
  const [db, setDb] = useState(null);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    setDb(firestore);

    if (quizId) {
      const docRef = doc(firestore, 'quizResponses', quizId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStatus(data.status ? JSON.stringify(data.status, null, 2) : null);
          if (data.itinerary) {
            setResponse(data.itinerary);
          }
        } else {
          console.log("No such document!");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [quizId]);

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Generated Itinerary</h1>
      </div>
      {status && <div className="status">Status: <pre>{status}</pre></div>}
      {response ? (
        <div className="itinerary">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Results;