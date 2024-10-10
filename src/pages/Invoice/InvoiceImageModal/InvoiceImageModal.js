import { ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const InvoiceImageModal = ({
  showImageModal,
  recordData,
  setShowImageModal,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const handleRotate = () => {
    setRotationAngle((angle) => angle + 90);
  };
  useEffect(() => {
    setDataSource([recordData]);
  }, [recordData]);
  const columns = [
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
      align: "center",
      render: () => {
        return <p>{recordData.consumption}</p>;
      },
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
      align: "center",
      render: () => {
        return <p>{recordData.oldIndex}</p>;
      },
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
      align: "center",
      render: () => {
        return <p>{recordData.newIndex}</p>;
      },
    },
  ];
  return (
    <Modal
      title="Hình ảnh"
      open={showImageModal}
      width={1300}
      onCancel={() => {
        setShowImageModal(false);
      }}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      footer={null}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          maxWidth: "700px",
          // maxHeight: "600px",
          margin: "auto",
          position: "relative",
        }}
      >
        <TransformWrapper>
          <TransformComponent>
            <img
              src={`${process.env.REACT_APP_IMAGE}${recordData?.imageUrl}`}
              alt=""
              style={{
                justifyContent: "center",
                transform: `rotate(${rotationAngle}deg)`,
                width: "100%",
                height: "auto",
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <Button
        onClick={handleRotate}
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
        }}
        icon={<ReloadOutlined style={{ color: "gold" }} />}
      >
        Xoay ảnh
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
    </Modal>
  );
};

export default InvoiceImageModal;
