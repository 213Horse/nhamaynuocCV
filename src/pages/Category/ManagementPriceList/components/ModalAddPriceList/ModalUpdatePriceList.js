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
import dayjs from "dayjs";
import {
  CloseCircleOutlined,
  RedoOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { fetchApiAllPriceObj } from "../../../../../redux/slices/priceObjSlice/priceObjSlice";
import Captcha from "../../../../../components/Captcha/Captcha";
import { DTTinhGia, CachTinhBVMT, KieuTinhGia } from "./enum.js";
import { getRequest, postRequest, putRequest } from "../../../../../services";
import moment from "moment";
import ModalUpdateDetailPrice from "./ModalUpdateDetailPrice";
import { btnClickGetFactoryIdSelector } from "../../../../../redux/selector";
import { fetchApiAllPriceObject } from "../../../../../redux/slices/priceObjectSlice/priceObjectSlice.js";

// ================================>

const ModalEditPriceList = ({
  setIsOpenModalEditPriceList,
  isOpenModalEditPriceList,
  tabListPO,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const [vatValue, setVatValue] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [listPhiDuyTri, setListPhiDuyTri] = useState([]); // list phí duy trì
  const [priceList, setPriceList] = useState([]); // list ds doi tuong chua add chi tiết giá
  const [priceListData, setPriceListData] = useState([]);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
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


  const [priceSelected, setPriceSelected] = useState({
    donGia: null,
    vat: null,
    apDungKhiTieuThu: null,
  }); // chi tiết giá

  const [submit, setSubmit] = useState({
    giaPhiDuyTri: 0,
    phanTramVATPhiDuyTri: 0,
    tongTienPhiDuyTriSauVAT: 0,
    uuTienPhiDuyTri: false,
    coPhiDuyTri: false,
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
    setVatValue(value);
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
  }, [nhaMayId]);

  useEffect(() => {
    console.log("submitChanged", submit);
    localStorage.setItem(
      "danhSachDoiTuongGiaId",
      submit?.danhSachDoiTuongGiaId || ""
    );
  }, [submit]);
  console.log("tablistpo", tabListPO);
  useEffect(() => {
    // setSubmit
    if (tabListPO) {
      setSubmit({
        danhSachDoiTuongGiaId: tabListPO.listPriceObjectId,
        vat: tabListPO.vat,
        bvmt: tabListPO.bvmt,
        phiBvmt: tabListPO.phiBvmt,
        dtTinhGia: tabListPO.dtTinhGia,
        kieuTinh: tabListPO.kieuTinh,
        coToiThieu: tabListPO.coToiThieu,
        toiThieu: tabListPO.toiThieu,
        doiTuongGiaId: tabListPO.id,
        coPhiDuyTri: tabListPO.coPhiDuyTri,
        uuTienPhiDuyTri: tabListPO.uuTienPhiDuyTri,
        giaPhiDuyTri: tabListPO.giaPhiDuyTri,
        tieuThuMaxTinhPhiDuyTri: tabListPO.tieuThuMaxTinhPhiDuyTri,
        phanTramVATPhiDuyTri: tabListPO.phanTramVATPhiDuyTri,
        tongTienPhiDuyTriSauVAT: tabListPO.tongTienPhiDuyTriSauVAT,
      });
      form.setFieldsValue({
        danhSachDoiTuongGiaId: tabListPO.listPriceObjectId,
        vat: tabListPO.vat,
        bvmt: tabListPO.bvmt,
        phiBvmt: tabListPO.phiBvmt,
        dtTinhGia: tabListPO.dtTinhGia,
        kieuTinh: tabListPO.kieuTinh,
        coToiThieu: tabListPO.coToiThieu,
        toiThieu: tabListPO.toiThieu,
        coPhiDuyTri: tabListPO.coPhiDuyTri,
        uuTienPhiDuyTri: tabListPO.uuTienPhiDuyTri,
        giaPhiDuyTri: tabListPO.giaPhiDuyTri,
        tieuThuMaxTinhPhiDuyTri: tabListPO.tieuThuMaxTinhPhiDuyTri,
        phanTramVATPhiDuyTri: tabListPO.phanTramVATPhiDuyTri,
        tongTienPhiDuyTriSauVAT: tabListPO.tongTienPhiDuyTriSauVAT,
      });
    }
    if (tabListPO?.vat > 0) {
      setCoVAT(true);
    } else {
      setCoVAT(false);
    }

    getRequest(
      `/chi-tiet-gia/get-by-doi-tuong-gia?doiTuongGiaId=${tabListPO?.id}`
    ).then((res) => {
      var result = res.data.data.map((item, index) => {
        return {
          key: index + 1,
          index: index + 1,
          moTaChiTiet: item.moTaChiTiet,
          tuSo: item.tuSo,
          denSo: item.denSo,
          giaCoVat: item.giaCoVat,
          gia: item.gia,
          soThuTu: item.thuBac,
          id: item.id,
          doiTuongGiaId: item.doiTuongGiaId,
          danhSachDoiTuongGiaId: item.danhSachDoiTuongGiaId,
          // soThuTu: item.soThuTu,
        };
      });
      setPriceListData(() => result);
    });
  }, [tabListPO]);



  const [coVAT, setCoVAT] = useState(false);

  // handle có VAT
  const handleOnClickCoVAT = (e) => {
    setSubmit({ ...submit, vat: 0 });
    setCoVAT((prev) => !prev);
  };

  const handleOnClickCoToiThieu = (e) => {
    setSubmit({ ...submit, coToiThieu: !submit.coToiThieu });
  };
  const handleOnClickuuTienPhiDuyTri = (e) => {
    setSubmit({ ...submit, uuTienPhiDuyTri: !submit.uuTienPhiDuyTri });
    if (submit.uuTienPhiDuyTri) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnClickPhiDuyTri = (e) => {
    setSubmit({ ...submit, coPhiDuyTri: !submit.coPhiDuyTri });
    if (submit.coPhiDuyTri) {
      return true;
    } else {
      return false;
    }
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

  // handle submit form
  const handleSubmit = async () => {
    console.log("priceList", priceListData);
    console.log("handelSubmit", submit);
    if (submit.danhSachDoiTuongGiaId == null) {
      message.error("Hãy chọn đối tượng giá!");
      return;
    }

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
      await putRequest("/doi-tuong-gia/update-doi-tuong-gia-and-chi-tiet-gia", {
        doiTuongGia: {
          id: tabListPO.id,
          vat: submit.vat,
          bvmt: submit.bvmt,
          phiBvmt: submit.phiBvmt,
          dtTinhGia: submit.dtTinhGia,
          kieuTinh: submit.kieuTinh,
          coToiThieu: submit.coToiThieu,
          toiThieu: submit.toiThieu,
          danhSachDoiTuongGiaId: submit.danhSachDoiTuongGiaId,
          coPhiDuyTri: submit.coPhiDuyTri,
          uuTienPhiDuyTri: submit.uuTienPhiDuyTri,
          giaPhiDuyTri: form.getFieldValue("giaPhiDuyTri"),
          tieuThuMaxTinhPhiDuyTri: form.getFieldValue(
            "tieuThuMaxTinhPhiDuyTri"
          ),
          phanTramVATPhiDuyTri: form.getFieldValue("phanTramVATPhiDuyTri"),
          tongTienPhiDuyTriSauVAT: form.getFieldValue(
            "tongTienPhiDuyTriSauVAT"
          ),
        },
        chiTietGias: priceListData,
        // [ {
        //   id:priceListData[0].id,
        //   moTaChiTiet:priceListData[0].moTaChiTiet,
        //   tuSo:priceListData[0].tuSo,
        //   denSo:priceListData[0].denSo,
        //   giaCoVat:priceListData[0].giaCoVat,
        //   gia:priceListData[0].gia,
        //   soThuTu:priceListData[0].soThuTu,

        // }]
      }).then((res) => {
        console.log("res", res);
        if (res?.status === 200) {
          message.success("Sửa thành công!");
          setIsOpenModalEditPriceList(false);
          setIsCaptcha(false);
        }
      });
    } catch (err) {
      message.error(err);
    }
    const queryString = createFilterQueryString();
    dispatch(fetchApiAllPriceObject(queryString));
  };

  const handleCalculateBeforeVatFromVAT = (value) => {
    const tongTienPhiDuyTriSauVAT = form.getFieldValue(
      "tongTienPhiDuyTriSauVAT"
    );
    const giaPhiDuyTri = tongTienPhiDuyTriSauVAT / ((100 + value) / 100);
    setSubmit({ ...submit, giaPhiDuyTri: giaPhiDuyTri });
    form.setFieldsValue({ giaPhiDuyTri: giaPhiDuyTri });
  };
  const handleCalculateBeforeVatFromPhiDuyTri = (value) => {
    const vat = form.getFieldValue("phanTramVATPhiDuyTri");
    const giaPhiDuyTri = value / ((100 + vat) / 100);
    setSubmit({ ...submit, giaPhiDuyTri: giaPhiDuyTri });
    form.setFieldsValue({ giaPhiDuyTri: giaPhiDuyTri });
  };

  return (
    <Modal
      title={"Sửa dữ liệu"}
      open={isOpenModalEditPriceList}
      onCancel={() => {
        setIsOpenModalEditPriceList(false);
        setIsCaptcha(false);
      }}
      className="popup-add-price-list"
      width={1100}
      footer={null}
      destroyOnClose
    >
      <Form
        className="form-price-list"
        name="basic"
        style={{ maxWidth: 1100 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Collapse defaultActiveKey={["1"]} style={{ marginBottom: "10px" }}>
          <Collapse.Panel header="Thông tin bảng giá" key="1">
            <Form form={form}>
              <div className="price-list-info">
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <Form.Item
                      label="ĐT giá"
                      name="danhSachDoiTuongGiaId"
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
                    <Row gutter={[10, 10]}>
                      <Col span={12}>
                        <Form.Item label="Phí BVMT:" name="bvmt">
                          <Select
                            size="middle"
                            placeholder="Chọn "
                            style={{ width: "100%" }}
                            options={CachTinhBVMT}
                            onChange={(e) => setSubmit({ ...submit, bvmt: e })}
                          />
                          {/* <InputNumber
                              min={0}
                              max={1}
                              step="0.01"
                              size="middle"
                              style={{ width: "100%" }}
                              onChange={(e) => setSubmit({ ...submit, phiBvmt: e })}
                              
                            /> */}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="phiBvmt">
                          <InputNumber
                            min={0}
                            max={1}
                            step="0.01"
                            size="middle"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setSubmit({ ...submit, phiBvmt: e })
                            }
                            disabled={submit.bvmt !== 2}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <Form.Item label="ĐT tính giá:" name="dtTinhGia">
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
                    <Form.Item label="Kiểu tính:" name="kieuTinh">
                      <Select
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
                    <Form.Item label="Có tối thiểu: " name="coToiThieu" hidden>
                      <Checkbox
                        onClick={handleOnClickCoToiThieu}
                        defaultChecked={submit.coToiThieu}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    {submit.coToiThieu && (
                      <Form.Item label="Tối thiểu" name="toiThieu" hidden>
                        <InputNumber
                          style={{ width: "100%" }}
                          min={0}
                          onChange={(e) =>
                            setSubmit({ ...submit, toiThieu: e })
                          }
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={3}>
                    <Form.Item label="Có phí duy trì: " name="coPhiDuyTri">
                    <Checkbox
                              onClick={handleOnClickPhiDuyTri}
                              defaultChecked={submit.coPhiDuyTri}
                            />
                    </Form.Item>
                  </Col>

                  {submit.coPhiDuyTri && (
                    <>
                      <Col span={5}>
                        <Form.Item label="Giá phí duy trì" name="giaPhiDuyTri">
                          <InputNumber
                            disabled
                            defaultValue={0}
                            min={0}
                            style={{ width: "100%" }}
                            // onChange={handleGiaPhiDuyTriChange}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Tiêu thụ tối đa"
                          name="tieuThuMaxTinhPhiDuyTri"
                        >
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
                        <Form.Item label="% VAT" name="phanTramVATPhiDuyTri">
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            // disabled
                            style={{ width: "100%" }}
                            value={submit.phanTramVATPhiDuyTri}
                            onChange={(value) => {
                              handleCalculateBeforeVatFromVAT(value);
                              setSubmit({
                                ...submit,
                                phanTramVATPhiDuyTri: value,
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Tổng tiền sau VAT"
                          name="tongTienPhiDuyTriSauVAT"
                        >
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            value={vatValue}
                            onChange={(value) => {
                              handleCalculateBeforeVatFromPhiDuyTri(value);
                              setSubmit({
                                ...submit,
                                tongTienPhiDuyTriSauVAT: value,
                              });
                            }}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Ưu tiên phí duy trì: "
                          name="uuTienPhiDuyTri"
                        >
                            <Checkbox
                              onClick={handleOnClickuuTienPhiDuyTri}
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
        <ModalUpdateDetailPrice
          cocoVAT={coVAT}
          submit={submit}
          priceListData={priceListData}
          setPriceListData={setPriceListData}
          tabListPO={tabListPO}
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
              setIsOpenModalEditPriceList(false);
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

export default ModalEditPriceList;
