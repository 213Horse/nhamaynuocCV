import React, { useRef, useState } from "react";
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
import {
  CloseOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import viVN from "antd/es/date-picker/locale/vi_VN";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiAddTotalWatch } from "../../../redux/slices/totalWatchSlice/totalWatchSlice";
import { fetchApiGetAllManufacturerSelector, fetchApiGetAllProducingCountrySelector, fetchApiTotalWatchSelector, fetchApiWathList } from "../../../redux/selector";
import Captcha from "../../../components/Captcha/Captcha";
moment.locale("vi");
const AddListWatch = ({ hideModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const { Option } = Select;
  const dispatch = useDispatch()
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const watchListData = useSelector(fetchApiWathList);
  const listProducingCountryData = useSelector(fetchApiGetAllProducingCountrySelector)
  const listManufacturerData = useSelector(fetchApiGetAllManufacturerSelector)

  const [form1] = Form.useForm();
  const { token } = theme.useToken();

  const handleSaveAndClose = (values) => {
    if (values) {
      dispatch(fetchApiAddTotalWatch(values));
      captchaRef.current.reset()
      setIsCaptcha(false)
      form1.resetFields()
      hideModal()
    }
  }

  // handle save and continue add 
  const handleSaveAndAdd = async () => {
    try {
      const values = await form1.validateFields();
      console.log(values);
      if (values) {
        dispatch(fetchApiAddTotalWatch(values));
        captchaRef.current.reset()
        setIsCaptcha(false)
        form1.resetFields()
      }
    } catch (error) {

    }
  }

  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const layout = {
    labelCol: {
      span: 5,
    },
  };

  const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinish={handleSaveAndClose}
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
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Mã đồng hồ" name='keyId'>
              <Input style={{ width: "100%" }} placeholder="Nhập mã đồng hồ" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Số seri" name='seriDongHo'>
              <Input style={{ width: "100%" }} placeholder="Nhập số seri" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Chỉ số đầu" name='chiSoDau'>
              <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập chỉ số đầu" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Chỉ số cuối" name='chiSoCuoi'>
              <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập chỉ số cuối" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} name='loaiDongHo' label="Loại đồng hồ">
              <Select
                placeholder="Chọn kiểu đồng hồ"
                options={watchListData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Đường kính" name='duongKinh'>
              <InputNumber style={{ width: "100%" }} placeholder="Nhập đường kính" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Nước sản xuất" name='nuocSX'>
              <Select
                placeholder="Chọn nước sản xuất"
                options={listProducingCountryData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Hãng sản xuất" name='hangSX'>
              <Select
                placeholder="Chọn hãng sản xuất"
                options={listManufacturerData?.map(item => ({
                  label: item?.value,
                  value: item?.id
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Ngày sản xuất" name='ngayKiemDinh'>
              <DatePicker
                locale={viVN}
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Ngày kết thúc" name='hieuLucKD'>
              <DatePicker
                locale={viVN}
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Số thứ tự" name='soThuTu'>
              <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số thứ tự" />
            </Form.Item>
          </Col>
          {/* <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Đồng hồ cha" name='dongHoChaId'>
              <Select placeholder="Chọn khu vực cha">
                <Option value="1">Đồng hồ cha 1</Option>
                <Option value="2">Đồng hồ cha 2</Option>
              </Select>
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={10}>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Địa chỉ" name='diaChi'>
              <Input style={{ width: "100%" }} placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item {...rules} label="Trạng thái" name='trangThaiSuDung'>
              <Select placeholder="Chọn trạng thái">
                <Option value="3">Huỷ</Option>
                <Option value="2">Ngưng sử dụng</Option>
                <Option value="1">Đang sử dụng</Option>
              </Select>
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
            className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            <Form.Item className="captcha-wrapper">
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
            marginTop: "10px",
          }}
        >
          {/* <Button
            key="saveAndAdd"
            style={{
              marginLeft: "10px",
            }}
            icon={<FileAddOutlined />}
            className="custom-btn-reset-d"
            onClick={handleSaveAndAdd}
            disabled={!isCaptcha}
          >
            Lưu và thêm tiếp
          </Button> */}

          <Button
            key="saveAndClose"
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
            disabled={!isCaptcha}
          >
            Lưu và đóng
          </Button>

          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            className="custom-btn-close-d"
            onClick={() => {
              captchaRef.current.reset()
              hideModal()
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default AddListWatch;
