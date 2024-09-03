import React, { useEffect, useRef } from 'react';

const Map = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: locations[0].lat, lng: locations[0].lng },
      });

      locations.forEach(location => {
        new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });
      });
    }
  }, [locations]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>;
};

export default Map;