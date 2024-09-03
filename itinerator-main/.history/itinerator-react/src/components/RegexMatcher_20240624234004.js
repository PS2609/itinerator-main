import React, { useEffect, useState } from 'react';

const extractCoverPhoto = (text) => {
  console.log("Extracting cover photo...");
  const coverPhotoRegex = /\*\*Cover Photo:\*\*\s*(.+?)(?=\*\*|$)/ms;
  const match = text.match(coverPhotoRegex);
  console.log("Cover photo match:", match);
  return match ? match[1].trim() : null;
};

const extractLocationList = (text) => {
  console.log("Extracting location list...");
  const locationRegex = /\*\s*([A-Za-z\s,']+):\s*([-\d.]+),\s*([-\d.]+)/g;
  const locations = [];
  let match;

  while ((match = locationRegex.exec(text)) !== null) {
    console.log("Location match:", match);
    locations.push({
      title: match[1].trim(),
      longitude: parseFloat(match[2]),
      latitude: parseFloat(match[3]),
    });
  }

  console.log("Extracted locations:", locations);
  return locations;
};

const RegexMatcher = ({ text, onExtract }) => {
  const [inputText, setInputText] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleExtract = (extractText) => {
    console.log("Handling extract...");
    const extractedCoverPhoto = extractCoverPhoto(extractText);
    const extractedLocations = extractLocationList(extractText);
    console.log("Extracted cover photo:", extractedCoverPhoto);
    console.log("Extracted locations:", extractedLocations);
    setCoverPhoto(extractedCoverPhoto);
    setLocations(extractedLocations || []);
    if (onExtract) onExtract(extractedLocations || []);
  };

  useEffect(() => {
    if (text) {
      handleExtract(text);
    }
  }, [text]);

  return (
    <div>
      <h1>Regex Matcher</h1>
      {!text && (
        <>
          <textarea
            rows="10"
            cols="80"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here..."
          />
          <br />
          <button onClick={() => handleExtract(inputText)}>Extract</button>
        </>
      )}
      <div>
        <h2>Cover Photo</h2>
        <p>{coverPhoto || 'No Cover Photo found'}</p>
        <h2>Location List</h2>
        {locations.length > 0 ? (
          <ul>
            {locations.map((location, index) => (
              <li key={index}>
                <strong>Title:</strong> {location.title} <br />
                <strong>Longitude:</strong> {location.longitude} <br />
                <strong>Latitude:</strong> {location.latitude}
              </li>
            ))}
          </ul>
        ) : (
          <p>No locations found</p>
        )}
      </div>
    </div>
  );
};

export default RegexMatcher;