import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import SimpleMap from "./map/SimpleMap";
import { isEmpty } from "lodash";

function App() {
  const [geoJsonData, setGeoJsonData] = useState({});
  const mapPlaceholderRef = useRef();
  useEffect(() => {
    const getGeoJson = async () => {
      const response = await fetch("nepal-districts-new.geojson");
      if (response.ok) {
        const nepalMapGeoJson = await response.json();
        setGeoJsonData(nepalMapGeoJson);
      } else {
        console.error(response.statusText);
      }
    };
    getGeoJson().catch((err) => console.error(err));
  }, []);
  return (
    <div className='map-container m-3 d-flex flex-column'>
      <div className='map-header d-flex'>
        <h4>Map of Nepal</h4>
      </div>
      <div className='my-3 map-placeholder d-flex' ref={mapPlaceholderRef}>
        {!isEmpty(geoJsonData) && (
          <SimpleMap
            mapGeoJsonData={geoJsonData}
            placeholderRef={mapPlaceholderRef}
          />
        )}
      </div>
    </div>
  );
}

export default App;
