import { CheckCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import CardItemDetailModalSoDoc from "./CardItemDetailModalSoDoc";
import { fetchApiGetChiSoDongHoById } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";

const { Paragraph } = Typography;

function CardItemDetailSoDoc({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickCardItem = () => {
    item && dispatch(fetchApiGetChiSoDongHoById(item.id));
    console.log("itemID: ",item.id)
    showModal();
  };
  
  return (
    <>
      <Col
        key={item?.id}
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        style={{
          cursor: "pointer",
        }}
        onClick={handleClickCardItem}
      >
        <Tooltip
          title={
            <span className="val-item-so-doc">
              * Tên - Mã KH - Địa chỉ: {item?.tenKhachHang} -{" "}
              {item?.maKhachHang}{" "}
              {(item?.diaChi !== "" || item?.diaChi !== null) && "- "}
              {item?.diaChi}
            </span>
          }
        >
          <Card>
            <Row>
              <Col span={24}>
                <Row>
                  <Paragraph
                    ellipsis={{
                      rows: 1,
                    }}
                    className="custom-paragraph"
                  >
                    <span className="val-item-so-doc">
                      * Tên: {item?.tenKhachHang} - {item?.maKhachHang}{" "}
                      {(item?.diaChi !== "" || item?.diaChi !== null) && "- "}
                      {item?.diaChi}
                    </span>
                  </Paragraph>
                </Row>
                <Row>
                  <Col span={16}>
                    CS Đầu Cũ:{" "}
                    <b className="chi-so-dh">
                      {item?.chiSoDauCu === 0 ? "..." : item?.chiSoDauCu}
                    </b>
                  </Col>
                  <Col span={8}>
                    CS Cuối Cũ:{" "}
                    <b className="chi-so-dh">
                      {item?.chiSoCuoiCu === 0 ? "..." : item?.chiSoCuoiCu}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    CS Cũ:{" "}
                    <b className="chi-so-dh">
                      {item?.chiSoCu === 0 ? "..." : item?.chiSoCu}
                    </b>
                  </Col>
                  <Col span={8}>
                    CS Mới:{" "}
                    <b className="chi-so-dh">
                      {item?.chiSoMoi === 0 ? "..." : item?.chiSoMoi}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    Tiêu thụ: <b className="tthu">{item?.tthu || "..."}</b>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <i>
                      Cập nhật ngày: {dayjs(item?.ngayDoc).format("DD/MM/YYYY")}
                    </i>
                  </Col>
                  <Col
                    span={4}
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: -20,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 25,
                      }}
                    >
                      <CheckCircleOutlined
                        style={{
                          color: `${item?.responseTrangThaiGhiModel?.maMau}`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        color: "orange",
                        fontSize: 25,
                      }}
                    >
                      <EnvironmentOutlined />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Tooltip>
      </Col>

      {/* Show modal detail */}
      {isModalOpen && (
        <CardItemDetailModalSoDoc
          item={item}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
}

export default CardItemDetailSoDoc;
