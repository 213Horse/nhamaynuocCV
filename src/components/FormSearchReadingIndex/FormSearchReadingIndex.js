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
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  btnClickGetFactoryIdSelector,
  getAllSoDocFilterSelector,
  getDataForMenuSoDoc,
  getSelectLineReadingOptions,
  getTenSoOptions,
  getTuyenDocByNhaMaySelector,
  userRoleSelector,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiFilterSoDoc,
  fetchDataForMenuSoDoc,
  // fetchTenSoOptions,
  getAllIndexVer2,
  getFilterIndex,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
// import { fetchSelectLineReadingOptions } from "../../redux/slices/paymentSlice/paymentSlice";
import {
  setClickFilterIndex,
  setCurrentPageIndex,
  setDataFilterIndex,
  setFilterIndex,
} from "../../redux/slices/currentPageSlice/currentPageSlice";

const pageSizeTuyenDoc = 10;

export const AdvancedSearchForm = ({
  listKGCS,
  listTuyenDoc,
  listKhuVuc,
  canBoDocs,
  setCurrentPage,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [tenSoField, setTenSoField] = useState("");
  const dispatch = useDispatch();
  const tenSoOptions = useSelector(getTenSoOptions);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  useEffect(() => {
    dispatch(getFilterIndex(nhaMayId));
  }, [nhaMayId, dispatch]);

  //get nhaMayId
  // useEffect(() => {
  //   if (nhaMayId) {
  //     //handle get line reading by factory id
  //     let factoryIdArr = "";
  //     if (nhaMayId === "all") {
  //       factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  //     } else {
  //       factoryIdArr = [nhaMayId];
  //     }
  //     dispatch(fetchSelectLineReadingOptions(factoryIdArr));
  //   }
  // }, [nhaMayId]);

  // useEffect(() => {
  //   if (nhaMayId) {
  //     //handle get line reading by factory id
  //     let factoryIdArr = [];
  //     if (nhaMayId === "all") {
  //       factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  //     } else {
  //       factoryIdArr = [{ nhaMayId: nhaMayId }];
  //     }
  //     const data = {
  //       factoryIdArr: factoryIdArr,
  //       tenSoField: tenSoField,
  //     };
  //     dispatch(fetchTenSoOptions(data));
  //     console.log(data);
  //   }
  // }, [tenSoField]);

  const createFilterQueryString2 = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${nhaMayId}`;
    }
    return `${factoryQueryString}`;
  };

  const onFinish = (values) => {
    dispatch(setClickFilterIndex(1));
    values.soLuong = 10;
    values.soTrang = 1;
    values.nhaMayId = nhaMayId;
    if (values.thangTaoSo) {
      values.thangTaoSo = dayjs(values.thangTaoSo).format("MM/YYYY");
    }
    console.log("month ", values.thangTaoSo);
    dispatch(getAllIndexVer2(values));
    dispatch(setFilterIndex(1));
    dispatch(setCurrentPageIndex(1));
    dispatch(setDataFilterIndex(values));
  };
  const resetFilter = (values) => {
    dispatch(setClickFilterIndex(1));
    const data = { ...values };
    data.soLuong = 10;
    data.soTrang = 1;
    data.nhaMayId = nhaMayId;
    form.resetFields();
    setTenSoField("");
    dispatch(getAllIndexVer2(data));
    dispatch(setFilterIndex(0));
    dispatch(setCurrentPageIndex(1));
    dispatch(setDataFilterIndex(null));
  }

  const optionsTrangThai = [
    {
      label: "Chưa chốt",
      value: 1,
    },
    {
      label: "Đã chốt",
      value: 2,
    },
    {
      label: "Chưa khóa",
      value: 3,
    },
    {
      label: "Đã khóa",
      value: 4,
    },
  ];

  const handleChangeTrangThai = (values) => {
    console.log("Select values", values);
  };

  const dataForMenu = useSelector(getDataForMenuSoDoc);

  useEffect(() => {
    dispatch(fetchDataForMenuSoDoc(createFilterQueryString2()));
  }, [nhaMayId]);

  return (
    <Form
      // {...layout}
      form={form}
      name="advanced_search"
      // style={formStyle}
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={[6, 6]}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item name="tuyenDocId">
            <Select
              fieldNames="tuyenDocId"
              options={dataForMenu?.tuyenDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              style={{ fontWeight: "bold" }}
              size="small"
              placeholder="Chọn tuyến đọc"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item name="tenSo">
            <Input
              name="tenSo"
              size="small"
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              placeholder="Nhập tên sổ"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item
            name="canBoDocId"
            hidden={JSON.parse(sessionStorage.getItem("user_role"))?.includes(
              "NV ghi số/Thu tiền"
            )}
          >
            <Select
              style={{ fontWeight: "bold" }}
              size="small"
              fieldNames="canBoDocId"
              options={dataForMenu?.canBoDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item name="tenKhanhHang">
            <Input
              style={{ fontWeight: "bold" }}
              size="small"
              fieldNames="tenKhanhHang"
              placeholder="Nhập tên khách hàng"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[6, 6]}>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item name="thangTaoSo">
            <DatePicker
              size="small"
              locale={locale}
              allowClear
              name="thangTaoSo"
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              format={"MM-YYYY"}
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item name="trangThai">
            <Select
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              size="small"
              placeholder="Chọn trạng thái"
              fieldNames="trangThai"
              options={optionsTrangThai}
              onChange={handleChangeTrangThai}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item name="khuVucId">
            <Select
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              size="small"
              placeholder="Chọn khu vực"
              fieldNames="place"
              options={dataForMenu?.khuVuc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Form.Item name="kyGCSId">
            <Select
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              size="small"
              placeholder="Chọn Kỳ Ghi Chỉ Số"
              fieldNames="kyGCSId"
              options={dataForMenu?.kyGhiChiSo?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
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
            style={{ width: "100%", marginTop: "4px" }}
            htmlType="submit"
            className="custom-btn-search gutter-item-btn"
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            size="small"
            style={{ width: "100%", marginTop: "4px" }}
            className="custom-btn-reset gutter-item-btn"
            onClick={resetFilter}
          >
            <FilterOutlined />
            Xóa Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
