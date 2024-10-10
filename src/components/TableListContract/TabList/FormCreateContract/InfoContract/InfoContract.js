import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllPaymentMethodSelector,
  fetchApiAllPriceListObjectSelector,
  fetchApiAllPriceObject2Selector,
  fetchApiAllPriceObjectSelector,
  fetchApiGetAllInstallerSelector,
  fetchApiGetCustomerByCMNDSelector,
  getDataForMenuContractCreate,
  getDetailHopDongSelector,
} from "../../../../../redux/selector";
import { fetchApiAllPaymentMethod } from "../../../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import {
  fetchApiAllPriceObject,
  fetchApiAllPriceObject2,
} from "../../../../../redux/slices/priceObjectSlice/priceObjectSlice";
import { getAllDMTotalByType } from "../../../../../redux/slices/DmTotalSlice/DmTotalSlice";
import { RedoOutlined } from "@ant-design/icons";
import { fetchApiGetContractIdNew } from "../../../../../redux/slices/contractSlice/contractSlice";
import { fetchApiAllPriceListObject } from "../../../../../redux/slices/priceListObjectSlice/priceListObjectSlice";

function InfoContract({ isUpdate }) {
  const dispatch = useDispatch();

  const objPrices = useSelector(fetchApiAllPriceObject2Selector);
  const paymentMethods = useSelector(fetchApiAllPaymentMethodSelector);
  const nguoiLapDats = useSelector(fetchApiGetAllInstallerSelector);
  const customerFromCMND = useSelector(fetchApiGetCustomerByCMNDSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const selectedHopDong = useSelector(getDetailHopDongSelector);
  const dataForMenu = useSelector(getDataForMenuContractCreate);
  const formItemLayout = {
    labelCol: {
      xs: { span: 22 },
      sm: { span: 5 },
      md: { span: 7 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 22 },
    },
  };

  console.log("selectedHopDong", selectedHopDong);

  // get -> mã hợp đồng mới
  useEffect(() => {
    customerFromCMND &&
      dispatch(fetchApiGetContractIdNew(customerFromCMND?.keyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFromCMND]);

  // handle get all (người lắp đặt)
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayId}`;
    }
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    if (nhaMayId) {
      const queryString = createFilterQueryString();
      const filterData = {
        type: 2,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [nhaMayId]);

  const createFilterQueryStringPayment = () => {
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
    const queryString = createFilterQueryStringPayment();
    dispatch(fetchApiAllPaymentMethod(queryString));
  }, []);

  useEffect(() => {
    const queryString = createFilterQueryStringPayment();
    dispatch(fetchApiAllPriceObject2(queryString));
  }, [nhaMayId]);

  return (
    <div className="container-info-contract">
      <Row>
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item label="Mã vạch" {...formItemLayout} hidden>
            <Input placeholder="Nhập mã vạch" disabled />
          </Form.Item>
        </Col>

        {/* Số hợp đồng + Button reset (mã khách hàng) */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="maHopDong"
            label="Mã HĐ"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải nhập mã hợp đồng.",
            //   },
            // ]}
          >
            <Input
              size="small"
              name="maHopDong"
              placeholder="Mã hợp đồng"
              className="space-right-10"
              disabled={isUpdate ? true : false}
            />
          </Form.Item>
        </Col>
        {/* <div className="container-label-input">

        {/* <Col xs={1} sm={1} md={1} lg={1}>
          <Form.Item {...formItemLayout}>
            <Tooltip
              title="Làm mới mã HĐ"
              className={`${
                isUpdate ||
                // customerFromCMND ||
                customerFromCMND?.hopDongs?.length > 0 //customer?.hopDongs?.length > 0
                  ? "disabled-is-update"
                  : ""
              }`}
            >
              <Button
                className="custom-btn-reset-form-contract custom-btn-reset space-left-6 space-top-40"
                onClick={handleGeneratedContractId}
              >
                <RedoOutlined />
              </Button>
            </Tooltip>
          </Form.Item>
        </Col> */}

        {/* <Col xs={1} sm={1} md={1} lg={1}></Col> */}

        {/* ĐT giá (load from api) */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="doiTuongGiaId"
            label="ĐT giá"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống!",
              },
            ]}
          >
            <Select
              size="small"
              fieldNames="doiTuongGiaId"
              options={dataForMenu?.doiTuongGia?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn đối tượng giá"
            />
          </Form.Item>
        </Col>

        {/* Mục đích SD */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="mucDichSuDung"
            label="Mục đích SD"
            {...formItemLayout}
          >
            <Select
              size="small"
              fieldNames="mucDichSuDung"
              options={[
                { value: "1", label: "Hành Chính, Sự Nghiệp" },
                { value: "2", label: "Sinh hoạt" },
                { value: "3", label: "Sinh Hoạt_TB" },
                { value: "4", label: "Sản xuất" },
              ]}
              placeholder="Chọn mục đích SD"
            />
          </Form.Item>
        </Col>

        <Col xs={1} sm={1} md={1} lg={1}></Col>

        {/* Hình thức TT */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="phuongThucThanhToanId"
            label="Hinh thức TT"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống!",
              },
            ]}
          >
            <Select
              size="small"
              fieldNames="phuongThucThanhToanId"
              options={dataForMenu?.hinhThucThanhToan?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn hình thức thanh toán"
            />
          </Form.Item>
        </Col>

        {/* Khu vực TT */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="khuVucThanhToan"
            label="Khu vực TT: "
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn khu vực thanh toán.",
            //   },
            // ]}
          >
            <Select
              size="small"
              fieldNames="khuVucThanhToan"
              options={[
                { value: "1", label: "KV 1" },
                { value: "2", label: "KV 2" },
              ]}
              placeholder="Chọn khu vực TT"
            />
          </Form.Item>
        </Col>

        {/* Ngày ký hợp đồng */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ngayKyHopDong"
            label="Ngày ký HĐ"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn ngày ký hợp đồng.",
            //   },
            // ]}
          >
            <DatePicker
              size="small"
              locale={locale}
              name="ngayKyHopDong"
              placeholder="Chọn ngày ký hợp đồng"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Ngày lắp đặt */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ngayLapDat"
            label="Ngày LĐ"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn ngày lắp đặt.",
            //   },
            // ]}
          >
            <DatePicker
              size="small"
              locale={locale}
              name="ngayLapDat"
              placeholder="Chọn ngày lắp đặt"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Người lắp đặt */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="nguoiLapDatID" label="Người LĐ" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="nguoiLapDatID"
              options={dataForMenu?.nguoiLapDat?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllNguoiLapDat}
              placeholder="Chọn người lắp đặt"
            />
          </Form.Item>
        </Col>

        {/* Ngày nộp tiền */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ngayNopTien"
            label="Ngày NT"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn ngày nộp tiền.",
            //   },
            // ]}
          >
            <DatePicker
              size="small"
              locale={locale}
              name="ngayNopTien"
              placeholder="Chọn ngày nộp tiền"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={1} sm={1} md={1} lg={1}></Col>

        {/* Tiền lắp đặt */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="tienLapDat"
            label="Tiền LĐ"
            {...formItemLayout}
            rules={[
              {
                //money format: 169.156,123 or  169,156.123
                pattern:
                  /(?:^\d{1,3}(?:\.?\d{3})*(?:,\d{3})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\.\d{3})?$)/,
                message: "Tiền lắp đặt không hợp lệ",
              },
            ]}
          >
            <Input
              name="tienLapDat"
              placeholder="Nhập số tiền lắp đặt"
              size="small"
            />
          </Form.Item>
        </Col>

        {/* Người nộp */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="nguoiNop" label="Người nộp" {...formItemLayout}>
            <Input
              size="small"
              name="nguoiNop"
              placeholder="Nhập tên người nộp"
            />
          </Form.Item>
        </Col>

        <Col xs={1} sm={1} md={1} lg={1}></Col>

        {/* Tiền cọc */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="tienDatCoc"
            label="Tiền cọc"
            {...formItemLayout}
            rules={[
              {
                //money format: 169.156,123 or  169,156.123
                pattern:
                  /(?:^\d{1,3}(?:\.?\d{3})*(?:,\d{3})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\.\d{3})?$)/,
                message: "Tiền đặt cọc không hợp lệ",
              },
            ]}
          >
            <Input
              size="small"
              name="tienDatCoc"
              placeholder="Nhập số tiền cọc"
            />
          </Form.Item>
        </Col>

        {/* Ngày đặt cọc */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ngayDatCoc"
            label="Ngày ĐC"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn ngày đặt cọc.",
            //   },
            // ]}
          >
            <DatePicker
              name="ngayDatCoc"
              size="small"
              locale={locale}
              placeholder="Chọn ngày đặt cọc"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={1} sm={1} md={1} lg={1}></Col>

        {/* Cam kết sử dụng nước */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="camKetSuDungNuoc"
            label="Cam kết SDN"
            {...formItemLayout}
            valuePropName="checked"
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn cam kết sử dụng nước.",
            //   },
            // ]}
          >
            <Checkbox size="small" name="camKetSuDungNuoc" />
          </Form.Item>
        </Col>

        {/* Khối lượng cam kết */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="khoiLuongNuocCamKet"
            label="KL cam kết"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải nhập số tiền cọc.",
            //   },
            // ]}
          >
            <Input
              size="small"
              name="khoiLuongNuocCamKet"
              placeholder="Nhập khối lượng cam kết"
            />
          </Form.Item>
        </Col>

        <Col xs={1} sm={1} md={1} lg={1}></Col>

        {/* Kinh độ */}
        {/* <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="kinhDo" label="Kinh độ" {...formItemLayout}>
            <Input name="kinhDo" placeholder="Nhập kinh độ" />
          </Form.Item>
        </Col> */}

        {/* Vĩ độ */}
        {/* <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="viDo" label="Vĩ độ" {...formItemLayout}>
            <Input name="viDo" placeholder="Nhập vĩ độ" />
          </Form.Item>
        </Col> */}

        {/* <Col xs={1} sm={1} md={1} lg={1}></Col> */}

        {/* Ghi chú */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ghiChuOfContract"
            label="Ghi chú: "
            {...formItemLayout}
          >
            <Input
              size="small"
              name="ghiChuOfContract"
              placeholder="Nhập ghi chú"
            />
          </Form.Item>
        </Col>

        {/* Nhà máy id */}
        <Col xs={24} sm={22} md={11} lg={10}>
          <Form.Item
            name="nhaMayIdOfContract"
            label="Nhà máy"
            {...formItemLayout}
            hidden
          >
            <Input size="small" name="nhaMayIdOfContract" disabled />
          </Form.Item>
        </Col>

        {/* File đính kèm */}
        <Col xs={24} sm={22} md={11} lg={10}>
          <Form.Item name="fileDinhKemModels" {...formItemLayout} hidden>
            <Input size="small" name="fileDinhKemModels" disabled />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default memo(InfoContract);
