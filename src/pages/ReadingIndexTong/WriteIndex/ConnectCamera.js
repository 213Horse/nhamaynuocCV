import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraFacing, setCameraFacing] = useState("user"); // Ban đầu là camera trước


    const toggleCamera = () => {
        setShowCamera(!showCamera);
        // setCapturedImage(null);
        setTimeout(() => {
            setShowCamera(false);
        }, 45000);
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        // setShowCamera(false);
    };

    const discardImage = () => {
        setCapturedImage(null);
        // setShowCamera(true);
    };

    const handleFileChange = event => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setCapturedImage(e.target.result);
            setShowCamera(false);
        };
        reader.readAsDataURL(selectedImage);
    };


    const frame = {
        width: '100%',
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: '2rem 0',
        }}>
            <Button onClick={toggleCamera} style={{
                backgroundColor: showCamera ? 'red' : 'green',
                color: 'white',

            }}>
                {showCamera ? 'Tắt Camera' : 'Chụp ảnh'}
            </Button>

            {showCamera && (
                <div style={frame}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={frame}
                        videoConstraints={{ facingMode: cameraFacing }}
                    />
                    <Button onClick={capture} style={frame}>Chụp ảnh</Button>
                    <br /><br />
                    <Button onClick={() => setCameraFacing(cameraFacing === "user" ? "environment" : "user")} style={frame}>
                        {cameraFacing === "user" ? 'Chuyển sang Camera Sau' : 'Chuyển sang Camera Trước'}
                    </Button>
                    <br /><br />
                </div>
            )}

            {capturedImage && (
                <div style={frame}>
                    <img style={frame} src={capturedImage} alt="Chụp ảnh" />
                    <Button onClick={discardImage}>Xoá ảnh</Button>
                </div>
            )}

            <div>
                <Button>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </Button>
            </div>
        </div>
    );
};

export default CameraComponent;
