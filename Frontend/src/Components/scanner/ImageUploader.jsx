import React, { useState } from 'react';

const ImageUploader = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelect(imageUrl); // Pass the selected image to the parent component
    }
  };

  const openImagePicker = () => {
    document.getElementById('upload-image').click();
  };

  return (
    <div>
      <div className="gallery" onClick={openImagePicker}>
        <img className="solar-gallery-add" alt="Solar gallery add" src="scanimg/gallery.svg" />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelection}
        style={{ display: 'none' }}
        id="upload-image"
      />
    </div>
  );
};

export default ImageUploader;
