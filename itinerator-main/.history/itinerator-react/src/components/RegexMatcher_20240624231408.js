import React, { useState } from 'react';

const extractCoverPhoto = (text) => {
  const coverPhotoRegex = /## Cover Photo:\s*(.+)$/m;
  const match = text.match(coverPhotoRegex);
  return match ? match[1] : null;
};

const extractLocationList = (text) => {
  const locationListRegex = /## Location List\s*\((.+?)\):((?:\s*\*.+)*)/m;
  const match = text.match(locationListRegex);
  if (!match) return null;

  const locationsText = match[2];
  const locationRegex = /\*\s*(.+?):\s*([-\d.]+),\s*([-\d.]+)/g;
  const locations = [];
  let locationMatch;

  while ((locationMatch = locationRegex.exec(locationsText)) !== null) {
    locations.push({
      name: locationMatch[1],
      longitude: locationMatch[2],
      latitude: locationMatch[3],
    });
  }

  return locations;
};

const RegexMatcher = () => {
  const [text, setText] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [locations, setLocations] = useState(null);

  const handleExtract = () => {
    const extractedCoverPhoto = extractCoverPhoto(text);
    const extractedLocations = extractLocationList(text);
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