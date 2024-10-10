import {
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

import {
  fetchApiGetAllKieuDongHoSelector,
  fetchApiGetAllLyDoHuySelector,
} from "../../../../../redux/selector";
import { getAllDMTotalByType } from "../../../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { useEffect } from "react";

function ClockCurrentInfo({ formItemLayoutClockNow }) {
  const dispatch = useDispatch();

  const lyDoHuys = useSelector(fetchApiGetAllLyDoHuySelector);
  const kieuDongHos = useSelector(fetchApiGetAllKieuDongHoSelector);

  // handle get all (lý do hủy)
  useEffect(() => {
    dispatch(getAllDMTotalByType(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-clock-curr-info">
      <Divider orientation="left">Đồng hồ hiện tại</Divider>

      {/* Kiểu đồng hồ + Đường kính */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="kieuDongHo"
            label="Kiểu đồng hồ"
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="kieuDongHoMoi"
              options={
                kieuDongHos?.length <= 0
                  ? []
                  : kieuDongHos?.map((_kieuDH) => ({
                      label: _kieuDH.value,
                      value: _kieuDH.id,
                    }))
              }
              disabled
              placeholder="Chọn kiểu đồng hồ"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="duongKinh"
            label="Đường kính"
            {...formItemLayoutClockNow}
          >
            <Input name="duongKinh" placeholder="Đường kính" disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* Mã đồng hồ + Seri đồng hồ */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="keyIdOfClock"
            label="Mã đồng hồ"
            {...formItemLayoutClockNow}
          >
            <Input name="keyIdOfClock" placeholder="Mã đồng hồ" disabled />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="seriDongHo"
            label="Serial đồng hồ"
            {...formItemLayoutClockNow}
          >
            <Input name="seriDongHo" placeholder="Nhập seri đồng hồ" disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* Serial chì + Chỉ số đầu */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="seriChi"
            label="Serial chì"
            {...formItemLayoutClockNow}
          >
            <Input name="seriChi" placeholder="Serial chì" disabled />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="chiSoDau"
            label="Chỉ số đầu"
            {...formItemLayoutClockNow}
          >
            <InputNumber
              name="chiSoDau"
              placeholder="Chỉ số đầu đầu kỳ"
              style={{ width: "100%" }}
              // disabled
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Chỉ số cuối + Ngày lắp đặt */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="chiSoCuoi"
            label="Chỉ số cuối"
            {...formItemLayoutClockNow}
          >
            <InputNumber
              name="chiSoCuoi"
              placeholder="Nhập chỉ số cuối hiện tại"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ngayLapDat"
            label="Ngày lắp đặt"
            {...formItemLayoutClockNow}
          >
            <DatePicker
            locale={locale}
              name="ngayLapDat"
              placeholder="Ngày lắp đặt"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Lý do hủy + Ngày bắt đầu */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="lyDoHuy"
            label="Lý do hủy"
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="lyDoHuy"
              options={
                lyDoHuys?.length <= 0
                  ? []
                  : lyDoHuys?.map((_lydo) => ({
                      label: _lydo.value,
                      value: _lydo.id,
                    }))
              }
              placeholder="Chọn lý do hủy"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ngayBatDau"
            label="Ngày bắt đầu: "
            {...formItemLayoutClockNow}
          >
            <DatePicker
            locale={locale}
              name="ngayBatDau"
              placeholder="Chọn ngày bắt đầu"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      {/*  + Ngày kết thúc */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ngayKetThuc"
            label="Ngày kết thúc: "
            {...formItemLayoutClockNow}
          >
            <DatePicker
              name="ngayKetThuc"
              locale={locale}
              placeholder="Chọn ngày kết thúc"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Hide */}
      {/* Đơn vị HC (Tỉnh) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="donViHCTinh" label="Đơn vị HC (tỉnh)" hidden>
          <Input name="donViHCTinh" />
        </Form.Item>
      </Col>

      {/* Đơn vị HC (Huyện) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="donViHCHuyen" label="Đơn vị HC (huyện)" hidden>
          <Input name="donViHCHuyen" />
        </Form.Item>
      </Col>

      {/* Đơn vị HC (xã) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="donViHC" label="Đơn vị HC (xã)" hidden>
          <Input name="donViHC" />
        </Form.Item>
      </Col>

      {/* Vùng -> load from api */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="vungId" label="Vùng" hidden>
          <Input name="vungId" />
        </Form.Item>
      </Col>

      {/* Khu vực -> load from api (*No get) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="khuVuc" label="Khu vực" hidden>
          <Input name="khuVuc" />
        </Form.Item>
      </Col>

      {/* Người quản lý id -> load from api */}
      {/* <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item
          name="nguoiQuanLyId"
          label="Nhân viên"
          hidden
          rules={[
            {
              required: true,
              message: "Bạn cần phải chọn nhân viên.",
            },
          ]}
        >
          <Input name="nguoiQuanLyId" />
        </Form.Item>
      </Col> */}

      {/* Đồng hồ block */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="dongHoChaId" label="ĐH block" hidden>
          <Input name="dongHoChaId" />
        </Form.Item>
      </Col>

      {/* Thứ tự + button (Thứ tự) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="soThuTu" label="Thứ tự: " hidden>
          <Input
            name="soThuTu"
            placeholder="Nhập thứ tự"
            className="space-right-10"
          />
        </Form.Item>
      </Col>

      {/* Ngày lắp đặt (*No get) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="ngayLapDatOfDetailClock" label="Ngày LĐ" hidden>
          <DatePicker
          locale={locale}
            name="ngayLapDatOfDetailClock"
            placeholder="Nhập ngày lắp đặt"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Col>

      {/* Ngày sử dụng */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="ngaySuDung" label="Ngày sử dụng" hidden>
          <DatePicker
          locale={locale}
            name="ngaySuDung"
            placeholder="Chọn ngày sử dụng"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Col>

      {/* Địa chỉ */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item
          name="diachiOfDetailClock"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Bạn cần phải nhập địa chỉ.",
            },
          ]}
          hidden
        >
          <Input
            name="diachiOfDetailClock"
            placeholder="Nhập địa chỉ"
            className="space-right-10"
          />
        </Form.Item>
      </Col>

      {/* Trạng thái sử dụng */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="trangThaiSuDung" label="Trạng thái SD" hidden>
          <Input name="trangThaiSuDung" />
        </Form.Item>
      </Col>

      {/* Nước sản xuất -> load from api */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="nuocSX" label="Nước sản xuất" hidden>
          <Input name="nuocSX" />
        </Form.Item>
      </Col>

      {/* Hãng sản xuất */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="hangSX" label="Hãng sản xuất" hidden>
          <Input name="hangSX" />
        </Form.Item>
      </Col>

      {/* Hộp bảo vệ */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="hopBaoVe" label="Hộp bảo vệ" hidden>
          <Input name="hopBaoVe" />
        </Form.Item>
      </Col>

      {/* Vị trí lắp đặt */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="viTriLapDat" label="Vị trí LĐ" hidden>
          <Input
            name="viTriLapDat"
            placeholder="Nhập vị trí lắp đặt"
            className="space-right-10"
          />
        </Form.Item>
      </Col>

      {/* Ngày kiểm định */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="ngayKiemDinh" label="Ngày KĐ" hidden>
          <DatePicker
          locale={locale}
            name="ngayKiemDinh"
            placeholder="Chọn ngày có kiểm định"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Col>

      {/* Hiệu lực kiểm định */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="hieuLucKD" label="Hiệu lực KĐ" hidden>
          <DatePicker
          locale={locale}
            name="hieuLucKD"
            placeholder="Chọn hiệu lực kiểm định"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Col>

      {/* Lý do kiểm định */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="lyDoKiemDinh" label="Lý do KĐ" hidden>
          <Input name="lyDoKiemDinh" />
        </Form.Item>
      </Col>

      {/* Van 1 chiều */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item
          name="vanMotChieu"
          label="Van 1 chiều"
          valuePropName="checked"
          hidden
        >
          <Checkbox name="vanMotChieu" />
        </Form.Item>
      </Col>

      {/* Số tem */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="soTem" label="Số tem" hidden>
          <Input
            name="soTem"
            placeholder="Nhập số tem"
            className="space-right-10"
          />
        </Form.Item>
      </Col>

      {/* Số phiếu thay */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="soPhieuThay" label="Số phiếu thay" hidden>
          <Input
            name="soPhieuThay"
            placeholder="Nhập số phiếu thay"
            className="space-right-10"
          />
        </Form.Item>
      </Col>

      {/* Hình thức xử lý (*No get) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="hinhThucXuLy" label="HT xử lý" hidden>
          <Input name="hinhThucXuLy" />
        </Form.Item>
      </Col>

      {/* Lý do thay */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="lyDoThay" label="Lý do thay" hidden>
          <Input name="lyDoThay" />
        </Form.Item>
      </Col>

      {/* Mã ĐH thay */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="maDHThay" label="Mã ĐH thay" hidden>
          <Input name="maDHThay" placeholder="Nhập mã đồng hồ thay" />
        </Form.Item>
      </Col>

      {/* Người thay */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="nguoiThayId" label="Người thay" hidden>
          <Input name="nguoiThayId" />
        </Form.Item>
      </Col>

      {/* Loại khuyến mãi */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="khuyenMai" label="Loại KM" hidden>
          <Input name="khuyenMai" />
        </Form.Item>
      </Col>

      {/* Trạng thái đồng hồ lắp */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="trangThaiDHLap" label="Trạng thái ĐH lắp" hidden>
          <Input name="trangThaiDHLap" />
        </Form.Item>
      </Col>

      {/* Khuyến mãi + text (*No get) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="soKhuyenMai" label="Khuyến mãi" hidden>
          <Input name="soKhuyenMai" />
        </Form.Item>
      </Col>

      {/* Ống dẫn */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="ongDan" label="Ống dẫn" hidden>
          <Input name="ongDan" placeholder="Nhập ống dẫn" />
        </Form.Item>
      </Col>

      {/* Đai khởi thủy */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="daiKhoiThuy" label="Đai KT" hidden>
          <Input name="daiKhoiThuy" placeholder="Nhập đai khởi thủy" />
        </Form.Item>
      </Col>

      {/* Loại đồng hồ (sau thì bỏ cái này) */}
      <Col xs={24} sm={22} md={11} lg={10}>
        <Form.Item name="loaiDongHo" hidden>
          <Input name="loaiDongHo" />
        </Form.Item>
      </Col>

      {/* Loại đồng hồ (id) */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="loaiDongHoId" label="Loại ĐH" hidden>
          <Select
            fieldNames="loaiDongHoId"
            options={[
              { value: 1, label: "Đồng hồ tổng" },
              { value: 2, label: "Đồng hồ block" },
              { value: 3, label: "Đồng hồ hộ dân" },
            ]}
            placeholder="Chọn loại đồng hồ"
          />
        </Form.Item>
      </Col>

      {/* Tọa độ */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="toaDoDHN" label="Tọa độ" hidden>
          <Input name="toaDoDHN" placeholder="Nhập tọa độ" />
        </Form.Item>
      </Col>

      {/* Kinh độ */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="kinhDoDHN" label="Kinh độ" hidden>
          <Input name="kinhDoDHN" placeholder="Nhập kinh độ" />
        </Form.Item>
      </Col>

      {/* Vĩ độ */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="viDoDHN" label="Vĩ độ" hidden>
          <Input name="viDoDHN" placeholder="Nhập vĩ độ" />
        </Form.Item>
      </Col>

      {/* Loại điểm */}
      <Col xs={24} sm={22} md={11} lg={12}>
        <Form.Item name="loaiDiemId" label="Loại điểm" hidden>
          <Select
            fieldNames="loaiDiemId"
            options={[
              { value: 1, label: "Loại điểm 1" },
              { value: 2, label: "Loại điểm 2" },
            ]}
            placeholder="Chọn loại điểm"
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={11} lg={12}>
        <Form.Item name="hopDongId" hidden>
          <Input name="hopDongId" />
        </Form.Item>
      </Col>
      {/* Hide */}
    </div>
  );
}

export default ClockCurrentInfo;
