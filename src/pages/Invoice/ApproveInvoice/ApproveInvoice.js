import { Button, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import {
  btnClickGetFactoryIdSelector,
  getTuyenDocOption,
  gettuyendocselection,
} from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTuyendoc,
  fetchTuyendocselection,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  approveInvoice,
  fetchListInvoice,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
const ApproveInvoice = (props) => {
  const { isOpenModalDuyetHoaDon, setIsOpenModalDuyetHoaDon, setRowSelection, filterData, fetchFilterInvoiceList } = props;
  const [form] = Form.useForm();
  const tuyenDoc = useSelector(getTuyenDocOption);
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const userId = sessionStorage.getItem("userId");

  const tuyenDocData = [];

  tuyenDoc?.items?.forEach((item) => {
    item.danhMucTuyenDocResponses.forEach((tuyen) => {
      // Trích xuất giá trị "tenTuyen" và "id" và thêm vào mảng
      tuyenDocData?.push({
        id: tuyen.id,
        tenTuyen: tuyen.tenTuyen,
      });
    });
  });
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

  const createFilterQueryStringHoaDon = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMays=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMays=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMays=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(fetchTuyendoc(queryString));
  }, [nhaMayId]);

  console.log("Tuyen doc data:", tuyenDocData);
  const optionsTuyenDoc =
    tuyenDocData?.map(({ id, tenTuyen }) => ({
      label: tenTuyen,
      value: tenTuyen,
    })) || [];

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = async (values) => {
    const queryString = `${createFilterQueryStringHoaDon()}&userId=${userId}&PageSize=10&PageNumber=1`;

    values.thangTaoHoaDon = dayjs(values.thangTaoHoaDon).format("MM/YYYY");
    if (values) {
      await dispatch(approveInvoice(values));
      fetchFilterInvoiceList(filterData)
      // dispatch(fetchListInvoice(queryString));
      setIsOpenModalDuyetHoaDon(false);
      form.resetFields();
      setRowSelection(null)
    }
  };

  return (
    <Modal
      title="Duyệt đơn"
      open={isOpenModalDuyetHoaDon}
      onCancel={() => {
        setIsOpenModalDuyetHoaDon(false);
        form.resetFields();
      }}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} {...layout}>
        <Form.Item name="thangTaoHoaDon" label="Tháng Tạo Hóa Đơn">
          <DatePicker
            locale={locale}
            placeholder="Chọn Tháng"
            format="MM-YYYY"
            picker="month"
          ></DatePicker>
        </Form.Item>

        <Form.Item name="tenTuyenDoc" label="Tên Tuyến Đọc">
          <Select
            placeholder="Chọn Tuyến Đọc"
            options={optionsTuyenDoc}
          ></Select>
        </Form.Item>
        <Row justify={"end"}>
          <Form.Item>
            <Button
              className="custom-btn-close"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsOpenModalDuyetHoaDon(false);
                form.resetFields();
                setRowSelection(null)
              }}
            >
              Đóng
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<CheckOutlined />} htmlType="submit">
              Duyệt Đơn
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ApproveInvoice;
