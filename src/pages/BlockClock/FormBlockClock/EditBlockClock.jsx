import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  theme,
} from "antd";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
// import viVN from "antd/es/date-picker/locale/vi_VN";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiGetAllClockWater,
  fetchDropdownListThemDongHoBlock,
} from "../../../redux/slices/waterClockSlice/waterClockSlice";
import {
  fetchEditlock,
  getAllBlockClock,
} from "../../../redux/slices/blockSlice/blockSlice";
import Captcha from "../../../components/Captcha/Captcha";
import {
  btnClickGetFactoryIdSelector,
  fetchApiGetAllLyDoThaySelector,
  getDataForDropDownDongHoBlock,
} from "../../../redux/selector";

import { btnClickTabListReading } from "../../../redux/slices/tabListReading/tabListReaingSlice";

moment.locale("vi");
const EditBlockClock = ({ hideModal, setEditBlock }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const dataForMenu = useSelector(getDataForDropDownDongHoBlock);

  const reasons = useSelector(fetchApiGetAllLyDoThaySelector);

  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );

  console.log("rowselected", rowSelected);
  //get array nhaMayId
  const createFilterQueryString2 = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    dispatch(fetchDropdownListThemDongHoBlock(createFilterQueryString2()));
  }, [factoryId]);
  const handleSubmit = async (values) => {
    // values.trangThaiSuDung = Number(values.trangThaiSuDung)
    const data = {
      ...values,
      prevKeyId: rowSelected.keyId,
      ngaySuDung: dayjs(values.ngaySuDung).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      ngayKiemDinh: dayjs(values.ngayKiemDinh).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      hieuLucKD: dayjs(values.hieuLucKD).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      ngayKetThuc: dayjs(values.ngayKetThuc).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    };
    if (data) {
      await dispatch(fetchEditlock(data));
    }
    hideModal();
    dispatch(getAllBlockClock(factoryId));
    dispatch(btnClickTabListReading(null));
    form.resetFields();
  };
  const handleFailed = (error) => {
    console.log({ error });
  };
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState(false);

  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  useEffect(() => {
    dispatch(fetchApiGetAllClockWater());
  }, []);

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  const { token } = theme.useToken();

  const [form1] = Form.useForm();
  const layout = {
    labelCol: {
      span: 9,
    },
  };

  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            // span={isTabletOrMobile ? 24 : 11}
            // className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              label="Mã block"
              name="keyId"
              rules={[{ required: true, message: "Hãy nhập vào mã block!" }]}
              initialValue={rowSelected?.keyId}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            // span={isTabletOrMobile ? 24 : 11}
            // className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              name="tenDongHo"
            
              initialValue={rowSelected?.tenDongHo}
              label="Tên Block"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="lyDoThay"
              initialValue={rowSelected?.lyDoThay}
              label="Lý do thay"
            >
              <Select
                style={{ width: "100%" }}
                options={reasons?.map((item) => ({
                  label: item?.description,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={{ span: 24, flex: "auto" }}>
            <Form.Item
              name="diaChi"

              initialValue={rowSelected?.diaChi}
              label="Địa chỉ"
              labelCol={isTabletOrMobile ? { span: 9 } : { span: 3 }}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="seriDongHo"

              initialValue={rowSelected?.seriDongHo}
              label="Seri"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              hidden
              name="SoHieu"
              rules={[{ required: true, message: "Hãy nhập vào số hiệu!" }]}
              initialValue={rowSelected?.soHieu}
              label="Số hiệu"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="viTriLapDat"
              label="Vị trí lắp đặt"
              initialValue={rowSelected?.viTriLapDat}

            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="trangThaiSuDung"
              label="Trạng thái"
              initialValue={rowSelected?.ttsd}
            >
              <Select
                placeholder="Chọn trạng thái"
                options={dataForMenu?.trangThai?.map((item) => ({
                  label: item.value === "DangSuDung" ? "Đang Sử Dụng" : item.value === "NgungSuDung" ? "Ngưng Sử Dụng" : "Hủy Sử Dụng",
                  value: Number(item.id),
                }))}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="nguoiQuanLyId"
              label="Nhân viên"
              initialValue={rowSelected?.nql}
            >
              <Select
                style={{ width: "100%" }}
                fieldNames="nguoiQuanLyId"
                options={dataForMenu?.nhanVien?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                placeholder="Chọn nhân viên"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="hangSXId"
              label="Hãng SX"
              initialValue={rowSelected?.hangSXId}
            >
              <Select
                style={{ width: "100%" }}
                options={dataForMenu?.nguoiLap?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="soPhieuThay"
              label="Số phiếu thay"
              initialValue={rowSelected?.soPhieuThay}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="ngaySuDung"
              label="Ngày BĐ "
              initialValue={
                rowSelected?.ngaySuDung !== null
                  ? dayjs(rowSelected?.ngaySuDung, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                name="ngaySuDung"
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="ngayKetThuc"
              label="Ngày kết thúc"
              initialValue={
                rowSelected?.ngayKetThuc !== null
                  ? dayjs(rowSelected?.ngayKetThuc, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                name="ngayKetThuc"
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="chiSoDau"
              label="Chỉ số đầu"
              initialValue={rowSelected?.chiSoDau}
            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="ngayKiemDinh"
              label="Ngày kiểm định"
              initialValue={
                rowSelected?.ngayKiemDinh !== null
                  ? dayjs(rowSelected?.ngayKiemDinh, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                name="ngayKiemDinh"
                locale={locale}
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="hieuLucKD"
              label="Hiệu lực KĐ"
              initialValue={
                rowSelected?.hieuLucKD !== null
                  ? dayjs(rowSelected?.hieuLucKD, "DD/MM/YYYY")
                  : null
              }
            >
              <DatePicker
                name="hieuLucKD"
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="chiSoCuoi"
              label="Chỉ số cuối"
              initialValue={rowSelected?.chiSoCuoi}

            >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="kinhDo"
              label="Kinh độ"
              initialValue={rowSelected?.kinhDo}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="viDo"
              label="Vĩ độ"
              initialValue={rowSelected?.viDo}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            style={{ width: "100%", display: "none" }}
          >
            <Form.Item
              name="tuyenDocId"
              initialValue={rowSelected?.tuyenDocId}
              label="Mã vạch"
            >
              <Input style={{ width: "100%", display: "none" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item style={{ width: "fit-content", margin: "22px auto" }}>
              <Captcha
                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                ref={captchaRef}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            key="submit"
            loading={loadings}
            disabled={!isCaptcha}
            htmlType="submit"
            className="custom-btn-watch-report-d"
            icon={<PlusCircleOutlined />}
            style={{
              marginLeft: "10px",
            }}
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            Cập nhật
          </Button>
          <Button
            icon={<CloseOutlined />}
            style={{
              marginLeft: "10px",
            }}
            className="custom-btn-close-d"
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default EditBlockClock;
