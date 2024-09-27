import React, { useCallback } from 'react';
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import { Button } from '@mui/material';
import vietnamJson from "./vietnam.json"; // Make sure to add this file to your project
import { useNavigate } from 'react-router-dom';
import './VNmap.css';

// Cập nhật dữ liệu thành phố với tọa độ chính xác
const cityData = {
  "VN-57": { name: "Bình Dương", value: 1},
  "VN-25": { name: "Quảng Trị", value: 3 },
  "VN-DN": { name: "Đà Nẵng", value: 1},
  "VN-HN": { name: "Hà Nội", value: 18 },
  "VN-SG": { name: "Hồ Chí Minh", value: 20 }
};
const cityDataLocation = {
  "VN-57": { name: "Bình Dương", value: 1, coordinates: [14.1653, 101.6758] },
  "VN-25": { name: "Quảng Trị", value: 3, coordinates: [20.7943, 101.0451] },
  "VN-DN": { name: "Đà Nẵng", value: 1, coordinates: [20.5544, 108.5022] },
  "VN-HN": { name: "Hà Nội", value: 18, coordinates: [28.0285, 108.8542] },
  "VN-SG": { name: "Hồ Chí Minh", value: 20, coordinates: [18.8231, 106.6297] }
};

function VNmap() {
  const navigate = useNavigate();

  const onEachFeature = useCallback((feature, layer) => {
    if (!feature?.properties?.code) return;

    const currentCity = cityData[feature.properties.code];
    if (currentCity) {
      layer.setStyle({
        fillColor: "#8B0000",
        fillOpacity: 0.7,
      });
    }
  }, []);

  const MoveChoosePerson = (nameCity) => {
    navigate('/mux/choose-person', { state: { nameCity: nameCity } });
  };
  return (
    <div className="vnmap-container">
      <Button variant="contained" 
            color="primary" 
            className="mui-button"
            disabled>
        Chọn tỉnh thành
      </Button>
      <MapContainer
        className="vietnam-map"
        zoom={5}
        center={[16.047079, 108.20623]}
        style={{ height: "50vh", width: "100%" }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <GeoJSON
          data={vietnamJson.features}
          style={{
            color: "#FFFFFF",
            weight: 1,
            fillColor: "#CBA7BD",
            fillOpacity: 1
          }}
          onEachFeature={onEachFeature}
        />
        {Object.values(cityDataLocation).map((city) => (
          <Popup
            key={city.name}
            position={city.coordinates}
            closeButton={false}
            closeOnClick={false}
            autoClose={false}
          >
            <div className="tooltip" onClick={() => MoveChoosePerson(city.name)}>
              <p className="city-name">{city.name}</p>
              {/* <p className="city-value">
                <span>Số lượng bệnh viện </span>
                <span>{city.value}</span>
              </p> */}
            </div>
          </Popup>
        ))}
        <Popup
          position={[28.668011, 109.939995]}
          closeButton={false}
          closeOnClick={false}
          autoClose={false}
        >
          Quần đảo Hoàng Sa
        </Popup>
        <Popup
          position={[23.487044, 109.939995]}
          closeButton={false}
          closeOnClick={false}
          autoClose={false}
        >
          Quần đảo Trường Sa
        </Popup>
      </MapContainer>
    </div>
  );
}

export default VNmap;