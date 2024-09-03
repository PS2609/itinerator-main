import React, { useEffect, useRef } from 'react';

const Map = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: locations.length > 0 ? 10 : 2,
          center: locations.length > 0 
            ? { lat: locations[0].lat, lng: locations[0].lng }
            : { lat: 0, lng: 0 },
        });

        locations.forEach(location => {
          new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
          });
        });
      }
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIIMHgVVhViFHKPkYF002gJptJZDukKvY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [locations]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>;
};

export default Map;