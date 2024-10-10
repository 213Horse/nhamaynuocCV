import {
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
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import { GetUserQuery } from "../../graphql/users/usersQuery";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllReadingSelector,
} from "../../redux/selector";
import { fetchApiAllReading } from "../../redux/slices/readingSlice/readingSlice";
import {
  fetchReadingIndexTotalFilter,
  fetchReadingIndexTotalFilterBlock,
} from "../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";
import readingIndexTotalSlice from "../../redux/slices/readingIndexTotalSlice/readingIndexTotalSlice";

export const FormSearchWriteModalIndexTong = ({
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

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  const dispatch = useDispatch();

  const listReading = useSelector(fetchApiAllReadingSelector);

  const { data: users } = useQuery(GetUserQuery);

  // set default fields
  useEffect(() => {
    form.setFieldsValue({ monthYear: dayjs(new Date()) });
  }, [form]);

  // handle get all (tuyến đọc)
  useEffect(() => {
    dispatch(fetchApiAllReading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    if (values) {
      dispatch(fetchReadingIndexTotalFilter({ ...values, nhaMayId }));
      dispatch(
        readingIndexTotalSlice.actions.btnClickFilter({
          ...values,
          nhaMayId,
          pageNumber: 1,
        })
      );
    }
  };

  const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 22,
    },
  };

  // const optionsKGCS = listKGCS?.map((item) => ({
  //   label: item.moTa,
  //   value: item.id,
  // }));

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

  const handleChangeTrangThai = (values) => {
    console.log("Select values", values);
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
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
      <Row gutter={24}>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="monthYear" label="Chọn tháng" {...rules}>
            <DatePicker
              allowClear
              name="monthYear"
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="nguoiQuanLyId" label="Cán bộ đọc">
            <Select
              fieldNames="nguoiQuanLyId"
              options={
                canBoDocs?.length <= 0
                  ? []
                  : canBoDocs?.map((_nameManager) => ({
                      label: _nameManager.normalizedUserName,
                      value: _nameManager.id,
                    }))
              }
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
        {/* <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item name="tuyenDocId" label="Tuyến đọc">
              <Select
                fieldNames="tuyenDocId"
                options={
                  listReading?.length > 0
                    ? listReading?.map((__reding) => ({
                        label: __reding.tenTuyen,
                        value: __reding.id,
                      }))
                    : []
                }
                placeholder="Chọn tuyến đọc"
              />
            </Form.Item>
          </Col> */}
        <Col span={6} xs={24} sm={12} lg={7}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button
                htmlType="submit"
                className="custom-btn-search gutter-item-btn"
              >
                <SearchOutlined />
                Tìm kiếm
              </Button>
              <Button
                onClick={() => {
                  dispatch(
                    readingIndexTotalSlice.actions.btnClickClearFilter()
                  );
                  form.resetFields();
                }}
                className="custom-btn-search gutter-item-btn"
              >
                <SearchOutlined />
                Tìm mới
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        {/* <Col span={8} xs={24} sm={12} lg={4}>
            <Form.Item name="status" label="Trạng thái">
              <Select
                style={{
                  width: "100%",
                }}
                fieldNames="status"
                options={optionsTrangThai}
                onChange={handleChangeTrangThai}
              />
            </Form.Item>
          </Col> */}
        {/* <Col span={6} xs={24} sm={12} lg={6}>
            <Form.Item name="ky" label="Kỳ GSC">
              <Select
                style={{
                  width: "100%",
                }}
                fieldNames="ky"
                options={optionsKGCS}
              />
            </Form.Item>
          </Col> */}
        {/* <Col span={6} xs={24} sm={12} lg={7}>
            <Form.Item name="tenSo" label="Tên sổ">
              <Input name="tenSo" placeholder="Nhập tên sổ cần tìm" />
            </Form.Item>
          </Col> */}
        {/* <Col span={6} xs={24} sm={12} lg={4}>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Space size="small">
                <Button
                  htmlType="submit"
                  className="custom-btn-search gutter-item-btn"
                >
                  <SearchOutlined />
                  Tìm kiếm
                </Button>
                <Button
                  onClick={() => {
                    dispatch(
                      readingIndexTotalSlice.actions.btnClickClearFilter()
                    );
                    form.resetFields();
                  }}
                  className="custom-btn-search gutter-item-btn"
                >
                  <SearchOutlined />
                  Tìm mới
                </Button>
              </Space>
            </div>
          </Col> */}
      </Row>
    </Form>
  );
};
