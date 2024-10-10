import { Button, Form } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import readingIndexSlice from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ReloadOutlined } from "@ant-design/icons";

const CameraComponent = ({ chiSoDongHo }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("user"); // Ban đầu là camera trước
  const [rotationAngle, setRotationAngle] = useState(0);
  const image = `https://api-awa-v2.amazingtech.vn${chiSoDongHo.imageUrl}`;
  const dispatch = useDispatch();

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
    dispatch(readingIndexSlice.actions.setImageGhiChiSo(null)); //reset image save in redux
    // setShowCamera(true);
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    console.log("selectedImage", selectedImage);
    const reader = new FileReader();
    reader.onload = function (e) {
      setCapturedImage(e.target.result);
      setShowCamera(false);
    };
    reader.readAsDataURL(selectedImage);

    // get image
    dispatch(readingIndexSlice.actions.setImageGhiChiSo(selectedImage));
  };

  const frame = {
    width: "100%",
  };

  console.log("capturedImage", chiSoDongHo);
  const handleRotate = () => {
    // Góc xoay tăng thêm 90 độ mỗi lần nút được nhấn
    setRotationAngle((angle) => angle + 90);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "2rem 0",
      }}
    >
      <Button
        onClick={toggleCamera}
        style={{
          backgroundColor: showCamera ? "red" : "green",
          color: "white",
        }}
      >
        {showCamera ? "Tắt Camera" : "Chụp ảnh"}
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
          <Button onClick={capture} style={frame}>
            Chụp ảnh
          </Button>
          <br />
          <br />
          <Button
            onClick={() =>
              setCameraFacing(cameraFacing === "user" ? "environment" : "user")
            }
            style={frame}
          >
            {cameraFacing === "user"
              ? "Chuyển sang Camera Sau"
              : "Chuyển sang Camera Trước"}
          </Button>
          <br />
          <br />
        </div>
      )}

      {capturedImage ? (
        <div style={frame}>
          <TransformWrapper>
            <TransformComponent>
              <img
                src={capturedImage}
                alt=""
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  width: "100%",
                  height: "auto",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
          <Button
            onClick={handleRotate}
            icon={<ReloadOutlined style={{ color: "gold" }} />}
          >
            Xoay ảnh
          </Button>
          <Button onClick={discardImage}>Xoá ảnh</Button>
        </div>
      ) : chiSoDongHo?.imageUrl ? (
        <>
          <TransformWrapper>
            <TransformComponent>
              <img
                src={image}
                alt=""
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  width: "100%",
                  height: "auto",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
          <Button
          style={{width:"50%"}}
            onClick={handleRotate}
            icon={<ReloadOutlined style={{ color: "gold" }} />}
          >
            Xoay ảnh
          </Button>
        </>
      ) : null}

      <Form.Item
        name="image"
        rules={[{ required: true, message: "Hãy chọn ảnh" }]}
      >
        <Button>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Form.Item>
    </div>
  );
};

export default CameraComponent;
