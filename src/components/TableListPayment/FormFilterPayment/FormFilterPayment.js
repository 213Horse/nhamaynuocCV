import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getSelectAreaOptions,
  getSelectBillCollectorOptions,
  getSelectCustomerNameOptions,
  getSelectLineReadingOptions,
  getSelectMeterReaderOptions,
  getSelectPaymentTypeOptions,
  getSelectPhoneNumberOptions,
  getSelectPriceObjectOptions,
  getSelectRegionOptions,
  getSelectSeriesInvoiceOptions,
  isLoadingAreaSelector,
  isLoadingBillCollectorSelector,
  isLoadingLineReadingSelector,
  isLoadingMeterReaderSelector,
  isLoadingPaymentTypeSelector,
  isLoadingPriceObjectSelector,
  isLoadingRegionSelector,
  isLoadingSeriesInvoiceSelector,
} from "../../../redux/selector";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  fetchFilterListPayment,
  fetchSelectAreaOptions,
  fetchSelectBillCollectorOptions,
  fetchSelectCustomerNameOptions,
  // fetchSelectLineReadingOptions,
  fetchSelectMeterReaderOptions,
  fetchSelectPaymentTypeOptions,
  fetchSelectPhoneNumberOptions,
  fetchSelectPriceObjectOptions,
  fetchSelectRegionOptions,
  fetchSelectSeriesInvoiceOptions,
  paymentSlice,
} from "../../../redux/slices/paymentSlice/paymentSlice";

function FormFilterPayment() {
  const dispatch = useDispatch();

  //get selector
  const factoryIdSelector = useSelector(btnClickGetFactoryIdSelector);
  const selectAreaOptionsSelector = useSelector(getSelectAreaOptions);
  const selectRegionOptionsSelector = useSelector(getSelectRegionOptions);
  const selectMeterReaderOptionsSelector = useSelector(
    getSelectMeterReaderOptions
  );
  const selectLineReadingOptionsSelector = useSelector(
    getSelectLineReadingOptions
  );
  const selectBillCollectorOptionsSelector = useSelector(
    getSelectBillCollectorOptions
  );
  const selectSeriesInvoiceOptionsSelector = useSelector(
    getSelectSeriesInvoiceOptions
  );
  const selectPaymentTypeOptionsSelector = useSelector(
    getSelectPaymentTypeOptions
  );
  const selectPriceObjectOptionsSelector = useSelector(
    getSelectPriceObjectOptions
  );
  const selectCustomerNameOptionsSelector = useSelector(
    getSelectCustomerNameOptions
  );
  const selectPhoneNumberOptionsSelector = useSelector(
    getSelectPhoneNumberOptions
  );

  //get loading data status
  const isLoadingAreaSelect = useSelector(isLoadingAreaSelector);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isLoadingRegionSelect = useSelector(isLoadingRegionSelector);
  const isLoadingMeterReaderSelect = useSelector(isLoadingMeterReaderSelector);
  const isLoadingBillCollectorSelect = useSelector(
    isLoadingBillCollectorSelector
  );
  const isLoadingSeriesInvoiceSelect = useSelector(
    isLoadingSeriesInvoiceSelector
  );
  const isLoadingLineReadingSelect = useSelector(isLoadingLineReadingSelector);
  const isLoadingPaymentTypeSelect = useSelector(isLoadingPaymentTypeSelector);
  const isLoadingPriceObjectSelect = useSelector(isLoadingPriceObjectSelector);

  //state
  const [customerNameField, setCustomerNameField] = useState("");
  const [phoneNumberField, setPhoneNumberField] = useState("");
  const [arrFactoryId, setArrFactoryId] = useState([]);

  //side effects
  useEffect(() => {
    dispatch(fetchSelectRegionOptions());
    dispatch(fetchSelectMeterReaderOptions());
    dispatch(fetchSelectBillCollectorOptions());
    dispatch(fetchSelectSeriesInvoiceOptions());
    dispatch(fetchSelectPaymentTypeOptions());
    dispatch(fetchSelectPriceObjectOptions());
  }, []);

  // useEffect(() => {
  //   if (factoryIdSelector) {
  //     //handle get line reading by factory id
  //     let factoryIdArr = [];
  //     if (factoryIdSelector === "all") {
  //       factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  //     } else {
  //       factoryIdArr = [{ nhaMayId: factoryIdSelector }];
  //     }
  //     setArrFactoryId(factoryIdArr);
  //     dispatch(fetchSelectLineReadingOptions(factoryIdArr));
  //   }
  // }, [factoryIdSelector]);

  useEffect(() => {
    if (factoryIdSelector) {
      //handle get line reading by factory id
      const data = {
        factoryIdArr: arrFactoryId,
        customerNameField: customerNameField,
      };
      dispatch(fetchSelectCustomerNameOptions(data));
      console.log(data);
    }
    if (selectCustomerNameOptionsSelector.nodes) {
      console.log(selectCustomerNameOptionsSelector.nodes);
    }
  }, [customerNameField]);

  useEffect(() => {
    if (factoryIdSelector) {
      //handle get line reading by factory id
      const data = {
        factoryIdArr: arrFactoryId,
        phoneNumberField: phoneNumberField,
      };
      dispatch(fetchSelectPhoneNumberOptions(data));
      console.log(data);
    }
    if (selectPhoneNumberOptionsSelector.nodes) {
      console.log(selectPhoneNumberOptionsSelector.nodes);
    }
  }, [phoneNumberField]);

  const createFilterQueryString = (filterForm) => {
    let queryString = "";
    let factoryQueryString = "";
    if (factoryIdSelector === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
      });
    } else {
      factoryQueryString = `&nhaMayIds=${factoryIdSelector}`;
    }
    for (const key in filterForm) {
      if (filterForm[key]) {
        if (queryString === "") {
          queryString += `${key}=${filterForm[key]}`;
        } else {
          queryString += `&${key}=${filterForm[key]}`;
        }
      }
    }
    return `${queryString}${factoryQueryString}&pageSize=10&pageNumber=1`;
  };

  // handle submit form
  const handleSubmit = (values) => {
    console.log("values", values);
    console.log(
      "selectLineReadingOptionsSelector",
      selectLineReadingOptionsSelector
    );

    let queryString = "";
    if (values.thangTaoSoDoc) {
      const dateString = encodeURIComponent(
        dayjs(values.thangTaoSoDoc).format("MM/YYYY")
      );
      values = { ...values, thangTaoSoDoc: dateString };
    }

    if (values.tenKhachHang) {
      const encodedString = encodeURIComponent(values.tenKhachHang);
      values = { ...values, tenKhachHang: encodedString };
    }

    if (values.seriHoaDon) {
      const encodedString = encodeURIComponent(values.seriHoaDon);
      values = { ...values, seriHoaDon: encodedString };
    }

    queryString = createFilterQueryString(values);
    dispatch(fetchFilterListPayment(queryString));
    //save query string to use for paging list payment table
    dispatch(paymentSlice.actions.setQueryPaymentList(queryString));
  };

  // handle submit error
  const handleFailed = (error) => {
    console.log({ error });
  };

  const handleGetAreaByRegion = (value) => {
    console.log(value);
    dispatch(fetchSelectAreaOptions(value));
  };

  return (
    <Form onFinish={handleSubmit} onFinishFailed={handleFailed}>
      <Row gutter={24}>
        {/* Chọn tháng */}
        <Col xs={24} sm={12} md={12} lg={5}>
          <Form.Item
            name="thangTaoSoDoc"
            label="Chọn tháng: "
            className={isTabletOrMobile ? "" : "gutter-item"}
            rules={[{ required: true, message: `Cần chọn tháng` }]}
          >
            <DatePicker
              allowClear
              name="monthYear"
              placeholder="Chọn tháng"
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>

        {/* Cán bộ đọc */}
        <Col xs={24} sm={12} md={12} lg={4}>
          <Form.Item
            name="nguoiQuanLyId"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
          >
            <Select
              allowClear
              fieldNames="nguoiQuanLyId"
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              options={
                selectMeterReaderOptionsSelector.nodes
                  ? selectMeterReaderOptionsSelector.nodes.map((option) => {
                      return {
                        value: option.id,
                        label: option.normalizedUserName,
                      };
                    })
                  : []
              }
              loading={isLoadingMeterReaderSelect}
              placeholder="Chọn cán bộ đọc"
            />
          </Form.Item>
        </Col>

        {/* Tuyến đọc */}
        <Col xs={24} sm={12} md={12} lg={4}>
          <Form.Item
            name="tuyenDocId"
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Select
              allowClear
              fieldNames="tuyenDocId"
              options={
                selectLineReadingOptionsSelector.nodes
                  ? selectLineReadingOptionsSelector.nodes.map((option) => {
                      return {
                        value: option.id,
                        label: option.tenTuyen,
                      };
                    })
                  : []
              }
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              placeholder="Chọn tuyến đọc"
              loading={isLoadingLineReadingSelect}
            />
          </Form.Item>
        </Col>

        {/* Cán bộ thu */}
        <Col xs={24} sm={12} md={12} lg={4}>
          <Form.Item
            name="nguoiThuTienId"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
          >
            <Select
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              fieldNames="nguoiThuTienId"
              placeholder="Chọn cán bộ thu"
              loading={isLoadingBillCollectorSelect}
            >
              {selectBillCollectorOptionsSelector.nodes
                ? selectBillCollectorOptionsSelector.nodes.map((option) => {
                    return (
                      <Select.Option key={option.id} value={option.id}>
                        {option.normalizedUserName}
                      </Select.Option>
                    );
                  })
                : ""}
            </Select>
          </Form.Item>
        </Col>

        {/* Phạm vi */}
        {/* <Col xs={24} sm={12} md={12} lg={3}>
          <Form.Item
            name="phamVi"
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Select
            allowClear
              fieldNames=""
              options={[{ value: "1", label: "PV 1" }]}
              placeholder="Chọn phạm vi"
            />
          </Form.Item>
        </Col> */}

        {/* Chọn vùng */}
        <Col xs={24} sm={12} md={12} lg={3}>
          <Form.Item
            name="vungId"
            label="Vùng: "
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
          >
            <Select
              allowClear
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              fieldNames="vungId"
              options={
                selectRegionOptionsSelector.length !== 0
                  ? selectRegionOptionsSelector.map((option) => {
                      return { value: option.id, label: option.tenVung };
                    })
                  : []
              }
              onChange={handleGetAreaByRegion}
              loading={isLoadingRegionSelect}
              placeholder="Chọn vùng"
            />
          </Form.Item>
        </Col>

        {/* Chọn khu vực */}
        <Col xs={24} sm={24} md={24} lg={4}>
          <Form.Item
            name="khuVucId"
            label="Khu vực: "
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Select
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              fieldNames="khuVucId"
              options={
                selectAreaOptionsSelector.length !== 0
                  ? selectAreaOptionsSelector.map((option) => {
                      return { value: option.id, label: option.tenKhuVuc };
                    })
                  : []
              }
              loading={isLoadingAreaSelect}
              placeholder="Chọn khu vực"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Số hợp đồng */}
        <Col xs={24} sm={8} md={8} lg={5}>
          <Form.Item
            name="hopDongKeyId"
            className={isTabletOrMobile ? "" : "gutter-item"}
            label="Số hợp đồng: "
          >
            <Input
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              name=""
              placeholder="Nhập số hợp đồng"
            />
          </Form.Item>
        </Col>

        {/* Mã số hóa đơn */}
        <Col xs={24} sm={8} md={8} lg={5}>
          <Form.Item
            name="seriHoaDon"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
            label="Mã số hóa đơn: "
          >
            <Select
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              name="seriHoaDon"
              options={
                selectSeriesInvoiceOptionsSelector.length !== 0
                  ? selectSeriesInvoiceOptionsSelector.map((option) => {
                      return { value: option.soHoaDon, label: option.soHoaDon };
                    })
                  : []
              }
              placeholder="Chọn mã số hóa đơn"
              loading={isLoadingSeriesInvoiceSelect}
            />
          </Form.Item>
        </Col>

        {/* Số hóa đơn */}
        <Col xs={24} sm={8} md={8} lg={5}>
          <Form.Item
            name="soHoaDon"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
          >
            <Input
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              name=""
              placeholder="Nhập số hóa đơn"
            />
          </Form.Item>
        </Col>

        {/* Hình thức thanh toán */}
        <Col xs={24} sm={12} md={12} lg={4}>
          <Form.Item
            name="phuongThucThanhToanId"
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Select
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              fieldNames="phuongThucThanhToanId"
              options={
                selectPaymentTypeOptionsSelector.length !== 0
                  ? selectPaymentTypeOptionsSelector.map((option) => {
                      return { value: option.id, label: option.moTaPhuongThuc };
                    })
                  : []
              }
              loading={isLoadingPaymentTypeSelect}
              placeholder="Chọn hình thức thanh toán"
            />
          </Form.Item>
        </Col>

        {/* Trạng thái thanh toán */}
        <Col xs={24} sm={12} md={12} lg={5}>
          <Form.Item
            name="trangThaiThanhToan"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
            label="Trạng thái TT"
            rules={[
              { required: true, message: `Cần chọn trạng thái thanh toán` },
            ]}
          >
            <Select
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              allowClear
              fieldNames="trangThaiThanhToan"
              options={[
                { value: "1", label: "Chưa thanh toán" },
                { value: "2", label: "Đã thanh toán" },
              ]}
              placeholder="Chọn trạng thái thanh toán"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Khách hàng */}
        <Col xs={24} sm={12} md={10} lg={7}>
          <Form.Item
            name="tenKhachHang"
            label="Khách hàng"
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <AutoComplete
              name="tenKhachHang"
              options={
                selectCustomerNameOptionsSelector.nodes &&
                selectCustomerNameOptionsSelector.nodes?.map((item) => ({
                  label: item.tenKhachHang,
                  value: item.tenKhachHang,
                }))
              }
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              value={customerNameField}
              onChange={(value) => setCustomerNameField(value)}
              placeholder="Nhập tên khách hàng"
              allowClear
            />
          </Form.Item>
        </Col>

        {/* Số điện thoại */}
        <Col xs={24} sm={12} md={10} lg={6}>
          <Form.Item
            name="soDienThoaiKhachHang"
            label="SDT"
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <AutoComplete
              name="soDienThoaiKhachHang"
              options={
                selectPhoneNumberOptionsSelector.nodes &&
                selectPhoneNumberOptionsSelector.nodes
                  ?.filter((item) => item.dienThoai !== "")
                  ?.map((item) => ({
                    label: item.dienThoai,
                    value: item.dienThoai,
                  }))
              }
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
              value={phoneNumberField}
              onChange={(value) => setPhoneNumberField(value)}
              placeholder="Nhập số điện thoại"
              allowClear
            />
          </Form.Item>
        </Col>

        {/* ĐT giá */}
        <Col xs={24} sm={12} md={10} lg={6}>
          <Form.Item
            name="doiTuongGiaId"
            label="ĐT giá"
            className={isTabletOrMobile ? "gutter-item-mobile" : "gutter-item"}
          >
            <Select
              allowClear
              fieldNames="doiTuongGiaId"
              options={
                selectPriceObjectOptionsSelector.length !== 0
                  ? selectPriceObjectOptionsSelector.map((option) => {
                      return { value: option.id, label: option.moTa };
                    })
                  : []
              }
              placeholder="Chọn đối tượng giá"
              loading={isLoadingPriceObjectSelect}
              size="small"
              style={{
                width: "100%",
                fontWeight: "bolder",
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={1} lg={5} style={{ display: "flex" }}>
          <Button
            size="small"
            style={{ marginTop: "4px", width: "100%" }}
            htmlType="submit"
            className={"custom-btn-search"}
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            size="small"
            style={{ marginTop: "4px", width: "100%" }}
            htmlType="reset"
            className={"custom-btn-search"}
          >
            <SearchOutlined />
            Làm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormFilterPayment;
