import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect } from "react";

import LocomotiveInfo from "./LocomotiveInfo/LocomotiveInfo";
import ClockCurrentInfo from "./ClockCurrentInfo/ClockCurrentInfo";
import ClockNewInfo from "./ClockNewInfo/ClockNewInfo";
import {
  fetchApiGetClockIdFromContractIdSelector,
  fetchApiGetWaterClockSelector,
} from "../../../../redux/selector";
import {
  fetchApiChangeClockNew,
  fetchApiGetClockIdFromContractId,
} from "../../../../redux/slices/waterClockSlice/waterClockSlice";
import { getAllDMTotalByType } from "../../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { fetchApiAllReading } from "../../../../redux/slices/readingSlice/readingSlice";

function FormUpdateClock({ tabList, hideModal }) {
  const [formMain] = Form.useForm();

  const dispatch = useDispatch();

  const waterClocks = useSelector(fetchApiGetWaterClockSelector);
  const primaryClockId = useSelector(fetchApiGetClockIdFromContractIdSelector);

  // console.log("waterClocks update clock ->", waterClocks);
  // console.log("primaryClockId", primaryClockId);

  // form Thông tin đầu máy
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 4 },
      lg: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // form Đồng hồ hiện tại
  const formItemLayoutClockNow = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 4 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  // get maDongHo
  useEffect(() => {
    waterClocks?.length > 0 &&
      dispatch(fetchApiGetClockIdFromContractId(waterClocks[0].hopDongId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterClocks]);

  // set field mã đồng hồ mới
  useEffect(() => {
    if (waterClocks?.length === 1 && !waterClocks[0]?.keyId?.includes("_")) {
      formMain.setFieldsValue({
        keyIdOfClockMoi: `${waterClocks[0]?.keyId}_1`,
      });
    } else {
      formMain.setFieldsValue({
        keyIdOfClockMoi: primaryClockId ? primaryClockId : "",
      });
    }
  }, [formMain, primaryClockId, waterClocks]);

  // handle get all (kiểu đồng hồ)
  useEffect(() => {
    dispatch(getAllDMTotalByType(7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle get all (lý do thay)
  useEffect(() => {
    dispatch(getAllDMTotalByType(4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle get all (tuyến đọc)
  useEffect(() => {
    dispatch(fetchApiAllReading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle submit form (change clock)
  const handleSubmitChangeClock = (values) => {
    if (values) {
      dispatch(fetchApiChangeClockNew(values));
      formMain.resetFields();
      hideModal();
    }
  };

  // handle submit error (history use water)
  const handleSubmitChangeClockFailed = (error) => {
    console.log({ error });
  };

  return (
    <div className="wrapper-form-update-clock">
      {/* Tabs options */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h3>Thay đồng hồ mới</h3>

          {/* Form (Thay đồng hồ mới) */}
          <Form
            form={formMain}
            onFinish={handleSubmitChangeClock}
            onFinishFailed={handleSubmitChangeClockFailed}
            fields={[
              // locomotive info (Thông tin đầu máy)
              {
                name: "keyIdOfCustomer",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.khachHang?.keyId
                    : "",
              },
              {
                name: "tenKhachHang",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.khachHang?.tenKhachHang
                    : "",
              },
              {
                name: "diaChi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.khachHang?.diaChi
                    : "",
              },
              {
                name: "tuyenDocId",
                value:
                  waterClocks?.length > 0 ? waterClocks[0]?.tuyenDocId : "",
              },
              {
                name: "soThuTu",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soThuTu
                    : "",
              },
              // Clock current (Đồng hồ hiện tại)
              {
                name: "kieuDongHo",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.kieuDongHo
                    : "",
              },
              {
                name: "duongKinh",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.duongKinh
                    : "",
              },
              {
                name: "keyIdOfClock",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.keyId
                    : "",
              },
              {
                name: "seriChi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.seriChi
                    : "",
              },
              {
                name: "seriDongHo",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.seriDongHo
                    : "",
              },
              {
                name: "chiSoDau",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.chiSoDau
                    : "",
              },
              {
                name: "ngayLapDat",
                value:
                  waterClocks?.length > 0
                    ? dayjs(waterClocks[0]?.hopDong?.ngayLapDat)
                    : "",
              },
              // hide
              {
                name: "donViHC",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.donViHC
                    : "",
              },
              {
                name: "nguoiQuanLyId",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.nguoiQuanLyId
                    : "",
              },
              {
                name: "dongHoChaId",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.dongHoChaId
                    : "",
              },
              {
                name: "soThuTu",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soThuTu
                    : "",
              },
              {
                name: "ngayLapDatOfDetailClock",
                value:
                  waterClocks?.length > 0
                    ? dayjs(waterClocks[0]?.hopDong?.ngayLapDat)
                    : "",
              },
              {
                name: "ngaySuDung",
                value:
                  waterClocks?.length > 0
                    ? dayjs(waterClocks[0]?.hopDong?.dongHoNuocs[0]?.ngaySuDung)
                    : "",
              },
              {
                name: "diachiOfDetailClock",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.diaChi
                    : "",
              },
              {
                name: "trangThaiSuDung",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.trangThaiSuDung
                    : "",
              },
              {
                name: "nuocSX",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.nuocSX
                    : "",
              },
              {
                name: "hangSX",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hangSX
                    : "",
              },
              {
                name: "hopBaoVe",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hopBaoVe
                    : "",
              },
              {
                name: "viTriLapDat",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.viTriLapDat
                    : "",
              },
              {
                name: "ngayKiemDinh",
                value:
                  waterClocks?.length > 0
                    ? dayjs(
                        waterClocks[0]?.hopDong?.dongHoNuocs[0]?.ngayKiemDinh
                      )
                    : "",
              },
              {
                name: "hieuLucKD",
                value:
                  waterClocks?.length > 0
                    ? dayjs(waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hieuLucKD)
                    : "",
              },
              {
                name: "lyDoKiemDinh",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.lyDoKiemDinh
                    : "",
              },
              {
                name: "vanMotChieu",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.vanMotChieu
                    : "",
              },
              {
                name: "soTem",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soTem
                    : "",
              },
              {
                name: "soPhieuThay",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soPhieuThay
                    : "",
              },
              {
                name: "hinhThucXuLy",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hinhThucXuLy
                    : "",
              },
              {
                name: "lyDoThay",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.lyDoThay
                    : "",
              },
              {
                name: "maDHThay",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.maDHThay
                    : "",
              },
              {
                name: "nguoiThayId",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.nguoiThayId
                    : "",
              },
              {
                name: "khuyenMai",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.khuyenMai
                    : "",
              },
              {
                name: "trangThaiDHLap",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.trangThaiDHLap
                    : "",
              },
              {
                name: "soKhuyenMai",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soKhuyenMai
                    : "",
              },
              {
                name: "ongDan",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.ongDan
                    : "",
              },
              {
                name: "daiKhoiThuy",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.daiKhoiThuy
                    : "",
              },
              {
                name: "loaiDongHo",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDongHo
                    : "",
              },
              {
                name: "loaiDongHoId",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDongHoId
                    : 3,
              },
              {
                name: "toaDoDHN",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.toaDo
                    : "",
              },
              {
                name: "kinhDoDHN",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.kinhDo
                    : "",
              },
              {
                name: "viDoDHN",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.viDo
                    : "",
              },
              {
                name: "loaiDiemId",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDiemId
                    : 1,
              },
              {
                name: "hopDongId",
                value: waterClocks?.length > 0 ? waterClocks[0]?.hopDongId : "",
              },
              // hide
              // clock new info (Đồng hồ mới)
              // {
              //   name: "keyIdOfClockMoi",
              //   value: primaryClockId ? primaryClockId : "",
              // },
              {
                name: "donViHCMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.donViHC
                    : "",
              },
              {
                name: "nguoiQuanLyIdMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.nguoiQuanLyId
                    : "",
              },
              {
                name: "dongHoChaIdMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.dongHoChaId
                    : "",
              },
              {
                name: "soThuTuMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soThuTu
                    : "",
              },
              {
                name: "chiSoCuoiMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.chiSoCuoi
                    : "",
              },
              {
                name: "ngayLapDatOfDetailClockMoi",
                value:
                  waterClocks?.length > 0
                    ? dayjs(waterClocks[0]?.hopDong?.ngayLapDat)
                    : "",
              },
              {
                name: "diachiOfDetailClockMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.diaChi
                    : "",
              },
              {
                name: "trangThaiSuDungMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.trangThaiSuDung
                    : "",
              },
              {
                name: "nuocSXMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.nuocSX
                    : "",
              },
              {
                name: "hangSXMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hangSX
                    : "",
              },
              {
                name: "lyDoHuyMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.lyDoHuy
                    : "",
              },
              {
                name: "hopBaoVeMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.hopBaoVe
                    : "",
              },
              {
                name: "viTriLapDatMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.viTriLapDat
                    : "",
              },
              {
                name: "lyDoKiemDinhMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.lyDoKiemDinh
                    : "",
              },
              {
                name: "vanMotChieuMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.vanMotChieu
                    : "",
              },
              {
                name: "soTemMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soTem
                    : "",
              },
              {
                name: "soPhieuThayMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soPhieuThay
                    : "",
              },
              {
                name: "maDHThayMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.maDHThay
                    : "",
              },
              {
                name: "khuyenMaiMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.khuyenMai
                    : "",
              },
              {
                name: "soKhuyenMaiMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.soKhuyenMai
                    : "",
              },
              {
                name: "ongDanMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.ongDan
                    : "",
              },
              {
                name: "daiKhoiThuyMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.daiKhoiThuy
                    : "",
              },
              {
                name: "loaiDongHoMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDongHo
                    : "",
              },
              {
                name: "loaiDongHoIdMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDongHoId
                    : 3,
              },
              {
                name: "toaDoDHNMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.toaDo
                    : "",
              },
              {
                name: "kinhDoDHNMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.kinhDo
                    : "",
              },
              {
                name: "viDoDHNMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.viDo
                    : "",
              },
              {
                name: "loaiDiemIdMoi",
                value:
                  waterClocks?.length > 0
                    ? waterClocks[0]?.hopDong?.dongHoNuocs[0]?.loaiDiemId
                    : 1,
              },
            ]}
            style={{ padding: "10px" }}
          >
            <Row>
              {/* render form (Thông tin đầu máy) */}
              <Col xs={24} sm={24} md={24} lg={8}>
                <LocomotiveInfo formItemLayout={formItemLayout} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                <ClockCurrentInfo
                  formItemLayoutClockNow={formItemLayoutClockNow}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                <ClockNewInfo formItemLayoutClockNow={formItemLayoutClockNow} />
              </Col>
            </Row>

            <Divider />

            {/* Button */}
            <div className="btn-func-change-clock">
              <Button
                htmlType="submit"
                className="btn-update-change-clock custom-btn-update"
              >
                <EditOutlined />
                Cập nhật
              </Button>
              <Button
                onClick={() => hideModal()}
                className="btn-close-change-clock custom-btn-close"
              >
                <CloseOutlined />
                Đóng
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default FormUpdateClock;
