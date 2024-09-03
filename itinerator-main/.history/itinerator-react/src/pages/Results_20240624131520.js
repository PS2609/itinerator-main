import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import '../css/results.css';
import Map from '..//Map'; // Import the Map component

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
  const [locations, setLocations] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    if (quizId) {
      const docRef = doc(firestore, 'quizResponses', quizId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.itinerary) {
            setResponse(data.itinerary);
            const extractedLocations = extractLocations(data.itinerary);
            setLocations(extractedLocations);
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

  const saveAsPDF = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('itinerary.pdf');
    });
  };

  const getShareableLink = () => {
    return `${window.location.origin}/itinerary/${quizId}`;
  };

  const extractLocations = (itinerary) => {
    const locationRegex = /Location:\s*(.*?),\s*Lat:\s*(-?\d+\.\d+),\s*Lng:\s*(-?\d+\.\d+)/g;
    let matches;
    const locations = [];

    while ((matches = locationRegex.exec(itinerary)) !== null) {
      const name = matches[1];
      const lat = parseFloat(matches[2]);
      const lng = parseFloat(matches[3]);
      locations.push({ name, lat, lng });
    }

    return locations;
  };

  return (
    <div className="container" ref={contentRef}>
      <div className="content-wrapper">
        <div className="content">
          <div className="header">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w"
              className="logo"
              alt="Logo"
            />
            <Link to="/" className="title-link">Itinerator</Link>
          </div>
          <div className="results-container">
            <div className="results-header">
              <h1>Generated Itinerary</h1>
            </div>
            {response ? (
              <div className="itinerary">
                <ReactMarkdown>{response}</ReactMarkdown>
                <div className="actions">
                  <button className="button" onClick={saveAsPDF}>Save as PDF</button>
                  <button className="button" onClick={() => navigator.clipboard.writeText(getShareableLink())}>Copy Shareable Link</button>
                </div>
                <Map locations={locations} /> {/* Use the Map component */}
              </div>
            ) : (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <div>Loading itinerary...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;