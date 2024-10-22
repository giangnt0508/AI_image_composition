import React, { useEffect, useState } from 'react'; // Thêm useEffect và useState
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';
import './FileView.css';

function FileView() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState({}); // Khởi tạo state để lưu trữ folder
  const [selectedFolder, setSelectedFolder] = useState(null); // Khởi tạo state để lưu trữ folder đã chọn

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-file`);
      const data = await response.json();
      setFolders(data); // Lưu trữ dữ liệu vào state
    };
    fetchData();
  }, []); // Gọi API khi component được mount

  const handleBack = () => {
    requestFullscreen();
    setSelectedFolder(null); // Đặt lại folder đã chọn
    // navigate('/');
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder); // Cập nhật folder đã chọn
  };

  const handleImageClick = (src) => {
    window.open(src, '_blank'); // Mở nguồn ảnh trên tab mới
  };

  return (
    <div className="choose-background">
      {!selectedFolder ? ( // Kiểm tra nếu không có folder nào được chọn
        <div className="folder-list">
          {Object.keys(folders).map((folder) => (
            <Button 
            variant="contained" 
            color="primary" 
            className="mui-button"
            onClick={() => handleFolderClick(folder)}
            key={folder}
            >
              {folder}
            </Button>
          ))}
        </div>
      ) : (
        <div className="image-container">
          <h2 className="folder-title">{selectedFolder}</h2>
          <div className="image-grid">
            {folders[selectedFolder].map((img, index) => (
              <div key={index} className="image-grid-item">
                <img src={`${process.env.REACT_APP_API_URL}/static/${img}`} alt={img} onClick={() => handleImageClick(`${process.env.REACT_APP_API_URL}/static/${img}`)} />
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedFolder && (
        <Button 
          variant="contained" 
          color="secondary" 
          className="mui-button"
          onClick={handleBack}
        >
          TRỞ LẠI
        </Button>
      )}
    </div>
  );
}

export default FileView;