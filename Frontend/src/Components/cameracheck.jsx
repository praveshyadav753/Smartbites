// src/components/VideoDeviceList.jsx

import React, { useEffect, useState } from 'react';

const VideoDeviceList = () => {
    const [videoDevices, setVideoDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const fetchVideoDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setVideoDevices(videoDevices);
                if (videoDevices.length > 0) {
                    setSelectedDeviceId(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        fetchVideoDevices();
    }, []);

    useEffect(() => {
        const startStream = async () => {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: environment } },
                });
                if (stream) {
                    stream.getTracks().forEach(track => track.stop()); // Stop previous stream
                }
                setStream(newStream);
            } catch (error) {
                if (error.name === "NotAllowedError") {
                    alert("Please allow camera access in your browser settings.");
                } else if (error.name === "NotFoundError") {
                    alert("No video devices found. Please connect a camera.");
                } else {
                    alert(`Error accessing camera: ${error.message}`);
                }
            }
        };
    
        startStream();
    }, [selectedDeviceId]);
    

    return (
        <div>
            <select
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
            >
                {videoDevices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId}`}
                    </option>
                ))}
            </select>

            <div>
                {stream && <video autoPlay playsInline ref={(video) => { if (video) video.srcObject = stream; }} />}
            </div>
        </div>
    );
};

export default VideoDeviceList;
