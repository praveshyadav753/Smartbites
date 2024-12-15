import BarcodeScanner from "./Barcodealgo";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import "../css/CameraView.css"
import { Quagga } from "quagga";

export const CameraView = () => {
    const [barcodeResult, setBarcodeResult] = useState("");
    const [isFlashOn, setIsFlashOn] = useState(false); // Flashlight state
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const navigate = useNavigate(); // Initialize the navigate function

    //nevigate to the productinfo page if scanned

    const handleScan = (scannedCode) => {
        setBarcodeResult(scannedCode);
        navigate(`/product/${scannedCode}`);
        console.log("Scanned barcode:", scannedCode);
    };

    const toggleFlashlight = () => {
        setIsFlashOn((prev) => !prev);
    };

    const stopCamera = () => {
        console.log("Camera stopped.");
        // Quagga.stop();
    };

    const handleImageSelect = (imageUrl) => {
        stopCamera();
        setSelectedImage(imageUrl); // Set the selected image
        console.log("Selected image:", imageUrl);
    };

    const handleBackClick = () => {
        stopCamera();
        navigate(-1); // Go back to the previous route
    };

    return (
        <div className="camera-view">
            <div className="div">
                <div className="main-background">
                    <div className="center-effect-light"></div>    
                    <div className="top-nav-scan">
                        <img className="back" alt="Back" src="scanimg/Arrow 1.svg" onClick={handleBackClick}/>
                    </div> 
                    <div className="disperse-food">
                        <img className="snacks" alt="Snacks" src="scanimg/snacks.png" />
                    </div>
                    <div className="cameraframe-red">
                        {/* Conditionally render either the selected image or the camera */}
                        {selectedImage ? (
                            <img className="selected-image" src={selectedImage} alt="Selected" />
                        ) : (
                            <BarcodeScanner onScan={handleScan} isFlashOn={isFlashOn} />
                        )}
                    </div>
                    <div className="pepsi">
                        <img className="designer-removebg" alt="Designer removebg" src="scanimg/pepsi.png" />
                    </div>
                    <div className="tool">    
                        {/* Flashlight Toggle */}
                        <div className="flash-light" onClick={toggleFlashlight}>
                            <div className="ellipse-2">
                                <img className="flashimg" alt="Flashimg" src="scanimg/flashimg.svg" />
                            </div>
                        </div>

                        {/* Gallery Image Upload */}
                        <ImageUploader onImageSelect={handleImageSelect} />
                    </div>    
                    <div className="popcorn-down">
                        <img className="gemini-generated" alt="Gemini generated" src="scanimg/bottom-popcorn.png" />
                    </div>
                    <div className="buiscuit-up">
                        <img className="img" alt="biscuit" src="scanimg/biscuits.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CameraView;
