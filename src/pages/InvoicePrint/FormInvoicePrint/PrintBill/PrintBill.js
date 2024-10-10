import { Button, Col, Modal, Row, Select } from "antd";
import { PrinterOutlined, SaveOutlined } from "@ant-design/icons";

import "./PrintBill.css";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { exportComponentAsPNG } from "react-component-export-image";
import {
  getInvoiceList,
  getViewInvoiceDetail,
} from "../../../../redux/selector";
import { useSelector } from "react-redux";
import ExportExcel from "../../../Invoice/ViewInvoice/ExportInvoiceAsXLS";
import { convertToWords } from "../../../Invoice/ViewInvoice/NumberToWords";

const data = {
  Inumber: "0068105",
  CustomerName: "Phạm Trung Hiếu",
  CustomerAddress: "Bảo Vinh - Bảo Hà - Bảo Yên - Lào",
  CustomerCode: "LCI00168",
  CustomerPhone: "0973376861",
  Route: "baovinh",
  NewNumber: 331,
  OldNumber: 290,
  Price: [
    // {
    //   id: 1,
    //   value: 6.268,
    // },
    // {
    //   id: 2,
    //   value: 8.417,
    // },
    // {
    //   id: 3,
    //   value: 12.537,
    // },
    // {
    //   id: 4,
    //   value: 16.119,
    // },
  ],
};

const renderTable = () => {
  var number = data.NewNumber - data.OldNumber + 10; // 10 là số bù lại cho code bên dưới
  return data.Price.map((item, index) => {
    number -= 10;
    return (
      <>
        {number > 10 ? (
          <tr key={index}>
            <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
              {index === 3 ? <>{number}</> : <>10</>}
            </td>
            <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
              {item.value}
            </td>
            {index === 3 ? (
              <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
                {number * item.value}
              </td>
            ) : (
              <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
                {10 * item.value}
              </td>
            )}
          </tr>
        ) : (
          <>
            {number > 0 ? (
              <tr key={index}>
                <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
                  {number}
                </td>
                <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
                  {item.value}
                </td>
                <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
                  {number * item.value}
                </td>
              </tr>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );
  });
};

const style = {
  fontFamily: "Times New Roman, Times, serif",
  lineHeight: "2.3rem",
};

export const PrintBill = (props, rowSelection) => {
  const { isOpen } = props;
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("xls");
  const viewDataDetail = useSelector(getViewInvoiceDetail);
  const invoiceListSelector = useSelector(getInvoiceList);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    // onAfterPrint: () => alert('Print success')
  });

  useEffect(() => {
    var number = data.NewNumber - data.OldNumber + 10; // 10 là số bù lại cho code bên dưới
    var totals = 0;
    data.Price.map((item, index) => {
      number -= 10;
      if (number > 10) {
        if (index === 3) {
          totals += number * item.value;
        } else {
          totals += 10 * item.value;
        }
      } else {
        if (number > 0) {
          totals += number * item.value;
        }
      }
    });
    setTotal(totals);
  });

  return (
    <Modal
      title="In hóa đơn"
      open={isOpen}
      onCancel={props.handleCancel}
      width={1100}
      footer={null}
      centered
    >
      <Row
        style={{
          marginBottom: "1rem",
        }}
      >
        <Col xs={{ span: 7 }} lg={{ span: 2 }}>
          <Button onClick={handlePrint}>
            Print <PrinterOutlined />
          </Button>
        </Col>
        <Col xs={{ span: 7 }} lg={{ span: 2 }}>
          {type === "xls" ? (
            <ExportExcel data={data}>
              <Button>
                Save <SaveOutlined />
              </Button>
            </ExportExcel>
          ) : (
            <>
              {/* <ComponentToPrint ref={componentRef} /> */}
              <Button onClick={() => exportComponentAsPNG(componentRef)}>
                Save <SaveOutlined />
              </Button>
            </>
          )}
        </Col>
        <Col xs={{ span: 5 }} lg={{ span: 2 }}>
          <Select defaultValue={"xls"} onChange={(e) => setType(e)}>
            <Select.Option value="xls">XLS</Select.Option>
            <Select.Option value="png">PNG</Select.Option>
          </Select>
        </Col>
      </Row>
      <div
        style={{
          overflowY: "scroll",
          height: "65vh",
          maxHeight: "650px",
          border: "1px solid #000",
        }}
      >
        <Row
          style={{
            width: "100%",
          }}
        >
          <div
            ref={componentRef}
            id="print-invoice"
            style={{
              padding: "3rem 0 2rem 4rem",
            }}
          >
            <Row
              style={{
                width: "1000px",
              }}
            >
              <Col span={10}>
                <Row>
                  <Col className="title-invoice" span={24}>
                    <h3 style={style}>CT CP XD VÀ CN MT VIỆT NAM</h3>
                    <h2 style={style}>HÓA ĐƠN TIỀN NƯỚC</h2>
                    <p style={style}>(Liên 1: Lưu)</p>
                    <p style={style}>Kỳ: Từ ngày 28/04/2023</p>
                    <p style={style}>đến ngày 28/05/2023</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="customer-info">
                    <p style={style}>Số hóa đơn: {data.Inumber}</p>
                    <p style={style}>
                      Tên khách hàng: <b>{viewDataDetail.tenKhachHang}</b>
                    </p>
                    <Row style={{ height: "2rem" }} />
                    <p style={style}>
                      Địa chỉ: <b>{viewDataDetail.diaChi}</b>
                    </p>
                    <p style={style}>
                      Mã số khách hàng: {viewDataDetail.maKhachHang}
                    </p>
                    <p style={style}>Tuyến: {viewDataDetail.tuyen}</p>
                    {/*  */}
                    <Row>
                      <Col span={11}>
                        <p style={style}>CHỈ SỐ MỚI:</p>
                      </Col>
                      <Col span={11} style={{ textAlign: "right" }}>
                        {props.rowSelection && (
                          <b style={style}>{props.rowSelection.chiSoMoi}</b>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11}>
                        <p style={style}>CHỈ SỐ CŨ:</p>
                      </Col>
                      <Col span={11} style={{ textAlign: "right" }}>
                        {props.rowSelection && (
                          <b style={style}>{props.rowSelection.chiSoCu}</b>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11}>
                        <p style={style}>SỐ TIÊU THỤ:</p>
                      </Col>
                      <Col span={11} style={{ textAlign: "right", ...style }}>
                        <b style={style}>{viewDataDetail.tieuThu}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p style={style}>Trong đó</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={23}>
                        <table className="table-invoice">
                          <thead>
                            <tr>
                              <th
                                style={{ ...style, border: "1px solid black" }}
                              >
                                SỐ T.THỤ
                              </th>
                              <th
                                style={{ ...style, border: "1px solid black" }}
                              >
                                ĐƠN GIÁ
                              </th>
                              <th
                                style={{ ...style, border: "1px solid black" }}
                              >
                                THÀNH TIỀN
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {renderTable()}
                            <tr className="total">
                              <td style={style} colSpan={2}>
                                Phí VAT 5%
                              </td>
                              <td style={style} colSpan={1}>
                                {viewDataDetail.vat}
                              </td>
                            </tr>
                            <tr className="total">
                              <td style={style} colSpan={2}>
                                Tiền trả góp
                              </td>
                              <td style={style} colSpan={1}></td>
                            </tr>
                            <tr className="total">
                              <td style={style} colSpan={2}>
                                Tổng tiền thanh toán
                              </td>
                              <td style={style} colSpan={1}>
                                {viewDataDetail.tongTienThanhToan}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <b style={style}>
                          Bằng chữ:{" "}
                          {convertToWords(viewDataDetail.tongTienHoaDon)}
                        </b>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <div style={style}>Thu ngân:</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  borderLeft: "1px dotted #000",
                  marginRight: "1.5rem",
                }}
              />
              <Col span={13}>
                <Row>
                  <Col className="title-invoice" span={24}>
                    <h2 style={style}>HÓA ĐƠN TIỀN NƯỚC</h2>
                    <p style={style}>(Liên 2: Giao khách hàng)</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="customer-info">
                    <p style={style}>Số hóa đơn: {data.Inumber}</p>
                    <p style={style}>
                      Đơn vị bán hàng:{" "}
                      <b>Cty CP Xây dựng và CN Môi trường Việt Nam</b>
                    </p>
                    <p style={style}>
                      Địa chỉ: Lô B1.2, LK 04-14, KĐT Thanh Hà, X.Cự Khê,
                      H.Thanh Oai, TP Hà Nội
                    </p>
                    <p style={style}>Mã số thuế: 0105172567</p>
                    <p style={style}>Tài khoản: </p>
                    <Row style={{ height: "2rem" }} />
                    <p style={style}>
                      <b>Nhà máy nước sạch Bảo Hà</b>
                    </p>
                    <p style={style}>
                      Điện thoại: {viewDataDetail.dienThoaiKhachHang}
                    </p>
                    <p style={style}>
                      Tên khách hàng: <b>{viewDataDetail.tenKhachHang}</b>
                    </p>
                    <p style={style}>
                      Địa chỉ: <b>{viewDataDetail.diaChi}</b>
                    </p>
                    <p style={style}>MST:{viewDataDetail.maSoThue}</p>
                    <p style={style}>
                      Số tài khoản:{viewDataDetail.taiKhoanNH}
                    </p>
                    <Row>
                      <Col span={10}>
                        <p style={style}>
                          Mã số khách hàng: {viewDataDetail.maSoKhachHang}
                        </p>
                      </Col>
                      <Col span={10} style={{ textAlign: "right" }}>
                        <p style={style}>
                          Số điện thoại: {viewDataDetail.dienThoaiKhachHang}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <table className="table-invoice">
                      <thead>
                        <tr>
                          <th style={{ ...style, border: "1px solid black" }}>
                            CHỈ SỐ MỚI
                          </th>
                          <th style={{ ...style, border: "1px solid black" }}>
                            CHỈ SỐ CŨ
                          </th>
                          <th style={{ ...style, border: "1px solid black" }}>
                            SỐ T.THỤ
                          </th>
                          <th style={{ ...style, border: "1px solid black" }}>
                            ĐƠN GIÁ
                          </th>
                          <th style={{ ...style, border: "1px solid black" }}>
                            THÀNH TIỀN
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {props.rowSelection && (
                              <b style={style}>{props.rowSelection.chiSoMoi}</b>
                            )}
                          </td>
                          <td>
                            {props.rowSelection && (
                              <b style={style}>{props.rowSelection.chiSoCu}</b>
                            )}
                          </td>
                          <td style={{ ...style, borderBottom: "0px" }}>
                            {props.rowSelection && (
                              <b>
                                {props.rowSelection.chiSoMoi -
                                  props.rowSelection.chiSoCu}
                              </b>
                            )}
                          </td>
                          <td style={{ ...style, borderBottom: "0px" }}></td>
                          <td style={{ ...style, borderBottom: "0px" }}></td>
                        </tr>
                        <tr className="sign">
                          <td
                            rowSpan={8}
                            colSpan={2}
                            style={{ ...style, border: "1px solid black" }}
                          >
                            chữ ký
                          </td>
                        </tr>
                        {/*  */}
                        {renderTable()}
                        <tr className="total">
                          <td colSpan={2} style={style}>
                            <b>Phí VAT 5%</b>
                          </td>
                          <td colSpan={1} style={style}>
                            <b>{viewDataDetail.vat}</b>
                          </td>
                        </tr>
                        <tr className="total">
                          <td colSpan={2} style={style}>
                            <b>Tiền trả góp</b>
                          </td>
                          <td colSpan={1} style={style}></td>
                        </tr>
                        <tr className="total">
                          <td colSpan={2} style={style}>
                            <b>Tổng tiền thanh toán</b>
                          </td>
                          <td colSpan={1} style={style}>
                            <b>{viewDataDetail.tongTienHoaDon}</b>
                          </td>
                        </tr>
                        <tr />
                        <tr />
                        <tr />
                        {/*  */}
                        <tr>
                          <td
                            style={{ textAlign: "center", ...style }}
                            colSpan={1}
                          >
                            Số viết thành chữ
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              paddingLeft: "1rem",
                              ...style,
                            }}
                            colSpan={4}
                          >
                            {convertToWords(viewDataDetail.tongTienHoaDon)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </Modal>
  );
};
