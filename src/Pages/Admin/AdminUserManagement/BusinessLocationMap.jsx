import { useEffect, useRef, useState } from "react";

const loadGoogleMapsScript = (apiKey, callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    existingScript.onload = () => {
      callback();
    };
  }
};

const BusinessLocationMap = ({ coordinates, name, description, apiKey }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const infoWindowInstance = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript(apiKey, () => {
      setLoaded(true);
    });
  }, [apiKey]);

  useEffect(() => {
    if (!loaded) return;

    const [lng, lat] = coordinates;
    const position = { lat, lng };

    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 14,
      });
    }

    if (!markerInstance.current) {
      markerInstance.current = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
      });

      infoWindowInstance.current = new window.google.maps.InfoWindow({
        content: `<div style="max-width:200px;">
                    <h3 style="margin:0">${name}</h3>
                    <p style="margin:0">${description}</p>
                  </div>`,
      });

      markerInstance.current.addListener("click", () => {
        infoWindowInstance.current.open({
          anchor: markerInstance.current,
          map: mapInstance.current,
          shouldFocus: false,
        });
      });
    } else {
      markerInstance.current.setPosition(position);
      mapInstance.current.setCenter(position);
      infoWindowInstance.current.setContent(
        `<div style="max-width:200px;">
          <h3 style="margin:0">${name}</h3>
          <p style="margin:0">${description}</p>
        </div>`
      );
    }
  }, [loaded, coordinates, name, description]);

  return (
    <div>
      {!loaded && <p>Loading map...</p>}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      />
    </div>
  );
};

export default BusinessLocationMap;
