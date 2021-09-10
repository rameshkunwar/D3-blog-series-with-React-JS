import logo from "./logo.svg";
import "./App.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import SimpleMap from "./map/SimpleMap";
import { isEmpty } from "lodash";
import { useResizeDetector, withResizeDetector } from "react-resize-detector";

function App({ width, height, targetRef }) {
  const [geoJsonData, setGeoJsonData] = useState({});
  const mapPlaceholderRef = useRef();
  const _uid = "308b3773-e652-4f51-87d8-f4d78381dae4";
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

  useLayoutEffect(() => {
    const appPostMessage = (action, data) => {
      console.info("data: " + data + "-- action: " + action);
      window.parent.postMessage(
        { action: action, data: data, targetFrame: _uid },
        "*"
      );
    };
    const getHeight = () => {
      return height;
    };

    appPostMessage("iframe_resize", getHeight());
  }, [height]);

  return (
    <div className='map-container m-3 d-flex flex-column' ref={targetRef}>
      <div className='map-header d-flex'>
        <h4>Map of Nepal</h4>
        <h4>{`height = ${height} - width =  ${width}`}</h4>
      </div>
      <div
        className='my-3 map-placeholder d-flex'
        ref={mapPlaceholderRef}
        style={{ minHeight: 120 }}
      >
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

export default withResizeDetector(App);
