import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  RedoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../../../../services";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

const priceListColumns = [
  {
    key: "soThuTu",
    title: "#",
    dataIndex: "soThuTu",
  },
  {
    key: "moTaChiTiet",
    title: "Mô tả CT",
    dataIndex: "moTaChiTiet",
  },
  {
    key: "tuSo",
    title: "Từ số",
    dataIndex: "tuSo",
  },
  {
    key: "denSo",
    title: "Đến số",
    dataIndex: "denSo",
  },
  {
    key: "giaCoVat",
    title: "Giá có VAT",
    dataIndex: "giaCoVat",
    render: (record) =>{
      return <p>{`₫ ${record}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}</p>
    }
  },
  {
    key: "gia",
    title: "Giá",
    dataIndex: "gia",
    render: (record) =>{
      return <p>{`₫ ${record}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}</p>
    }
  },
];

export default function ModalAddDetailPrice({
  coVAT,
  submit,
  priceListData,
  setPriceListData,
}) {
  const [isModalAddDetailPriceOpen, setIsOpenModalAddDetailPriceOpen] =
    useState(false);
  const [isModalUpdateDetailPriceOpen, setIsOpenModalUpdateDetailPriceOpen] =
    useState(false);
  const [DetailRowSelected, setDetailRowSelected] = useState(null);
  const [DetailRowKeySelected, setDetailRowKeySelected] = useState([]);
  const [formDetailPrice] = Form.useForm();
  const [formUpdateDetailPrice] = Form.useForm();
  // caculate price belong to coVAT
  const [price, setPrice] = useState(0);
  function caculatePrice(giaCoVat) {
    const price = coVAT ? priceListData?.vat : giaCoVat;
    setPrice(price);
  }

  const calculatePrice = (value) => {
    const price = value / (1 + submit?.vat);
    formDetailPrice.setFieldsValue({ gia: price });
    formUpdateDetailPrice.setFieldsValue({ gia: price });
  };
  function handleAddDetailPrice() {
    formDetailPrice
      .validateFields()
      .then((values) => {
        setPriceListData([
          ...priceListData,
          {
            key: priceListData.length + 1,
            index: priceListData.length + 1,
            moTaChiTiet: values.moTaChiTiet,
            tuSo: values.tuSo,
            denSo: values.denSo,
            giaCoVat: values.giaCoVat,
            gia: values.gia,
            soThuTu: values.thuBac,
            mota: values.moTaChiTiet,
          },
        ]);
        formDetailPrice.resetFields();
        setIsOpenModalAddDetailPriceOpen(false);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  }

  function handleUpdateDetailPrice() {
    const newData = priceListData.map((item) => {
      if (item.key === DetailRowSelected?.key) {
        return {
          ...item,
          moTaChiTiet: formUpdateDetailPrice.getFieldValue("moTaChiTiet"),
          tuSo: formUpdateDetailPrice.getFieldValue("tuSo"),
          denSo: formUpdateDetailPrice.getFieldValue("denSo"),
          giaCoVat: formUpdateDetailPrice.getFieldValue("giaCoVat"),
          gia: formUpdateDetailPrice.getFieldValue("gia"),
          soThuTu: formUpdateDetailPrice.getFieldValue("thuBac"),
        };
      }
      return item;
    });
    console.log("itemup", newData);
    setPriceListData(() => newData);
    setIsOpenModalUpdateDetailPriceOpen(false);
  }
  useEffect(() => {
    if (formDetailPrice && priceListData) {
      const defaultThubacValue = priceListData.length + 1;
      formDetailPrice.setFieldsValue({ thuBac: defaultThubacValue });
    }
  }, [formDetailPrice, priceListData]);

  useEffect(() => {
    if (DetailRowSelected) {
      formUpdateDetailPrice.setFieldsValue({
        moTaChiTiet: DetailRowSelected?.moTaChiTiet,
        tuSo: DetailRowSelected?.tuSo,
        denSo: DetailRowSelected?.denSo,
        giaCoVat: DetailRowSelected?.giaCoVat,
        gia: DetailRowSelected?.gia,
        thuBac: DetailRowSelected?.soThuTu,
      });
    }
  }, [DetailRowSelected]);

  return (
    <Row gutter={[10, 10]}>
      <Col span={23}>
        <Table
          size="small"
          dataSource={priceListData}
          columns={priceListColumns}
          rowKey="soThuTu"
          scroll={{
            x: 1000,
            scrollToFirstRowOnChange: false,
          }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: DetailRowKeySelected,
            onSelect: (record, selected, selectedRows, nativeEvent) => {
              setDetailRowSelected(record);
              setDetailRowKeySelected([record.soThuTu]);
            },
            columnTitle: () => {
              return (
                <Tooltip title="Bỏ chọn hàng hiện tại.">
                  <RedoOutlined
                    className="icon-reset-rad-btn"
                    onClick={() => {
                      setDetailRowSelected(null);
                      setDetailRowKeySelected([]);
                    }}
                  />
                </Tooltip>
              );
            },
          }}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            showSizeChanger: false,
            total: priceListData.length,
            defaultCurrent: 1,
          }}
        />
      </Col>
      <Col span={1}>
        <div
          style={{
            userSelect: "none",
          }}
        >
          <PlusCircleTwoTone
            onClick={() => {
              setIsOpenModalAddDetailPriceOpen(true);
            }}
          />
          <br />
          <CloseCircleTwoTone
            onClick={() => {
              const newData = priceListData.filter(
                (item) => item.key !== DetailRowSelected?.key
              );
              setPriceListData(newData);
            }}
          />
          <br />
          <EditTwoTone
            onClick={() => {
              if (DetailRowSelected) {
                setIsOpenModalUpdateDetailPriceOpen(true);
              }
            }}
          />
        </div>
        <Modal
          title="Thêm thông tin"
          open={isModalAddDetailPriceOpen}
          onOk={handleAddDetailPrice}
          onCancel={() => setIsOpenModalAddDetailPriceOpen(false)}
        >
          <Form
            form={formDetailPrice}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <Form.Item
              label="Mô tả chi tiết"
              name="moTaChiTiet"
              rules={[
                {
                  required: true,
                  message: "Mô tả chi tiết không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Từ số" name="tuSo">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Đến số" name="denSo">
              <InputNumber defaultValue={"-1"} />
            </Form.Item>
            <Form.Item label="Giá có VAT" name="giaCoVat">
              <InputNumber
                 formatter={(value) => `₫ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
               onChange={(value) => {
                  setPrice(value);
                  calculatePrice(value);
                }}
              />
            </Form.Item>
            <Form.Item label="Giá" name="gia">
              <InputNumber
                formatter={(value) => `₫ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
                defaultValue={price}
              disabled
              />
            </Form.Item>
            <Form.Item label="Thứ bậc" name="thuBac">
              <InputNumber disabled />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
              <Row>
                <Col span={24}>
                  <p style={{ textAlign: "center", color: "#999" }}>
                    Ghi chú: Nếu là thứ bậc cuối cùng thì "đến số" phải nhập là
                    -1.
                  </p>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Cập nhật thông tin"
          open={isModalUpdateDetailPriceOpen}
          onOk={handleUpdateDetailPrice}
          onCancel={() => setIsOpenModalUpdateDetailPriceOpen(false)}
        >
          <Form
            form={formUpdateDetailPrice}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Form.Item label="Mô tả chi tiết" name="moTaChiTiet">
              <Input />
            </Form.Item>
            <Form.Item label="Từ số" name="tuSo">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Đến số" name="denSo">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Giá có VAT" name="giaCoVat">
              <InputNumber
                formatter={(value) => `₫ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
                onChange={(value) => {
                  setPrice(value);
                  calculatePrice(value);
                }}
               
              />
            </Form.Item>
            <Form.Item
               formatter={(value) => `₫ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
              label="Giá"
              name="gia"
              initialValue={price}
            >
              <InputNumber
                disabled
                formatter={(value) =>
                  `₫ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ",")
                }
                parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
                defaultValue={price}
              />
            </Form.Item>
            <Form.Item label="Thứ bậc" name="thuBac">
              <InputNumber disabled />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}
