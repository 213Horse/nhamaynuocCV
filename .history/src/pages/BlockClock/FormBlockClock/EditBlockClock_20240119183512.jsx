import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
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
import { fetchApiGetAllClockWater } from "../../../redux/slices/waterClockSlice/waterClockSlice";
import { fetchEditlock, getAllBlockClock } from "../../../redux/slices/blockSlice/blockSlice";
import Captcha from "../../../components/Captcha/Captcha";
import {
  btnClickGetFactoryIdSelector,
  fetchAllReasonSelector,
  fetchApiAllAreaSelector,
  fetchApiAllRegionSelector,
  fetchApiGetAllLyDoThaySelector,
  fetchApiGetAllManufacturerSelector,
  fetchApiGetAllProducingCountrySelector,
  setRowSelectedSelector,
} from "../../../redux/selector";
import { LOAD_TUYEN_DOC_BY_NHA_MAY_ID } from "../../../graphql/reading/queries";
import { useQuery } from "@apollo/client";
import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { btnClickTabListReading } from "../../../redux/slices/tabListReading/tabListReaingSlice";
import { LOAD_ALL_CAN_BO_DOC } from "../../../graphql/users/usersQuery";
moment.locale("vi");
const EditBlockClock = ({ hideModal, setEditBlock }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const Option = Select;
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const areas = useSelector(fetchApiAllAreaSelector);
  const manufacturers = useSelector(fetchApiGetAllManufacturerSelector);
  const countries = useSelector(fetchApiGetAllProducingCountrySelector);
  const reasons = useSelector(fetchApiGetAllLyDoThaySelector);
  const regions = useSelector(fetchApiAllRegionSelector);
  const staffs = useSelector((state) => state?.nguoidung?.danhSachNguoiDung);
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  //get array nhaMayId
  useEffect(() => {
    let factory = [];
    if (factoryId === "all") {
      factory = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factory = [factoryId];
    }
    console.log(factory);
    setFactoryIdArr(factory);
  }, [factoryId]);

  const { data: tuyenDocs, error } = useQuery(LOAD_TUYEN_DOC_BY_NHA_MAY_ID, {
    variables: {
      nhaMayId: factoryIdArr ? factoryIdArr : null,
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: canBoDocs } = useQuery(LOAD_ALL_CAN_BO_DOC, {
    variables: {
      first: 100,
      roleCanBo: "Cán bộ đọc",
    },
  });

  const GetNguoiQuanLy = (nguoiQuanLyId) => {
    const user = canBoDocs?.GetUsers?.nodes.find(
      (item) => item.id === nguoiQuanLyId
    );
    return user?.normalizedUserName;
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
        type: 6,
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

  console.log("rowselect", rowSelected);

  const handleSubmit = async (values) => {
    // values.trangThaiSuDung = Number(values.trangThaiSuDung)
    const data = {
      ...values,
      prevKeyId: rowSelected.keyId,
      ngaySuDung: moment(values.ngaySuDung).toDate(),
      ngayKiemDinh: moment(values.ngayKiemDinh).toDate(),
      hieuLucKD: moment(values.hieuLucKD).toDate(),
      ngayKetThuc: moment(values.ngayKetThuc).toDate(),
    };
    if (data) {
      await dispatch(fetchEditlock(data));
    }
    hideModal()
    dispatch(getAllBlockClock(factoryId))
    dispatch(btnClickTabListReading(null))
    form.resetFields();
  };
  const handleFailed = (error) => {
    console.log({ error });
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState(false);

  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();
  useEffect(() => {
    dispatch(fetchApiGetAllClockWater());
  }, []);

  const onFinish = (values) => { };

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
              rules={[{ required: true, message: "Hãy nhập vào tên block!" }]}
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
              rules={[{ required: true, message: "Hãy nhập vào địa chỉ!" }]}
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
              rules={[
                { required: true, message: "Hãy nhập vào seri đồng hồ!" },
              ]}
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
              {...rules}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="trangThaiSuDung"
              label="Trạng thái"
              initialValue={rowSelected?.trangThaiSuDung}
              {...rules}
            >
              <Select placeholder="Chọn trạng thái" options={[
                {
                  label: "Đang sử dụng",
                  value: 1
                },
                {
                  label: "Ngưng sử dụng",
                  value: 2
                },
                {
                  label: "Hủy",
                  value: 3
                },
              ]
              }></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>

          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="nguoiQuanLyId"
              label="Nhân viên"
              initialValue={rowSelected?.nguoiQuanLyId}
              {...rules}
            >
              <Select
                style={{ width: "100%" }}
                options={
                  canBoDocs?.GetUsers?.nodes?.length <= 0
                    ? []
                    : canBoDocs?.GetUsers?.nodes?.map((_nameManager) => ({
                      label: _nameManager.normalizedUserName,
                      value: _nameManager.id,
                    }))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="hangSXId"
              label="Hãng SX"
              initialValue={rowSelected?.hangSXId}
              {...rules}
            >
              <Select
                style={{ width: "100%" }}
                options={manufacturers?.map((item) => ({
                  label: item?.description,
                  value: item?.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="soPhieuThay"
              label="Số phiếu thay"
              initialValue={rowSelected?.soPhieuThay}
              {...rules}
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
              initialValue={dayjs(rowSelected?.ngaySuDung, "DD/MM/YYYY")}
              {...rules}
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
              initialValue={dayjs(rowSelected?.ngayKetThuc, "DD/MM/YYYY")}
              {...rules}
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
              {...rules}
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
              initialValue={dayjs(rowSelected?.ngayKiemDinh, "DD/MM/YYYY")}
              {...rules}
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
              initialValue={dayjs(rowSelected?.hieuLucKD, "DD/MM/YYYY")}
              {...rules}
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
              {...rules}
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
              {...rules}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="viDo"
              label="Vĩ độ"
              initialValue={rowSelected?.viDo}
              {...rules}
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
              rules={[{ required: true, message: "Hãy nhập vào mã vạch!" }]}
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
