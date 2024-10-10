import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import "./ModalAddPriceList.css";
import {
  CloseCircleOutlined,
  CloseCircleTwoTone,
  PlusCircleTwoTone,
  SaveOutlined,
} from "@ant-design/icons";
import { fetchApiAllPriceObj } from "../../../../../redux/slices/priceObjSlice/priceObjSlice";
import Captcha from "../../../../../components/Captcha/Captcha";
import { fetchApiAllPriceObjectSelector } from "../../../../../redux/selector";
import {
  DTTinhGia,
  CachTinhBVMT,
  KieuTinhGia,
  CachTinhPhiDuyTri,
} from "./enum.js";
import { getRequest, postRequest } from "../../../../../services";
import moment from "moment";

const priceListColumns = [
  {
    key: "danhSachDoiTuongGiaId",
    title: "STT",
    dataIndex: "danhSachDoiTuongGiaId",
    align: "center",
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
    dataIndex: "vat",
  },
  {
    key: "gia",
    title: "Giá",
    dataIndex: "gia",
  },
];

// ================================>

// const ModalAddPriceList = ({ isOpen, handleCancel, handleOk }) => {
const ModalAddPriceList = ({
  isOpenModalAddPriceList,
  setIsOpenModalAddPriceList,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [listPhiDuyTri, setListPhiDuyTri] = useState([]); // list phí duy trì
  const [priceListData, setPriceListData] = useState([]); // list chi tiết giá
  const [priceList, setPriceList] = useState([]); // list ds doi tuong chua add chi tiết giá

  const [priceSelected, setPriceSelected] = useState({
    donGia: null,
    vat: null,
    apDungKhiTieuThu: null,
  }); // chi tiết giá

  const [submit, setSubmit] = useState({
    // keyId: '',
    // ngayBatDau: null,
    // ngayKetThuc: null,
    vat: "0",
    // bvmt: '',
    // phiBvmt: '',
    // dtTinhGia: '',
    // kieuTinh: '',
    coToiThieu: false,
    tinhTu: "",
    toiThieu: "",
    // phiDuyTriId: '',
    // danhSachDoiTuongGiaId: null
  }); // submit form

  useEffect(() => {
    dispatch(fetchApiAllPriceObj());
    // phần này dùng để tạo options cho select tag đối tượng giá
    getRequest("danh-sach-doi-tuong-gia/get-all").then((res) => {
      console.log("res danh sach doi tuong gia", res.data.data);
      var result = [];
      res.data.data.map((item) => {
        result.push({
          label: item.keyId + "-" + item.moTa,
          value: item.id,
          keyId: item.keyId,
        });
      });

      setPriceList(result);
    });
    // phần này dùng để tạo options cho select tag phí duy trì
    // getRequest("/phi-duy-tri/get-all").then((res) => {
    //   console.log("res phiduytri", res.data.data);
    //   var result = [];
    //   res.data.data.map((item) => {
    //     result.push({
    //       label: item.keyId,
    //       value: item.id,
    //       donGia: item.donGia,
    //       vat: item.vat,
    //       apDungKhiTieuThu: item.apDungKhiTieuThu,
    //     });
    //   });
    //   setListPhiDuyTri(result);
    // });
    // phần này dùng để điền vào mucj cho select tag chi tiết giá
    getRequest("/chi-tiet-gia/get-all").then((res) => {
      var result = res.data.data.map((item, index) => {
        return {
          key: index,
          index: index,
          describe: item.moTaChiTiet,
          fromNumber: item.tuSo,
          toNumber: item.denSo,
          vat: item.giaCoVat,
          price: item.gia,
        };
      });
      setPriceListData(() => result);
    });
  }, []);

  useEffect(() => {
    console.log("submitChanged", submit);
  }, [submit]);

  const [coVAT, setCoVAT] = useState(false);

  // handle có VAT
  const handleOnClickCoVAT = (e) => {
    setSubmit({ ...submit, vat: 0 });
    setCoVAT((prev) => !prev);
  };
  // handle có tối thiểu
  const handleOnClickCoToiThieu = (e) => {
    setSubmit({ ...submit, coToiThieu: !submit.coToiThieu });
  };

  // handle submit form
  const handleSubmit = () => {
    console.log("handelSubmit", submit);
    if (submit.danhSachDoiTuongGiaId == null) {
      message.error("Hãy chọn đối tượng giá!");
      return;
    }
    // if (submit.ngayBatDau == null) {
    //   message.error("Hãy chọn ngày bắt đầu!");
    //   return;
    // }
    // if (submit.ngayKetThuc == null) {
    //   message.error("Hãy chọn ngày kết thúc!");
    //   return;
    // }

    // if (submit.phiDuyTriId == null) {
    //   message.error("Hãy chọn phí duy trì!");
    //   return;
    // }

    if (submit.dtTinhGia == null) {
      message.error("Hãy chọn đối tượng tính giá!");
      return;
    }

    if (submit.kieuTinh == null) {
      message.error("Hãy chọn kiểu tính!");
      return;
    }

    if (submit.bvmt == null) {
      message.error("Hãy chọn cách tính BVMT!");
      return;
    }

    if (submit.phiBvmt == null) {
      message.error("Hãy nhập phí BVMT!");
      return;
    }

    try {
      console.log("submit", {
        ...submit,
        ngayBatDau: submit.ngayBatDau.toISOString(),
        ngayKetThuc: submit.ngayKetThuc.toISOString(),
      });
      postRequest("doi-tuong-gia/add", {
        ...submit,
        ngayBatDau: submit.ngayBatDau.toISOString(),
        ngayKetThuc: submit.ngayKetThuc.toISOString(),
      }).then((res) => {
        if (res?.data?.code === "Success!") {
          message.success("Thêm mới thành công!");
          setIsOpenModalAddPriceList(false);
          setIsCaptcha(false);
        } else {
          message.error("Thêm mới thất bại!");
        }
      });
    } catch (err) {
      message.error(err);
    }
    // setSubmit(values);
  };

  return (
    <Modal
      title={"Thêm dữ liệu"}
      open={isOpenModalAddPriceList}
      onCancel={() => {
        setIsOpenModalAddPriceList(false);
        setIsCaptcha(false);
      }}
      className="popup-add-price-list"
      bodyStyle={{ height: "85vh", overflowX: "hidden" }}
      width={1100}
      footer={null}
      destroyOnClose
    >
      <Form
        className="form-price-list"
        form={form}
        name="basic"
        style={{ maxWidth: 1100 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Collapse defaultActiveKey={["1"]} style={{ marginBottom: "10px" }}>
          <Collapse.Panel header="Thông tin bảng giá" key="1">
            <div className="price-list-info">
              <Row>
                <Col span={2}>
                  <Form.Item
                    label=<p>
                      <b style={{ color: "red" }}>*</b>ĐT giá
                    </p>
                    rules={[{ required: true }]}
                  ></Form.Item>
                </Col>
                <Col span={22}>
                  <Select
                    size="middle"
                    placeholder="Chọn đối tượng tính giá"
                    style={{ width: "100%" }}
                    options={priceList}
                    onChange={(e) => {
                      priceList.find((item) => {
                        if (item.value === e) {
                          setSubmit({
                            ...submit,
                            keyId: item.keyId,
                            danhSachDoiTuongGiaId: e,
                          });
                        }
                      });
                    }}
                  />
                </Col>
              </Row>
              <br />

              <br />
              <Row gutter={[5, 5]} style={{ height: "3.8rem" }}>
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label="Có VAT:"
                        name="hasVAT"
                        style={{ marginBottom: -5, marginTop: -5 }}
                      >
                        <Checkbox
                          onClick={handleOnClickCoVAT}
                          defaultChecked={coVAT}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      {coVAT && (
                        // <Form.Item label="Thuế VAT" name="thueVAT">
                        <Row>
                          <Col span={8}>
                            <span>Thuế VAT: </span>
                          </Col>
                          <Col span={7}>
                            <InputNumber
                              min={0}
                              max={1}
                              step="0.01"
                              // size="middle"
                              style={{ width: "100%" }}
                              value={submit.vat}
                              onChange={(e) => setSubmit({ ...submit, vat: e })}
                            />
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phí BVMT:" name="feeBVMT">
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Select
                        name="feeBVMT"
                        size="middle"
                        placeholder="Chọn "
                        style={{ width: "100%" }}
                        options={CachTinhBVMT}
                        onChange={(e) => setSubmit({ ...submit, bvmt: e })}
                      />
                      <InputNumber
                        min={1}
                        size="middle"
                        style={{ width: "100%" }}
                        onChange={(e) => setSubmit({ ...submit, phiBvmt: e })}
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <br />
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Row>
                    <Col span={4}>
                      <Form.Item
                        label="ĐT tính giá:"
                        name="pricingPriceObject"
                      />
                    </Col>
                    <Col span={20}>
                      <Select
                        size="middle"
                        placeholder="Chọn đối tượng tính giá"
                        style={{ width: "100%" }}
                        options={DTTinhGia}
                        onChange={(e) => setSubmit({ ...submit, dtTinhGia: e })}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={4}>
                      <Form.Item
                        label="Kiểu tính:"
                        name="calculationType"
                      ></Form.Item>
                    </Col>
                    <Col span={20}>
                      <Select
                        name="calculationType"
                        size="middle"
                        placeholder="Chọn kiểu tính"
                        style={{ width: "100%" }}
                        options={KieuTinhGia}
                        onChange={(e) => setSubmit({ ...submit, kieuTinh: e })}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row gutter={[10, 10]}>
                <Col span={4}>
                  <Form.Item label="Có tối thiểu: ">
                    <Checkbox
                      onClick={handleOnClickCoToiThieu}
                      defaultChecked={submit.coToiThieu}
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  {submit.coToiThieu && (
                    <Row>
                      <Col span={4}>
                        <Form.Item label="Tối thiểu" />
                      </Col>
                      <Col span={20}>
                        <InputNumber
                          defaultValue={0}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            setSubmit({ ...submit, toiThieu: e })
                          }
                        />
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </div>
          </Collapse.Panel>
        </Collapse>
        <div className="price-list-table">
          <div className="table">
            <h4>Danh sách chi tiết giá</h4>
            <Table
              className=""
              size="small"
              dataSource={priceListData}
              columns={priceListColumns}
              rowKey="key"
              style={{ width: "100%" }}
              scroll={{
                y: 520,
                x: 1000,
                scrollToFirstRowOnChange: false,
              }}
            />
          </div>
          {/* ------------ẩn nút chưa xử lý -----------------*/}
          <div className="button-actions-table">
            <PlusCircleTwoTone />
            <CloseCircleTwoTone />
          </div>
        </div>

        {/* //captcha */}

        <Form.Item className="captcha-wrapper">
          <Captcha
            className="captcha-fix-price-list"
            onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
            ref={null}
          />
        </Form.Item>

        {/* //captcha */}

        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          {/* <Button
            type="primary"
            icon={<SaveOutlined />}
            disabled={!isCaptcha}
            onClick={() => {
              handleSubmit();
            }}
            className="custom-btn-reset-d"
          >
            Lưu và thêm tiếp
          </Button> */}
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
            disabled={!isCaptcha}
            style={{
              marginLeft: "10px",
            }}
            onClick={() => {
              handleSubmit();
              setIsOpenModalAddPriceList(() => false);
            }}
          >
            Lưu và đóng
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            className="custom-btn-close-d"
            onClick={() => {
              setIsOpenModalAddPriceList(false);
              setIsCaptcha(false);
            }}
            style={{
              marginLeft: "10px",
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAddPriceList;
