import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getRequest } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getCanBoDoc,
  getDataForMenuInvoice,
} from "../../redux/selector";
import { invoiceSlice } from "../../redux/slices/invoiceSlice/invoiceSlice";
import { fetchDataForMenuInvoice } from "../../redux/slices/invoiceSlice/invoiceSlice";

const months = [
  {
    value: 1,
    label: "Tháng 1",
  },
  {
    value: 2,
    label: "Tháng 2",
  },
  {
    value: 3,
    label: "Tháng 3",
  },
  {
    value: 4,
    label: "Tháng 4",
  },
  {
    value: 5,
    label: "Tháng 5",
  },
  {
    value: 6,
    label: "Tháng 6",
  },
  {
    value: 7,
    label: "Tháng 7",
  },
  {
    value: 8,
    label: "Tháng 8",
  },
  {
    value: 9,
    label: "Tháng 9",
  },
  {
    value: 10,
    label: "Tháng 10",
  },
  {
    value: 11,
    label: "Tháng 11",
  },
  {
    value: 12,
    label: "Tháng 12",
  },
];

export const AdvancedSearchForm = ({
  setRowSelection,
  setClickReset,
  fetchFilterInvoiceList,
  setCurPage,
  setIsFilter,
  setFilterData,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const canBoDocSelector = useSelector(getCanBoDoc);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();

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
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const dataForMenu = useSelector(getDataForMenuInvoice);
  useEffect(() => {
    dispatch(fetchDataForMenuInvoice(createFilterQueryString()));
  }, [nhaMayId]);

  console.log("data", dataForMenu);

  const [soHoaDon, setSoHoaDon] = useState([]);

  useEffect(() => {
    getRequest("danh-muc-seri-hoa-don/get-all").then(
      (res) => {
        console.log(res);
        setSoHoaDon(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  function onFinish(values) {
    values.ThangTaoHoaDon = encodeURIComponent(
      values.ThangTaoHoaDon?.format("MM/YYYY")
    );
    if (values.TenKhachHang) {
      values.TenKhachHang = encodeURIComponent(values.TenKhachHang);
    }
    // if (values.TuyenDocId) {
    //   values = { ...values, TuyenDocId: saveTuyenDocId };
    // }
    setFilterData(values);
    setRowSelection(null);
    fetchFilterInvoiceList(values);
    setIsFilter(true);
  }
  const validateDen = (_, value) => {
    const tuValue = form.getFieldValue("Tu");
    if (!tuValue || !value) {
      return Promise.resolve();
    }
    return value > tuValue
      ? Promise.resolve()
      : Promise.reject("Đến phải lớn hơn Từ");
  };

  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item
            name="ThangTaoHoaDon"
            label="Chọn tháng"
            rules={[{ required: true, message: `Cần chọn tháng` }]}
          >
            <DatePicker
              allowClear
              name="monthYear"
              placeholder="Chọn tháng"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="CanboDocId" label="Cán bộ đọc">
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              listHeight={"13rem"}
              options={dataForMenu?.canBoDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Cán bộ đọc"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="TuyenDocId" label="Tuyến đọc">
            <Select
              allowClear
              options={dataForMenu?.tuyenDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              placeholder="Tuyến đọc"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="KeyIdHopDong" label="Số hợp đồng">
            <AutoComplete
              allowClear
              // options={resultSearchHopDong?.map((item) => ({
              //   label: item.keyId,
              //   value: item.keyId,
              // }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              // onChange={(value) => {
              //   setInputSearchHopDong(value);
              // }}
              placeholder="Số hợp đồng"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6} xs={24} sm={12} lg={4}>
          {/* <Form.Item name="tenKhachHang" label="Khách hàng">
            <Input placeholder="Tên khách hàng" />
          </Form.Item> */}
          <Form.Item
            name="TenKhachHang"
            label="Khách hàng"
            style={{ marginRight: "70px", width: "100%" }}
          >
            <AutoComplete
              allowClear
              // options={resultSearchKH?.map((item) => ({
              //   label: item.tenKhachHang,
              //   value: item.tenKhachHang,
              // }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              // onChange={(value) => {
              //   setInputSearchKH(value);
              // }}
              placeholder="Tên khách hàng"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={3}>
          {/* <Form.Item name="tenKhachHang" label="Khách hàng">
            <Input placeholder="Tên khách hàng" />
          </Form.Item> */}
          <Form.Item
            name="MaKhachHang"
            style={{ marginRight: "70px", width: "100%" }}
          >
            <Input size="small" placeholder="Mã khách hàng" />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="SeriHoaDon" label="Số hóa đơn">
            <Select
              allowClear
              // defaultValue="--Chọn số hóa đơn--"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={dataForMenu?.seriHoaDon?.map((item) => ({
                value: item.id,
                label: item.value,
              }))}
            />
          </Form.Item>
        </Col>

        <Col span={6} xs={24} sm={12} lg={3}>
          <Form.Item name="Tu" label="Từ">
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              placeholder="Tu"
              options={months}
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={3}>
          <Form.Item
            name="Den"
            label="Đến"
            dependencies={["Tu"]}
            rules={[{ validator: validateDen }]}
          >
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              placeholder="Đến"
              options={months}
            />
          </Form.Item>
        </Col>

        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="TrangThaiHoaDon" label="TT Hóa đơn">
            <Select
              allowClear
              // defaultValue="--Chọn in hóa đơn--"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={[
                {
                  value: 1,
                  label: "Chưa thanh toán",
                },
                {
                  value: 2,
                  label: "Đã thanh toán",
                },
                {
                  value: 3,
                  label: "Chưa duyệt",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="TrangThaiGui" label="TT Gửi">
            <Select
              allowClear
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={[
                {
                  value: 1,
                  label: "Chưa gửi",
                },
                {
                  value: 2,
                  label: "Thành Công",
                },
                {
                  value: 3,
                  label: "Thất bại",
                },
                {
                  value: 4,
                  label: "Đang gửi",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="SoDienThoaiKhachHang" label="Số điện thoại">
            <AutoComplete
              allowClear
              // options={resultSearchSDT
              //   ?.filter((item) => item.dienThoai !== "")
              //   ?.map((item) => ({
              //     label: item.dienThoai,
              //     value: item.dienThoai,
              //   }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              // onChange={(value) => {
              //   setInputSearchSDT(value);
              // }}
              placeholder="Số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={8}
          style={{
            display: "flex",
          }}
        >
          <Button
            size="small"
            style={{ width: "100%" }}
            className="custom-btn-search"
            htmlType="submit"
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            size="small"
            style={{ width: "100%" }}
            danger
            onClick={() => {
              setClickReset();
              form.resetFields();
              setRowSelection(null);
              setIsFilter(false);
              dispatch(invoiceSlice.actions.setThangNamInvoice(null));
              dispatch(invoiceSlice.actions.setTuyenDocIdInvoice(null));
            }}
          >
            Làm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
