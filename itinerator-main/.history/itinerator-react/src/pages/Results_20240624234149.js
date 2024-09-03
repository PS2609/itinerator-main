import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { auth, db } from '../FirebaseConfig';
import '../css/results.css';
import Map from '../
import RegexMatcher from './RegexMatcher';

const Results = () => {
  const { quizId } = useParams();
  const [response, setResponse] = useState(null);
  const contentRef = useRef(null);
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    if (quizId) {
      const docRef = doc(db, 'quizResponses', quizId);
      const unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.itinerary) {
            setResponse(data.itinerary);
          }
        } else {
          console.log("No such document!");
        }
      });

      return () => {
        unsubscribeDoc();
        unsubscribeAuth();
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

  const saveToProfile = async () => {
    if (!user) {
      alert("You must be logged in to save the itinerary to your profile.");
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'savedItineraries'), {
        quizId,
        itinerary: response,
        savedAt: new Date()
      });
      alert("Itinerary saved to your profile successfully!");
    } catch (error) {
      console.error("Error saving itinerary: ", error);
      alert("Failed to save itinerary. Please try again.");
    }
  };

  const handleExtract = (locations) => {
    setLocations(locations);
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
                <RegexMatcher text={response} onExtract={handleExtract} />
                <Map locations={locations} />
                <div className="actions">
                  <button className="button" onClick={saveAsPDF}>Save as PDF</button>
                  <button className="button" onClick={() => navigator.clipboard.writeText(getShareableLink())}>Copy Shareable Link</button>
                  <button className="button" onClick={saveToProfile}>Save to Profile</button>
                </div>
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