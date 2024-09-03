import React, { useState } from 'react';

const extractCoverPhoto = (text) => {
  console.log("Extracting cover photo...");
  const coverPhotoRegex = /\*\*Cover Photo:\*\*\s*(.+?)\s*\*\*Location List/m;
  const match = text.match(coverPhotoRegex);
  console.log("Cover photo match:", match);
  return match ? match[1] : null;
};

const extractLocationList = (text) => {
  console.log("Extracting location list...");
  const locationListRegex = /\*\*Location List \(Longitude, Latitude\):\*\*((?:\s*\*.+)*)/m;
  const match = text.match(locationListRegex);
  console.log("Location list match:", match);
  if (!match) return null;

  const locationsText = match[1];
  const locationRegex = /\*\s*(.+?):\s*([-\d.]+),\s*([-\d.]+)/g;
  const locations = [];
  let locationMatch;

  while ((locationMatch = locationRegex.exec(locationsText)) !== null) {
    console.log("Location match:", locationMatch);
    locations.push({
      name: locationMatch[1],
      longitude: locationMatch[2],
      latitude: locationMatch[3],
    });
  }

  console.log("Extracted locations:", locations);
  return locations;
};

const RegexMatcher = () => {
  const [text, setText] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [locations, setLocations] = useState(null);

  const handleExtract = () => {
    console.log("Handling extract...");
    const extractedCoverPhoto = extractCoverPhoto(text);
    const extractedLocations = extractLocationList(text);
    console.log("Extracted cover photo:", extractedCoverPhoto);
    console.log("Extracted locations:", extractedLocations);
    setCoverPhoto(extractedCoverPhoto);
    setLocations(extractedLocations);
  };

  return (
    <div>
      <h1>Regex Matcher</h1>
      <textarea
        rows="10"
        cols="80"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
      />
      <br />
      <button onClick={handleExtract}>Extract</button>
      <div>
        <h2>Cover Photo</h2>
        <p>{coverPhoto || 'No Cover Photo found'}</p>
        <h2>Location List</h2>
        <ul>
          {locations
            ? locations.map((location, index) => (
                <li key={index}>
                  {location.name}: Longitude {location.longitude}, Latitude{' '}
                  {location.latitude}
                </li>
              ))
            : 'No locations found'}
        </ul>
      </div>
    </div>
  );
};

export default RegexMatcher;