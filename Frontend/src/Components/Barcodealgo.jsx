import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onScan, isFlashOn, selectedImage }) => {
  const cameraRef = useRef(null);
  const beepSound = useRef(new Audio('./audio/beep.mp3')); // Add your beep sound file path
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!selectedImage) {
      const constraints = {
        facingMode: 'environment',
        zoom: 1,
        width: { ideal: window.screen.width * 0.8 },
        height: { min: 480 },
      };

      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: cameraRef.current,
            constraints,
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Quagga init failed: ', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        const code = result.codeResult.code;
        onScan(code);
        beepSound.current.play();
        setIsScanning(false); // Stop scanning after a successful scan
      });

      // Function to handle visibility change
      const handleVisibilityChange = () => {
        if (document.hidden) {
          Quagga.stop(); // Stop the camera when the tab is not visible
        } else {
          Quagga.start(); // Restart the camera when the tab is visible
        }
      };

      // Attach the visibility change event listener
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup function to stop Quagga and remove event listener
      return () => {
        Quagga.stop();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        Quagga.decodeSingle(
          {
            src: image.src,
            numOfWorkers: 0,
            decoder: {
              readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
            },
            locate: true,
          },
          (result) => {
            if (result && result.codeResult) {
              onScan(result.codeResult.code);
              beepSound.current.play();
            } else {
              alert('No barcode detected in the uploaded image.');
            }
          }
        );
      };
    }
  }, [selectedImage]);

  const handleScanClick = () => {
    setIsScanning(!isScanning);
    if (isScanning) {
      Quagga.start();
    } else {
      Quagga.stop();
    }
  };

  return (
    <div className="vedio-lve">
      {!selectedImage ? (
        <div ref={cameraRef} style={{ width: '100%', height: '100%' }} />
      ) : (
        <img src={selectedImage} alt="Uploaded from gallery" style={{ width: '100%', height: 'auto' }} />
      )}
    </div>
  );
};

export default BarcodeScanner;
