import { useState, useRef, useEffect, useCallback } from "react";
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
import { useMediaQuery } from "react-responsive";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  CloseOutlined,
  PlusCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
import viVN from "antd/es/date-picker/locale/vi_VN";
import {
  btnClickGetFactoryIdSelector,
  fetchAllReasonSelector,
  fetchApiAllAreaSelector,
  fetchApiAllRegionSelector,
  fetchApiGetAllInstallerSelector,
  fetchApiGetAllLyDoThaySelector,
  fetchApiGetAllManufacturerSelector,
  fetchApiGetAllProducingCountrySelector,
  fetchApiGetByKhuVucIdSelector,
  fetchApiGetByVungIdSelector,
} from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddBlock } from "../../../redux/slices/blockSlice/blockSlice";
import Captcha from "../../../components/Captcha/Captcha";
import { fetchApiAllRegion, fetchApiGetByKhuVucId } from "../../../redux/slices/regionSlice/regionSlice";
import { fetchApiGetByVungId } from "../../../redux/slices/areaSlice/areaSlice";
import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
moment.locale("vi");

const AddBlockClock = ({ hideModal, }) => {
  const dispatch = useDispatch();
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const areas = useSelector(fetchApiGetByVungIdSelector);
  const tuyenDocs = useSelector(fetchApiGetByKhuVucIdSelector);
  const lyDoThays = useSelector(fetchApiGetAllLyDoThaySelector);
  const manufacturers = useSelector(fetchApiGetAllManufacturerSelector);
  const countries = useSelector(fetchApiGetAllProducingCountrySelector);
  const nguoiLapDats = useSelector(fetchApiGetAllInstallerSelector);
  const [vungId, setVungId] = useState("");
  const [khuVucId, setKhuVucId] = useState("");
  const [tuyenDocId, setTuyenDocId] = useState("");
  // const reasons = useSelector(fetchAllReasonSelector);
  const regions = useSelector(fetchApiAllRegionSelector);
  const staffs = useSelector((state) => state?.nguoidung?.danhSachNguoiDung);
  const [selectedOptions, setSelectedOptions] = useState({
    vung: null,
    khuvuc: null,
    tuyendoc: null,
  });
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const Option = Select;
  const handleSubmit = (values) => {
    console.log("values", { ...values, nhaMayId: factoryId });
    dispatch(fetchAddBlock({ ...values, nhaMayId: factoryId }));
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };



  const { token } = theme.useToken();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [form1] = Form.useForm();
  const layout = {
    labelCol: {
      span: 9,
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };
  const createFilterQueryString = () => {
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

  const createFilterQueryStringForType = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    if (factoryId) {
      const queryString = createFilterQueryStringForType();
      const filterData = {
        type: 2,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [factoryId]);

  useEffect(() => {
    if (factoryId) {
      const queryString = createFilterQueryStringForType();
      const filterData = {
        type: 4,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [factoryId]);
  useEffect(() => {
    if (factoryId) {
      const queryString = createFilterQueryStringForType();
      const filterData = {
        type: 6,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [factoryId]);

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(fetchApiAllRegion(queryString));
  }, [factoryId]);

  useEffect(() => {
    dispatch(fetchApiGetByVungId(vungId));
  }, [vungId]);

  useEffect(() => {
    dispatch(fetchApiGetByKhuVucId(khuVucId));
  }, [khuVucId]);

  const handleChangeOptionVung = useCallback(
    (value, option) => {
      setSelectedOptions({
        mavung: option,
        khuvuc: null,
        tuyendoc: null,
      });
      setVungId(value);
      form1.resetFields(["maVung", "khuVuc"]);
      setKhuVucId(null);
      setTuyenDocId(null)
    },
    [form1, vungId]
  );

  const handleChangeOptionArea = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        khuvuc: option,
        tuyendoc: null,
      }));
      setKhuVucId(value);
      setTuyenDocId(null)
      form1.resetFields(["tuyenDocId"]);
    },
    [form1, khuVucId]
  )
  const handleChangeOptionTuyenDoc = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        tuyendoc: option,
      }));
      setTuyenDocId(value);
    },
    [form1]
  );
  useEffect(() => {
    form1.setFieldsValue({
      maVung: vungId,
      khuVuc: khuVucId,
      tuyenDocId: tuyenDocId,
    });
  }, [selectedOptions, form1]);
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
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="keyId" label="Mã block" {...rules}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="tenDongHo" label="Tên Block" {...rules}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/**
        <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="lyDoThay" label="Lý do thay" >
              <Select
                style={{ width: "100%" }}
                options={lyDoThays?.map((item) => ({
                  label: item?.description,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
        */}

          <Col xs={24} sm={12} md={12} lg={{ span: 24, flex: "auto" }}>
            <Form.Item
              name="diaChi"
              label="Địa chỉ"
              labelCol={isTabletOrMobile ? { span: 9 } : { span: 3 }}

            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="seriDongHo" label="Seri">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="soThuTu" label="Số thứ tự">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="maDHThay" label="Mã vạch">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="nguoiThay" label="Người lắp" >
              <Select
                style={{ width: "100%" }}
                options={nguoiLapDats?.map((item) => ({
                  label: item?.description,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="maVung" label="Mã Vùng" {...rules}>
              <Select
                style={{ width: "100%" }}
                options={regions?.map((item) => ({
                  label: item?.tenVung,
                  value: item?.id,
                }))}
                onChange={(value, option) => {
                  handleChangeOptionVung(value, option.label);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="hangSX" label="Hãng SX" >
              <Select
                style={{ width: "100%" }}
                options={manufacturers?.map((item) => ({
                  label: item?.description,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item label="Khu vực" name="khuVuc" {...rules}>
              <Select
                style={{ width: "100%" }}
                options={areas?.map((item) => ({
                  label: item?.tenKhuVuc,
                  value: item?.id,
                }))}
                onChange={(value, option) => {
                  handleChangeOptionArea(value, option.label);
                }}
                disabled={!vungId}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="nguoiQuanLyId" label="Nhân viên" >
              <Select
                style={{ width: "100%" }}
                options={staffs?.map((item) => ({
                  label: item?.userName,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="tuyenDocId" label="Mã tuyến đọc" {...rules}>
              <Select
                style={{ width: "100%" }}
                options={tuyenDocs?.map((item) => ({
                  label: item?.tenTuyen,
                  value: item?.id,
                }))}
                onChange={(value, option) => {
                  handleChangeOptionTuyenDoc(value, option.label);
                }}
                disabled={!khuVucId}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="chiSoDau" label="Chỉ số đầu">
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="chiSoCuoi" label="Chỉ số cuối">
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="hinhThucXL" label="Hình thức XL">
              <Select style={{ width: "100%" }}>
                <Option value="1">Thống kê</Option>
                <Option value="2">Lắp KH mới</Option>
                <Option value="3">Khách hàng mua</Option>
                <Option value="4">Thay bảo hành</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="trangThaiSuDung"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải chọn trạng thái.",
                },
              ]}
            >
              <Select placeholder="Chọn trạng thái" defaultValue="1">
                <Option value="3">Huỷ</Option>
                <Option value="2">Ngưng sử dụng</Option>
                <Option value="1">Đang sử dụng</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="ngaySuDung" label="Ngày BĐ">
              <DatePicker
                style={{ width: "100%" }}
                locale={locale}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="ngayKetThuc" label="Ngày kết thúc">
              <DatePicker
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="duongKinh" label="Đường kính">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="viTriLapDat" label="Vị trí lắp đặt">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="soPhieuThay" label="Số phiếu thay">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="ngayKiemDinh" label="Ngày kiểm định" {...rules}>
              <DatePicker
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="hieuLucKD" label="Hiệu lực KĐ" {...rules}>
              <DatePicker
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="kinhDo" label="Kinh độ">
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="viDo" label="Vĩ độ" >
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
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
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{
              marginLeft: "10px",
            }}
            className="custom-btn-save-and-add-d"
            disabled={!isCaptcha}
          >
            Thêm
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
export default AddBlockClock;
