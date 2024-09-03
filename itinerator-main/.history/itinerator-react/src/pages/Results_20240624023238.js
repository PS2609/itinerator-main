import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import '../css/results.css';

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
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    if (quizId) {
      const docRef = doc(firestore, 'quizResponses', quizId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResponse(data.itinerary);
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [quizId]);

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="content">
          <header className="header">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w"
              className="logo"
              alt="Logo"
            />
            <div className="title">
              Itinerator
            </div>
          </header>
          <div className="results-header">
            <h1>Generated Itinerary</h1>
          </div>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : response ? (
            <div className="itinerary">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          ) : (
            <div>Generating itinerary . . .</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;