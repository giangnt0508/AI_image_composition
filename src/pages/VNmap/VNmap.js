import React, { useCallback } from 'react';
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import { Button } from '@mui/material';
import vietnamJson from "./vietnam.json"; // Make sure to add this file to your project
import { useNavigate } from 'react-router-dom';
import './VNmap.css';
import ImageMap from "../../images/map/map.png"

// Cập nhật dữ liệu thành phố với tọa độ chính xác
const cityData = {
  "VN-54": { name: "SaPa", value: 14},
  "VN-04": { name: "Cao Bằng", value: 14},
  "VN-02": { name: "Lào Cai", value: 37},
  "VN-57": { name: "Bình Dương", value: 1},
  "VN-25": { name: "Quảng Trị", value: 3 },
  "VN-DN": { name: "Đà Nẵng", value: 1},
  "VN-HN": { name: "Hà Nội", value: 18 },
  "VN-SG": { name: "Hồ Chí Minh", value: 20 },
  "VN-39": {name: "Đồng Nai", value: 20 },
  "VN-35": {name: "Lâm Đồng", value: 20 },
  "VN-72": {name: "Đăk Nông", value: 20 },
};
const cityDataLocation = {
  "VN-02": { name: "Lào Cai", index: "LC", coordinates: [20.05, 110.85] },
  "VN-04": { name: "Cao Bằng", index: "CB", coordinates: [21.23, 128.85] },
  "VN-54": { name: "SaPa", index: "SP", coordinates: [19.65, 111.51] },
  "VN-HN": { name: "Hà Nội", index: "HN", coordinates: [21.52, 127.90] },
  "VN-51": { name: "Vinh", index: "V", coordinates: [22.25, 123.9] },
  "VN-DN": { name: "Đà Nẵng", index: "ĐN", coordinates: [22.75, 131.52] },
  "VN-25": { name: "Kon Tum", index: "KT", coordinates: [22.20, 116.54] },
  "VN-35": {name: "Lâm Đồng", index: "LD", coordinates: [21.40, 128.67] },
  "VN-72": {name: "Đăk Nông", index: "DK", coordinates: [23.15, 113.87] },
  "VN-57": { name: "Bình Dương", index: "BD", coordinates: [24.95, 108.77] },
  "VN-39": {name: "Đồng Nai", index: "ĐN", coordinates: [22.85, 111.62] },
  "VN-SG": { name: "TP. Hồ Chí Minh", index: "HCM", coordinates: [24.55, 125.70] },
};

const colors = ["#e1e245", "#00bb5f", "#9dce31", "#00c66e"]; // Define the colors

function VNmap() {
  const navigate = useNavigate();

  const onEachFeature = useCallback((feature, layer) => {
    if (!feature?.properties?.code) return;

    const currentCity = cityData[feature.properties.code];
    if (currentCity) {
      // Set color based on the index of the feature
      const index = Object.keys(cityData).indexOf(feature.properties.code) % colors.length;
      layer.setStyle({
        fillColor: colors[index], // Use the color from the array
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
            sx={{
              fontSize: "50px !important",
              marginTop: "70px"
            }}
            disabled>
        Chọn tỉnh thành
      </Button>
      <div style={{ position: 'relative', paddingTop: '250px', scale: "1.6" }}>
       
        <MapContainer
          className="vietnam-map"
          zoom={5}
          center={[16.047079, 108.20623]}
          zoomControl={false}
          dragging={false}
          touchZoom={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <img 
          src={ImageMap} 
          alt="Background" 
          className="background-image-map" 
        />
          
          {Object.values(cityDataLocation).map((city) => (
            <Popup
              key={city.name}
              position={city.coordinates}
              closeButton={false}
              closeOnClick={false}
              autoClose={false}
            >
              <div className="tooltip" style={{ opacity: 0 }}  onClick={() => MoveChoosePerson(city.name)}>
                <p className="city-name">{city.index}</p>
                {/* <p className="city-value">
                  <span>Số lượng bệnh viện </span>
                  <span>{city.value}</span>
                </p> */}
              </div>
            </Popup>
          ))}
          <Popup
            position={[26.668011, 109.939995]}
            closeButton={false}
            closeOnClick={false}
            autoClose={false}
          >
            Quần đảo Hoàng Sa
          </Popup>
          <Popup
            position={[20.487044, 109.939995]}
            closeButton={false}
            closeOnClick={false}
            autoClose={false}
          >
            Quần đảo Trường Sa
          </Popup>
        </MapContainer>
      </div>
    </div>
  );
}

export default VNmap;