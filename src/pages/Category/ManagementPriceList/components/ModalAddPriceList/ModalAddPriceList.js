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
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  CloseCircleOutlined,
  RedoOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { fetchApiAllPriceObj } from "../../../../../redux/slices/priceObjSlice/priceObjSlice";
import Captcha from "../../../../../components/Captcha/Captcha";
import { DTTinhGia, CachTinhBVMT, KieuTinhGia } from "./enum.js";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../../services";
import moment from "moment";
import ModalAddDetailPrice from "./ModalAddDetailPrice";
import { btnClickGetFactoryIdSelector } from "../../../../../redux/selector";
import { fetchApiAllPriceObject } from "../../../../../redux/slices/priceObjectSlice/priceObjectSlice.js";

// ================================>

const ModalAddPriceList = ({
  isOpenModalAddPriceList,
  setIsOpenModalAddPriceList,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const dispatch = useDispatch();
  const [listPhiDuyTri, setListPhiDuyTri] = useState([]); // list phí duy trì
  const [priceList, setPriceList] = useState([]); // list ds doi tuong chua add chi tiết giá
  const [priceListData, setPriceListData] = useState([]);

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
    phiBvmt: 0,
    // dtTinhGia: '',
    // kieuTinh: '',
    coToiThieu: false,
    tinhTu: "",
    toiThieu: "",
    giaPhiDuyTri: 0,
    phanTramVATPhiDuyTri: 0,
    tongTienPhiDuyTriSauVAT: 0,
    // phiDuyTriId: '',
    // danhSachDoiTuongGiaId: null
  }); // submit form

  const calculateTotalAfterVAT = (giaPhiDuyTri, tongTienPhiDuyTriSauVAT) => {
    const total =
      ((tongTienPhiDuyTriSauVAT - giaPhiDuyTri) / giaPhiDuyTri) * 100;
    return total;
  };

  const handleGiaPhiDuyTriChange = (value) => {
    const newSubmit = { ...submit, giaPhiDuyTri: value };
    const vat = calculateTotalAfterVAT(
      newSubmit.giaPhiDuyTri,
      newSubmit.tongTienPhiDuyTriSauVAT
    );
    setSubmit({ ...newSubmit, phanTramVATPhiDuyTri: vat });
  };

  const handleVATChange = (value) => {
    const newSubmit = { ...submit, tongTienPhiDuyTriSauVAT: value };
    const vat = calculateTotalAfterVAT(
      newSubmit.giaPhiDuyTri,
      newSubmit.tongTienPhiDuyTriSauVAT
    );
    setSubmit({ ...newSubmit, phanTramVATPhiDuyTri: vat });
  };

  const createFilterDate = (tuNgay, denNgay) => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}&TuThang=${tuNgay}&DenThang=${denNgay}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    dispatch(fetchApiAllPriceObj());
    const nhaMayIds = createFilterDate();
    getRequest(`danh-sach-doi-tuong-gia/get-all?${nhaMayIds}`).then((res) => {
      console.log("res danh sach doi tuong gia", res.data);
      var result = [];
      res.data.data.map((item) => {
        result.push({
          label: `${item?.kyHieu}-${item?.moTa}`,
          value: item?.id,
          keyId: item?.keyId,
        });
      });
      console.log("result", result);
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
  }, [nhaMayId]);

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

  const handleOnClickCoPhiDuyTri = (e) => {
    setSubmit({ ...submit, coPhiDuyTri: !submit.coPhiDuyTri });
    form.resetFields();
  };

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
  const handleSubmit = async () => {
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
        chiTietGiaModel: priceListData,
      });
      await postRequest(
        `/doi-tuong-gia/add-doi-tuong-gia-and-chi-tiet-gia?NhaMayIds=${nhaMayId}`,
        {
          doiTuongGiaModel: {
            ...submit,
          },
          chiTietGiaModel: priceListData,
        }
      ).then((res) => {
        console.log("Response", res);
        if (res?.status === 200) {
          setIsOpenModalAddPriceList(false);
          setIsCaptcha(false);
          setPriceListData([]);
          message.success("Thêm mới thành công!");
        }
      });
    } catch (err) {
      message.error(err);
    }

    const queryString = createFilterQueryString();
    dispatch(fetchApiAllPriceObject(queryString));
    // setSubmit(values);
  };
  const handleCalculateBeforeVatFromVAT = (value) => {
    const tongTienPhiDuyTriSauVAT = form1.getFieldValue(
      "tongTienPhiDuyTriSauVAT"
    );
    const giaPhiDuyTri = tongTienPhiDuyTriSauVAT / ((100 + value) / 100);
    setSubmit({ ...submit, giaPhiDuyTri: giaPhiDuyTri });
    form1.setFieldsValue({ giaPhiDuyTri: giaPhiDuyTri });
  };
  const handleCalculateBeforeVatFromPhiDuyTri = (value) => {
    const vat = form1.getFieldValue("phanTramVATPhiDuyTri");
    const giaPhiDuyTri = value / ((100 + vat) / 100);
    setSubmit({ ...submit, giaPhiDuyTri: giaPhiDuyTri });
    form1.setFieldsValue({ giaPhiDuyTri: giaPhiDuyTri });
  };
  return (
    <Modal
      title={"Thêm dữ liệu"}
      open={isOpenModalAddPriceList}
      onCancel={() => {
        setIsOpenModalAddPriceList(false);
        setIsCaptcha(false);
        setPriceListData([]);
        form1.resetFields()
      }}
      className="popup-add-price-list"
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
            <Form form={form1}>
              <div className="price-list-info">
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <Form.Item
                      label=<p>
                        <b style={{ color: "red" }}>*</b>ĐT giá
                      </p>
                      rules={[{ required: true }]}
                    >
                      <Select
                        size="middle"
                        placeholder="Chọn đối tượng giá"
                        style={{ width: "100%" }}
                        options={priceList}
                        onChange={(e) => {
                          priceList.find((item) => {
                            if (item.value === e) {
                              console.log("item", item);
                              setSubmit({
                                ...submit,
                                keyId: item.keyId,
                                danhSachDoiTuongGiaId: e,
                              });
                            }
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[10, 10]}>
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
                                onChange={(e) =>
                                  setSubmit({ ...submit, vat: e })
                                }
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
                          min={0}
                          max={1}
                          step="0.01"
                          size="middle"
                          style={{ width: "100%" }}
                          value={submit.bvmt !== 2 ? 0 : submit.phiBvmt}
                          onChange={(e) => {
                            setSubmit({
                              ...submit,
                              phiBvmt: submit.bvmt !== 1 ? 0 : e,
                            });
                          }}
                          disabled={submit.bvmt !== 2}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <Form.Item label="ĐT tính giá:" name="pricingPriceObject">
                      <Select
                        size="middle"
                        placeholder="Chọn đối tượng tính giá"
                        style={{ width: "100%" }}
                        options={DTTinhGia}
                        onChange={(e) => setSubmit({ ...submit, dtTinhGia: e })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Kiểu tính:" name="calculationType">
                      <Select
                        name="calculationType"
                        size="middle"
                        placeholder="Chọn kiểu tính"
                        style={{ width: "100%" }}
                        options={KieuTinhGia}
                        onChange={(e) => setSubmit({ ...submit, kieuTinh: e })}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={4}>
                    <Form.Item label="Có tối thiểu: " hidden>
                      <Checkbox
                        onClick={handleOnClickCoToiThieu}
                        defaultChecked={submit.coToiThieu}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    {submit.coToiThieu && (
                      <Form.Item label="Tối thiểu" hidden>
                        <InputNumber
                          defaultValue={0}
                          min={0}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            setSubmit({ ...submit, toiThieu: e })
                          }
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                {/* Phí Duy Trì */}
                <Row gutter={[10, 10]}>
                  <Col span={3}>
                    <Form.Item label="Có phí duy trì: ">
                      <Checkbox
                        onClick={handleOnClickCoPhiDuyTri}
                        defaultChecked={submit.coPhiDuyTri}
                      />
                    </Form.Item>
                  </Col>

                  {submit.coPhiDuyTri && (
                    <>
                      <Col span={5}>
                        <Form.Item label="Giá phí duy trì" name="giaPhiDuyTri">
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="Tiêu thụ tối đa">
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setSubmit({
                                ...submit,
                                tieuThuMaxTinhPhiDuyTri: e,
                              })
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item label="% VAT" name="phanTramVATPhiDuyTri" initialValue={0}>
                          <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            value={submit.phanTramVATPhiDuyTri}
                            onChange={(value) => {
                              handleCalculateBeforeVatFromVAT(value);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item label="Tổng tiền sau VAT" name="tongTienPhiDuyTriSauVAT">
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            onChange={(value) => {
                              handleCalculateBeforeVatFromPhiDuyTri(value);
                            }}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="Ưu tiên phí duy trì: ">
                          <Checkbox
                            onChange={(e) =>
                              setSubmit({
                                ...submit,
                                uuTienPhiDuyTri: !submit.uuTienPhiDuyTri,
                              })
                            }
                            defaultChecked={submit.uuTienPhiDuyTri}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            </Form>
          </Collapse.Panel>
        </Collapse>
        <h4>Danh sách chi tiết giá</h4>
        <ModalAddDetailPrice
          cocoVAT={coVAT}
          submit={submit}
          priceListData={priceListData}
          setPriceListData={setPriceListData}
        />

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
              form1.resetFields()
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
