import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { fetchApiAllReading } from "../../../redux/slices/readingSlice/readingSlice";
import {
  btnClickGetFactoryIdSelector,
  getCanBoDoc,
  gettuyendocAddselection,
} from "../../../redux/selector";
import readingIndexSlice, {
  fetchApiFilterSoDocBinhThuong,
  fetchTuyendocAddselection,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { useQuery } from "@apollo/client";
import { LOAD_TUYEN_DOC_BY_NHA_MAY_ID } from "../../../graphql/reading/queries";
import { fetchMaSoTuIdTuyenDoc } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { gettuyendocselection } from "../../../redux/selector";
import { fetchTuyendocselection } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import {
  setClickFilter,
  setCurrentPage,
  setDataFilter,
  setFilter,
} from "../../../redux/slices/currentPageSlice/currentPageSlice";

const pageSizeTuyenDoc = 10;

export const SearchForm = ({ canBoDocs }) => {
  const [formSearchTaoSoThuong] = Form.useForm();
  const [isFetchingMoreTuyenDoc, setIsFetchingMoreTuyenDoc] = useState(false);
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const canBoDocSelector = useSelector(getCanBoDoc);
  const dispatch = useDispatch();

  // get from redux
  // const listReading = useSelector(fetchApiAllReadingSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const gettuyendocoption = useSelector(gettuyendocAddselection);

  console.log("gettuyendocoption ->", gettuyendocoption);
  console.log("nha may id ->", nhaMayId);

  useEffect(() => {
    if (nhaMayId) {
      dispatch(fetchTuyendocAddselection(nhaMayId));
    }
  }, [nhaMayId]);

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

  // set default fields
  useEffect(() => {
    formSearchTaoSoThuong.setFieldsValue({ monthYear: dayjs(new Date()) });
  }, [formSearchTaoSoThuong]);

  // useEffect(() => {
  //   formSearchTaoSoThuong.setFieldsValue({
  //     tuyenDocId: tuyenDocs?.GetTuyenDocs?.nodes[0]?.id,
  //   });
  // }, [formSearchTaoSoThuong, tuyenDocs?.GetTuyenDocs?.nodes]);

  // handle get all (tuyến đọc)
  useEffect(() => {
    dispatch(fetchApiAllReading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle submit form (Tìm kiếm)
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values) {
      dispatch(
        fetchApiFilterSoDocBinhThuong({
          values: values,
          nhaMayId: nhaMayId,
        })
      );
      dispatch(readingIndexSlice.actions.setOptionThangNam(values.monthYear));
    }
  };

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 24,
    },
  };

  // handle fetch more data -> tuyến đọc theo nhà máy
  //

  // handle change tuyến đọc -> get mã tuyến đọc
  const handleChangeTuyenDocGetMaTuyenDoc = (value) => {
    console.log("val tuyen doc ->", value);
    dispatch(fetchMaSoTuIdTuyenDoc(value));
  };

  return (
    <Form
      {...layout}
      form={formSearchTaoSoThuong}
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={24}>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item
            name="monthYear"
            label="Tháng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              name="monthYear"
              allowClear
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              locale={locale}
              format={"MM-YYYY"}
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="nguoiQuanLyId" label="Cán bộ">
            <Select
              // defaultValue="--Chọn cán bộ--"
              placeholder="Chọn cán bộ dọc"
              fieldNames="nguoiQuanLyId"
              style={{
                width: "100%",
              }}
              options={
                canBoDocSelector?.length <= 0
                  ? []
                  : canBoDocSelector?.map((_nameManager) => ({
                      label: _nameManager.normalizedUserName,
                      value: _nameManager.id,
                    }))
              }
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item
            name="tuyenDocId"
            label="Tuyến đọc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              fieldNames="tuyenDocId"
              options={
                gettuyendocoption?.length > 0
                  ? gettuyendocoption?.map((danhMucTuyenDocResponses) => ({
                      label: danhMucTuyenDocResponses?.tenTuyen,
                      value: danhMucTuyenDocResponses?.id,
                    }))
                  : []
              }
              // onPopupScroll={handleOnPopupScrollTuyenDoc}
              placeholder="Chọn tuyến đọc"
              onChange={handleChangeTuyenDocGetMaTuyenDoc}
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="status" label="Phạm vi" hidden>
            <Select
              // defaultValue="--Chọn phạm vi--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="loaiKhachHang" label="Loại KH">
            <Select
              fieldNames="loaiKhachHang"
              options={[
                { value: "CaNhan", label: "1 - Cá nhân" },
                { value: "DonViToChuc", label: "2 - Đơn vị, tổ chức" },
              ]}
              placeholder="Chọn loại khách hàng"
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="keyIdHopDong" label="Số hợp đồng">
            <Input name="keyIdHopDong" placeholder="Nhập số hợp đồng" />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          {/*<Form.Item name="loaiDH" label="Loại ĐH">
            <Select
              // defaultValue="--Chọn loại ĐH--"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "",
                  label: "Tất cả",
                },
                {
                  value: 2,
                  label: "Đồng hồ dịch vụ",
                },
                {
                  value: 3,
                  label: "Đồng hồ block",
                },
              ]}
              placeholder="Chọn loại đồng hồ"
            />
            </Form.Item>*/}
        </Col>
        <Col sx={24} sm={24} md={12} lg={6} style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button
                htmlType="submit"
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <Button
                onClick={() => {
                  formSearchTaoSoThuong.resetFields();
                }}
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm mới
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
