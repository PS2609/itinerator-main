import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
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

    // Step 1: Identify the Locations List Section
  const listSectionRegex = /\*\*Locations List:\*\*\s*([\s\S]*)/g;
		const listSectionMatch = listSectionRegex.exec(itinerary);
		console.log("locations list" + listSectionMatch);
  if (!listSectionMatch) {
	  console.log("No locations list found.");
	  
    return [];
  }

  const listSection = listSectionMatch[1];


  // Step 2: Extract Each Location
   const locationTitleRegex = /\*\*\s*([^*]+?)\s*\*\*:/g;
  const longitudeRegex = /Longitude:\s*(-?\d+\.\d+)/g;
  const latitudeRegex = /Latitude:\s*(-?\d+\.\d+)/g;

  const titles = [];
  const longitudes = [];
  const latitudes = [];

  let match;
  while ((match = locationTitleRegex.exec(listSection)) !== null) {
    console.log("Title Match:", match[1].trim());
    titles.push(match[1].trim());
  }

  while ((match = longitudeRegex.exec(listSection)) !== null) {
    console.log("Longitude Match:", match[1]);
    longitudes.push(parseFloat(match[1]));
  }

		while ((match = latitudeRegex.exec(listSection)) !== null) {
			console.log("Latitude Match:", match[1]);
			latitudes.push(parseFloat(match[1]));
		}

 const locations = titles.map((title, index) => ({
    name: title,
    lng: longitudes[index],
    lat: latitudes[index],
  }));

  console.log("Extracted Locations:");
  console.log(locations); // Print out the extracted locations
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