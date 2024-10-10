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
  getTenSoOptions,
} from "../../redux/selector";
import readingIndexSlice, {
  fetchApiFilterSoDoc,
  getAllIndexVer2,
  getFilterIndex,
} from "../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useQuery } from "@apollo/client";
import { LOAD_TUYEN_DOC_BY_NHA_MAY_ID } from "../../graphql/reading/queries";
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
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    borderRadius: token.borderRadiusLG,
    padding: 5,
  };

  const [isFetchingMoreTuyenDoc, setIsFetchingMoreTuyenDoc] = useState(false);
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const [tenSoField, setTenSoField] = useState("");
  const dispatch = useDispatch();
  const tenSoOptions = useSelector(getTenSoOptions);
  const listSoDocFilter = useSelector(getAllSoDocFilterSelector);
  // get from redux
  // const listReading = useSelector(fetchApiAllReadingSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  //get array nhaMayId
  useEffect(() => {
    let factory = [];
    if (nhaMayId === "all") {
      factory = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factory = [nhaMayId];
    }
    console.log(factory);
    setFactoryIdArr(factory);
  }, [nhaMayId]);

  // get from graphql
  const { data: tuyenDocs, fetchMore: fetchMoreTuyenDoc } = useQuery(
    LOAD_TUYEN_DOC_BY_NHA_MAY_ID,
    {
      variables: {
        first: pageSizeTuyenDoc,
        nhaMayId: factoryIdArr ? factoryIdArr : null,
      },
    }
  );

  // set default fields
  useEffect(() => {
    form.setFieldsValue({ monthYear: dayjs(new Date()) });
  }, [form]);

  useEffect(() => {
    dispatch(getFilterIndex(nhaMayId));
  }, [nhaMayId, dispatch]);
  // handle get all (tuyến đọc)
  // useEffect(() => {
  //   dispatch(fetchApiAllReading());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 22,
    },
  };
  const tuyenDocArray = listSoDocFilter?.tuyenDoc;

  const canBoDocArray = listSoDocFilter?.canBoDoc;

  const optionsCanBoDoc = canBoDocArray?.map((item) => ({
    label: item.value,
    value: item.id,
  }));

  const optionsTuyenDoc = tuyenDocArray?.map((item) => ({
    label: item.value,
    value: item.id,
  }));

  const optionsKGCS = listKGCS?.map((item) => ({
    label: item.moTa,
    value: item.id,
  }));

  const optionsKhuVuc = listKhuVuc?.map((item) => ({
    label: item.tenKhuVuc,
    value: item.id,
  }));

  const optionsTrangThai = [
    {
      label: "Đang ghi",
      value: 1,
    },
    {
      label: "Đã ngừng",
      value: 2,
    },
  ];
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
  };

  const handleChangeTrangThai = (values) => {
    console.log("Select values", values);
  };

  // handle fetch more data -> tuyến đọc theo nhà máy
  const handleOnPopupScrollTuyenDoc = (e) => {
    const { target } = e;

    if (
      isFetchingMoreTuyenDoc ||
      !tuyenDocs?.GetTuyenDocs.pageInfo.hasNextPage
    ) {
      return;
    }

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setIsFetchingMoreTuyenDoc(true);

      fetchMoreTuyenDoc({
        variables: {
          first: pageSizeTuyenDoc,
          after: tuyenDocs?.GetTuyenDocs.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (tuyenDocs?.GetTuyenDocs.pageInfo.hasNextPage) {
            // Update data when click change page
            const updateData = {
              GetTuyenDocs: {
                ...prev.GetTuyenDocs,
                nodes: [
                  ...prev.GetTuyenDocs.nodes,
                  ...fetchMoreResult.GetTuyenDocs.nodes,
                ],
                pageInfo: fetchMoreResult.GetTuyenDocs.pageInfo,
              },
            };

            setIsFetchingMoreTuyenDoc(false);

            return updateData;
          }
        },
      });
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={[6, 6]} style={{ height: "35px" }}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item name="tuyenDocId">
            <Select
              fieldNames="tuyenDocId"
              options={optionsTuyenDoc}
              style={{ fontWeight: "bold" }}
              size="small"
              placeholder="Chọn tuyến đọc"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item name="tenSo">
            <AutoComplete
              name="tenSo"
              options={
                tenSoOptions &&
                tenSoOptions.nodes?.map((item) => ({
                  label: item.tenSo,
                  value: item.tenSo,
                }))
              }
              size="small"
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
              value={tenSoField}
              onChange={(value) => setTenSoField(value)}
              placeholder="Nhập tên sổ"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item name="canBoDocId">
            <Select
              style={{ fontWeight: "bold" }}
              size="small"
              fieldNames="canBoDocId"
              options={optionsCanBoDoc}
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[6, 6]} style={{ height: "35px" }}>
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
              options={optionsKhuVuc}
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
              options={optionsKGCS}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              htmlType="submit"
              className="custom-btn-search gutter-item-btn"
              style={{ width: "100%", marginRight: 10 }}
            >
              <SearchOutlined />
              Tìm kiếm
            </Button>
            <Button
              style={{ marginLeft: "1px", width: "100%" }}
              className="custom-btn-reset gutter-item-btn"
              onClick={resetFilter}
            >
              <FilterOutlined />
              Xóa Filter
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
