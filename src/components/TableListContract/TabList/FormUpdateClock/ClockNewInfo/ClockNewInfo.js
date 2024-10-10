import {
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

import {
  fetchApiGetAllKieuDongHoSelector,
  fetchApiGetAllLyDoThaySelector,
} from "../../../../../redux/selector";
import { GetUserQuery } from "../../../../../graphql/users/usersQuery";

function ClockNewInfo({ formItemLayoutClockNow }) {
  const kieuDongHos = useSelector(fetchApiGetAllKieuDongHoSelector);
  const lyDoThays = useSelector(fetchApiGetAllLyDoThaySelector);
  const { data: users } = useQuery(GetUserQuery);

  return (
    <div className="modal-clock-new-info">
      <Divider orientation="left">Đồng hồ mới</Divider>

      {/* Kiểu đồng hồ + Đường kính  */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="kieuDongHoMoi"
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
              placeholder="Chọn kiểu đồng hồ"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="duongKinhMoi"
            label="Đường kính"
            {...formItemLayoutClockNow}
          >
            <Input name="duongKinhMoi" placeholder="Đường kính" />
          </Form.Item>
        </Col>
      </Row>

      {/* Mã đồng hồ + Seri đồng hồ */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="keyIdOfClockMoi"
            label="Mã đồng hồ"
            {...formItemLayoutClockNow}
          >
            <Input name="keyIdOfClockMoi" placeholder="Mã đồng hồ" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="seriDongHoMoi"
            label="Serial đồng hồ"
            {...formItemLayoutClockNow}
          >
            <Input name="seriDongHoMoi" placeholder="Nhập seri đồng hồ" />
          </Form.Item>
        </Col>
      </Row>

      {/* Serial chì + Chỉ số đầu */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="seriChiMoi"
            label="Serial chì"
            {...formItemLayoutClockNow}
          >
            <Input name="seriChiMoi" placeholder="Nhập serial chì" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="chiSoDauMoi"
            label="Chỉ số đầu"
            {...formItemLayoutClockNow}
          >
            <Input name="chiSoDauMoi" placeholder="Nhập chỉ số đầu" />
          </Form.Item>
        </Col>
      </Row>

      {/* Ngày sử dụng + Ngày kiểm định */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ngaySuDungMoi"
            label="Ngày sử dụng"
            {...formItemLayoutClockNow}
          >
            <DatePicker
            locale={locale}
              name="ngaySuDungMoi"
              placeholder="Chọn ngày sử dụng"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ngayKiemDinhMoi"
            label="Ngày kiểm định"
            {...formItemLayoutClockNow}
          >
            <DatePicker
            locale={locale}
              name="ngayKiemDinhMoi"
              placeholder="Chọn ngày kiểm định"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Hiệu lực KĐ + Người thay */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="hieuLucKDMoi"
            label="Hiệu lực KĐ"
            {...formItemLayoutClockNow}
          >
            <DatePicker
            locale={locale}
              name="hieuLucKDMoi"
              placeholder="Chọn hiệu lực KĐ"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="nguoiThayIdMoi"
            label="Người thay"
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="nguoiThayIdMoi"
              options={
                users?.GetUsers?.nodes?.length <= 0
                  ? []
                  : users?.GetUsers?.nodes?.map((_nameManager) => ({
                      label: _nameManager.userName,
                      value: _nameManager.id,
                    }))
              }
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Lý do thay + Hình thức xử lý */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="lyDoThayMoi"
            label="Lý do thay"
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="lyDoThayMoi"
              placeholder="Chọn lý do thay"
              options={
                lyDoThays?.length <= 0
                  ? []
                  : lyDoThays?.map((_lydo) => ({
                      label: _lydo.value,
                      value: _lydo.id,
                    }))
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="hinhThucXuLyMoi"
            label="Hình thức xử lý"
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="hinhThucXuLyMoi"
              placeholder="Nhập hình thức xử lý"
              className="space-right-10"
              options={[
                { value: "ThongKe", label: "Thống kê" },
                { value: "LapKHMoi", label: "Lắp KH mới" },
                { value: "KHMua", label: "KH mua" },
                { value: "ThayBaoHanh", label: "Thay bảo hành" },
                { value: "CongTyCap", label: "Công ty cấp" },
                { value: "LapLaiDH", label: "Lắp lại đồng hồ" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Ghi chú + Trạng thái ĐH lắp */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="ghiChuMoi"
            label="Ghi chú: "
            {...formItemLayoutClockNow}
          >
            <Input name="ghiChuMoi" placeholder="Nhập ghi chú" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            name="trangThaiDHLapMoi"
            label="Trạng thái ĐH: "
            {...formItemLayoutClockNow}
          >
            <Select
              fieldNames="trangThaiDHLapMoi"
              options={[
                { value: "DongHoMoi", label: "Đồng hồ mới" },
                { value: "DongHoCu", label: "Đồng hồ cũ" },
              ]}
              placeholder="Chọn trạng thái ĐH lắp"
            />
          </Form.Item>
        </Col>

        {/* Hide */}
        {/* Đơn vị HC (Tỉnh) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="donViHCTinhMoi" label="Đơn vị HC (tỉnh)" hidden>
            <Input name="donViHCTinhMoi" />
          </Form.Item>
        </Col>

        {/* Đơn vị HC (Huyện) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="donViHCHuyenMoi" label="Đơn vị HC (huyện)" hidden>
            <Input name="donViHCHuyenMoi" />
          </Form.Item>
        </Col>

        {/* Đơn vị HC (xã) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="donViHCMoi" label="Đơn vị HC (xã)" hidden>
            <Input name="donViHCMoi" />
          </Form.Item>
        </Col>

        {/* Vùng -> load from api */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="vungIdMoi" label="Vùng" hidden>
            <Input name="vungIdMoi" />
          </Form.Item>
        </Col>

        {/* Khu vực -> load from api (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="khuVucMoi" label="Khu vực" hidden>
            <Input name="khuVucMoi" />
          </Form.Item>
        </Col>

        {/* Người quản lý id -> load from api */}
        {/* <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="nguoiQuanLyIdMoi"
            label="Nhân viên"
            hidden
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn nhân viên.",
              },
            ]}
          >
            <Input name="nguoiQuanLyIdMoi" />
          </Form.Item>
        </Col> */}

        {/* Đồng hồ block */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="dongHoChaIdMoi" label="ĐH block" hidden>
            <Input name="dongHoChaIdMoi" />
          </Form.Item>
        </Col>

        {/* Thứ tự + button (Thứ tự) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="soThuTuMoi" label="Thứ tự: " hidden>
            <Input
              name="soThuTuMoi"
              placeholder="Nhập thứ tự"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Chỉ số cuối */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="chiSoCuoiMoi" label="CSC" hidden>
            <Input name="chiSoCuoiMoi" />
          </Form.Item>
        </Col>

        {/* Ngày lắp đặt (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ngayLapDatOfDetailClockMoi" label="Ngày LĐ" hidden>
            <DatePicker
            locale={locale}
              name="ngayLapDatOfDetailClockMoi"
              placeholder="Nhập ngày lắp đặt"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Địa chỉ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="diachiOfDetailClockMoi"
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
              name="diachiOfDetailClockMoi"
              placeholder="Nhập địa chỉ"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Trạng thái sử dụng */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="trangThaiSuDungMoi" label="Trạng thái SD" hidden>
            <Input name="trangThaiSuDungMoi" />
          </Form.Item>
        </Col>

        {/* Nước sản xuất -> load from api */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="nuocSXMoi" label="Nước sản xuất" hidden>
            <Input name="nuocSXMoi" />
          </Form.Item>
        </Col>

        {/* Lý do hủy */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="lyDoHuyMoi" label="LDH" hidden>
            <Input name="lyDoHuyMoi" />
          </Form.Item>
        </Col>

        {/* Hãng sản xuất */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hangSXMoi" label="Hãng sản xuất" hidden>
            <Input name="hangSXMoi" />
          </Form.Item>
        </Col>

        {/* Hộp bảo vệ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hopBaoVeMoi" label="Hộp bảo vệ" hidden>
            <Input name="hopBaoVeMoi" />
          </Form.Item>
        </Col>

        {/* Vị trí lắp đặt */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="viTriLapDatMoi" label="Vị trí LĐ" hidden>
            <Input
              name="viTriLapDatMoi"
              placeholder="Nhập vị trí lắp đặt"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Lý do kiểm định */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="lyDoKiemDinhMoi" label="Lý do KĐ" hidden>
            <Input name="lyDoKiemDinhMoi" />
          </Form.Item>
        </Col>

        {/* Van 1 chiều */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="vanMotChieuMoi"
            label="Van 1 chiều"
            valuePropName="checked"
            hidden
          >
            <Checkbox name="vanMotChieuMoi" />
          </Form.Item>
        </Col>

        {/* Số tem */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="soTemMoi" label="Số tem" hidden>
            <Input
              name="soTemMoi"
              placeholder="Nhập số tem"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Số phiếu thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="soPhieuThayMoi" label="Số phiếu thay" hidden>
            <Input
              name="soPhieuThayMoi"
              placeholder="Nhập số phiếu thay"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Mã ĐH thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="maDHThayMoi" label="Mã ĐH thay" hidden>
            <Input name="maDHThayMoi" placeholder="Nhập mã đồng hồ thay" />
          </Form.Item>
        </Col>

        {/* Loại khuyến mãi */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="khuyenMaiMoi" label="Loại KM" hidden>
            <Input name="khuyenMaiMoi" />
          </Form.Item>
        </Col>

        {/* Khuyến mãi + text (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="soKhuyenMaiMoi" label="Khuyến mãi" hidden>
            <Input name="soKhuyenMaiMoi" />
          </Form.Item>
        </Col>

        {/* Ống dẫn */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ongDanMoi" label="Ống dẫn" hidden>
            <Input name="ongDanMoi" placeholder="Nhập ống dẫn" />
          </Form.Item>
        </Col>

        {/* Đai khởi thủy */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="daiKhoiThuyMoi" label="Đai KT" hidden>
            <Input name="daiKhoiThuyMoi" placeholder="Nhập đai khởi thủy" />
          </Form.Item>
        </Col>

        {/* Loại đồng hồ (sau thì bỏ cái này) */}
        <Col xs={24} sm={22} md={11} lg={10}>
          <Form.Item name="loaiDongHoMoi" label="Địa chỉ" hidden>
            <Input name="loaiDongHoMoi" placeholder="nhập địa chỉ" />
          </Form.Item>
        </Col>

        {/* Loại đồng hồ (id) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="loaiDongHoIdMoi" label="Loại ĐH" hidden>
            <Select
              fieldNames="loaiDongHoIdMoi"
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
          <Form.Item name="toaDoDHNMoi" label="Tọa độ" hidden>
            <Input name="toaDoDHNMoi" placeholder="Nhập tọa độ" />
          </Form.Item>
        </Col>

        {/* Kinh độ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="kinhDoDHNMoi" label="Kinh độ" hidden>
            <Input name="kinhDoDHNMoi" placeholder="Nhập kinh độ" />
          </Form.Item>
        </Col>

        {/* Vĩ độ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="viDoDHNMoi" label="Vĩ độ" hidden>
            <Input name="viDoDHNMoi" placeholder="Nhập vĩ độ" />
          </Form.Item>
        </Col>

        {/* Loại điểm */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="loaiDiemIdMoi" label="Loại điểm" hidden>
            <Select
              fieldNames="loaiDiemIdMoi"
              options={[
                { value: 1, label: "Loại điểm 1" },
                { value: 2, label: "Loại điểm 2" },
              ]}
              placeholder="Chọn loại điểm"
            />
          </Form.Item>
        </Col>

        {/* Hide */}
      </Row>
    </div>
  );
}

export default ClockNewInfo;
