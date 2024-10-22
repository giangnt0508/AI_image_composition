import React, { useCallback } from 'react';
import { MapContainer, Popup } from "react-leaflet";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './VNmap.css';
import ImageMap from "../../images/map/map.png"

// Cập nhật dữ liệu thành phố với tọa độ chính xác
const cityDataLocationMobile = {
  "VN-02": { name: "Lào Cai", index: "LC", coordinates: [21.05, 109.05] },
  "VN-04": { name: "Cao Bằng", index: "CB", coordinates: [22.03, 119.85] },
  "VN-54": { name: "SaPa", index: "SP", coordinates: [21.35, 109.71] },
  "VN-HN": { name: "Hà Nội", index: "HN", coordinates: [22.53, 119.00] },
  "VN-51": { name: "Vinh", index: "V", coordinates: [23.05, 116.9] },
  "VN-DN": { name: "Đà Nẵng", index: "ĐN", coordinates: [23.45, 121.11] },
  "VN-25": { name: "Kon Tum", index: "KT", coordinates: [23.09, 112.94] },
  "VN-35": {name: "Lâm Đồng", index: "LD", coordinates: [22.92, 119.52] },
  "VN-57": { name: "Bình Dương", index: "BD", coordinates: [24.16, 108.07] },
  "VN-72": {name: "Đăk Nông", index: "DK", coordinates: [25.01, 111.27] },
  "VN-39": {name: "Đồng Nai", index: "ĐNa", coordinates: [24.12, 110.02] },
  "VN-SG": { name: "Hồ Chí Minh", index: "HCM", coordinates: [25.45, 117.92] },
}

const cityDataLocationLaptop = {
  "VN-02": { name: "Lào Cai", index: "LC", coordinates: [20.05, 110.85] },
  "VN-04": { name: "Cao Bằng", index: "CB", coordinates: [21.23, 128.85] },
  "VN-54": { name: "SaPa", index: "SP", coordinates: [19.65, 111.51] },
  "VN-HN": { name: "Hà Nội", index: "HN", coordinates: [21.52, 127.90] },
  "VN-51": { name: "Vinh", index: "V", coordinates: [22.25, 123.9] },
  "VN-DN": { name: "Đà Nẵng", index: "ĐN", coordinates: [22.75, 131.52] },
  "VN-25": { name: "Kon Tum", index: "KT", coordinates: [22.20, 116.54] },
  "VN-35": {name: "Lâm Đồng", index: "LD", coordinates: [21.40, 128.67] },
  "VN-57": { name: "Bình Dương", index: "BD", coordinates: [22.95, 108.77] },
  "VN-72": {name: "Đăk Nông", index: "DK", coordinates: [25.15, 113.87] },
  "VN-39": {name: "Đồng Nai", index: "ĐNa", coordinates: [22.85, 111.62] },
  "VN-SG": { name: "TP. Hồ Chí Minh", index: "HCM", coordinates: [24.55, 125.70] },
};

const colors = ["#e1e245", "#00bb5f", "#9dce31", "#00c66e"]; // Define the colors

function VNmap() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 479; // Check if the current device is mobile

  const cityDataLocation = isMobile ? cityDataLocationMobile : cityDataLocationLaptop; // Use the appropriate city data based on the device
  // const cityDataLocation = cityDataLocationLaptop; // Use the appropriate city data based on the device


  const MoveChoosePerson = (nameCity) => {
    navigate('/mux/choose-person', { state: { nameCity: nameCity } });
  };
  return (
    <div className="vnmap-container">
      <Button variant="contained" 
            color="primary" 
            className="button-map mui-button"
            disabled>
        Chọn tỉnh thành
      </Button>
      <div className="vietnam-map-container">
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
          
          {Object.values(cityDataLocation).map((city, index) => (
            <Popup
              key={city.name}
              position={city.coordinates}
              closeButton={false}
              closeOnClick={false}
              autoClose={false}
            >
              {/* style={{ opacity: 0 }} */}
              <div className="tooltip" style={{ opacity: 0 }} onClick={() => MoveChoosePerson(city.name)}> 
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