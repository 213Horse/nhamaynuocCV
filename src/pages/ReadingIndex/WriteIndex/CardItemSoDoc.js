import { Card, Col, Tooltip, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { fetchApiGetChiSoDongHoTuSoDoc } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useEffect } from "react";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import dayjs from "dayjs";

const { Paragraph } = Typography;

function CardItemSoDoc({ item, setSelector, isReadingIndex, isBlockType }) {
  const dispatch = useDispatch();

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // console.log("regions", regions);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    return `${factoryQueryString}`;
  };
  
  useEffect(() => {
    if (nhaMayId) {
      console.log("Data nha may:", nhaMayId);
    }
  }, [nhaMayId]);

  const handleGetChiSoDongHoTuSoDoc = () => {
    const soDocId = item.id;
    const Thang = dayjs(item.ngayCuoiKy).format("MM/YYYY")
    
    const value = {
      Thang,
      soDocId,
      isBlockType,
      factoryIdArr: createFilterQueryString(),
    };
    dispatch(fetchApiGetChiSoDongHoTuSoDoc(value));
    setSelector(item);
  };

  return (
    <Col
      key={item?.id}
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 8 }}
      style={{
        cursor: "pointer",
      }}
      onClick={handleGetChiSoDongHoTuSoDoc}
    >
      <Tooltip
        title={
          <>
            <div className="tooltip-card-so-doc">
              <span className="val-item-so-doc">
                <i className="lbl-item-so-doc">- Tên sổ: </i> {item?.tenSo}
              </span>
            </div>
            <div className="tooltip-card-so-doc">
              <span className="val-item-so-doc">
                <i className="lbl-item-so-doc">- Tên tuyến: </i>{" "}
                {isReadingIndex === true ? item?.tuyenDoc : item?.tenTuyenDoc}
              </span>
            </div>
            <div className="tooltip-card-so-doc">
              <span className="val-item-so-doc">
                <i className="lbl-item-so-doc">- Cán bộ đọc: </i>{" "}
                {isReadingIndex === true
                  ? item?.canBoDoc
                  : item?.tenNguoiQuanLy}
              </span>
            </div>
          </>
        }
      >
        <Card className="card-so-doc">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Tên sổ: </i>
              <span className="val-item-so-doc">{item?.tenSo}</span>
            </Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Tên tuyến: </i>
              <span className="val-item-so-doc">
                {isReadingIndex === true ? item?.tuyenDoc : item?.tenTuyenDoc}
              </span>
            </Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Cán bộ: </i>
              <span className="val-item-so-doc">
                {isReadingIndex === true
                  ? item?.canBoDoc
                  : item?.tenNguoiQuanLy}
              </span>
            </Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Trạng thái sổ: </i>
              <span className="val-item-so-doc">
                {item?.trangThai === 1 ? "Đang ghi" : "Đã ngừng"}
              </span>
            </Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Trạng thái khóa sổ: </i>
              <span
                className={`val-item-so-doc ${
                  item?.trangThaiKhoaSo === 1 ? "chua-khoa-so" : "da-khoa-so"
                }`}
              >
                {item?.trangThaiKhoaSo === 1 ? "Chưa khóa" : "Đã khóa"}
              </span>
            </Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paragraph
              ellipsis={{
                rows: 1,
              }}
              className="custom-paragraph"
            >
              <i className="lbl-item-so-doc">- Sổ chưa ghi: </i>
              <span className="val-item-so-doc">
                {item.soChiSoDongHoChuaGhi + "/" +  item.tongSoChiSoDongHo}
              </span>
            </Paragraph>
          </div>

          <p style={{ color: "blue" }}>
            * Tổng đồng hồ:{" "}
            <b className="chi-so-dh">{item?.tongSoChiSoDongHo}</b>
          </p>
       
          
        </Card>
      </Tooltip>
    </Col>
  );
}

export default CardItemSoDoc;
