import { Button, Col, Modal, Row, Select } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  btnClickGetViewInvoiceListSelector,
  dataContractList,
  fetchDataByNhaMay,
  getViewInvoiceDetail,
} from "../../../redux/selector";
import { PrinterOutlined, SaveOutlined } from "@ant-design/icons";
import ExportExcel from "../ViewInvoice/ExportInvoiceAsXLS";
import { exportComponentAsPNG } from "react-component-export-image";
import { useReactToPrint } from "react-to-print";
import { convertToWords } from "../ViewInvoice/NumberToWords";
import { primaryLogo } from "../../../asset/images";
import dayjs from "dayjs";
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
    {
      id: 1,
      value: 6.268,
    },
    {
      id: 2,
      value: 8.417,
    },
    {
      id: 3,
      value: 12.537,
    },
    {
      id: 4,
      value: 16.119,
    },
  ],
};
const style = {
  fontFamily: "Times New Roman, Times, serif",
  lineHeight: "2.3rem",
  color: "#000",
};
const renderTable = (data) => {
  if (!data || !data?.chiTietHoaDonRespondModels) {
    return (
      <>
        <tr>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}></td>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}></td>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}></td>
        </tr>
      </>
    );
  }
  var number = data.NewNumber - data.OldNumber + 10; // 10 là số bù lại cho code bên dưới

  return data?.chiTietHoaDonRespondModels.map((data, index) => {
    number -= 10;
    return (
      <>
        <tr key={index}>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
            {data.soTieuThu}
          </td>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
            {data.donGia != null ? data.donGia?.toLocaleString("en-US") : "0"}
          </td>
          <td style={{ ...style, borderBottom: "0px", borderTop: "0px" }}>
            {data.thanhTien != null
              ? data.thanhTien?.toLocaleString("en-US")
              : "0"}
          </td>
        </tr>
      </>
    );
  });
};
const ViewPrintInvoice = ({ isOpen, setOpenModal }) => {
  const data2 = useSelector(fetchDataByNhaMay);
  const [type, setType] = useState("xls");
  const dataViewInvoiceList = useSelector(btnClickGetViewInvoiceListSelector);
  console.log(dataViewInvoiceList);
  const componentRef = useRef();
  const viewDataDetail = useSelector(getViewInvoiceDetail);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "hoa-don",
    // onAfterPrint: () => alert('Print success')
  });

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setOpenModal(false);
      }}
      width={1100}
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
            // style={{
            //   padding: "3rem 0 2rem 4rem",
            // }}
          >
            {dataViewInvoiceList?.map(
              (data) => (
                console.log(data),
                (
                  <div
                    style={{
                      // borderBottom: "1px solid #000",
                      alignContent: "space-between",
                      paddingBottom: "10%",
                    }}
                  >
                    <Row
                      style={{
                        // width: "1000px",
                        paddingTop: "55px",
                      }}
                      key={data && data.id}
                    >
                      <Col span={10} style={{ paddingLeft: "50px" }}>
                        <Row>
                          <Col className="title-invoice" span={24}>
                            <h3 style={style}>CT CP XD VÀ CN MT VIỆT NAM</h3>
                            <h2 style={style}>HÓA ĐƠN TIỀN NƯỚC</h2>
                            <p style={style}>(Liên 1: Lưu)</p>
                            <p style={style}>Kỳ: Từ ngày {data &&
                                    data.ngayDauKy &&
                                    dayjs(data.ngayDauKy).format("DD-MM-YYYY") }</p>
                                <p style={style}>đến ngày {data &&
                                    data.ngayCuoiKy &&
                                    dayjs(data.ngayCuoiKy).format("DD-MM-YYYY") }</p>

                          </Col>
                        </Row>
                        <Row>
                          <Col span={24} className="customer-info">
                            <p style={style}>Số hóa đơn: {data?.keyId}</p>

                            <p style={style}>
                              Tên khách hàng: <b>{data?.tenKhachHang}</b>
                            </p>
                            <Row style={style} />
                            <p style={style}>
                              Địa chỉ: <b>{data && data?.diaChi}</b>
                            </p>
                            <p style={style}>
                              Mã số khách hàng: {data && data?.maKhachHang}
                            </p>
                            <p style={style}>Tuyến: {data && data?.tuyenDoc}</p>
                            {/*  */}
                           
                            <Row>
                              <Col span={11}>
                                <p style={style}>CHỈ SỐ MỚI:</p>
                              </Col>
                              <Col span={11} style={{ textAlign: "right" }}>
                                <b style={style}>
                                  {data &&
                                    data.chiSoDongHo &&
                                    data.chiSoDongHo.chiSoMoi}
                                </b>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={11}>
                                <p style={style}>CHỈ SỐ CŨ:</p>
                              </Col>
                              <Col span={11} style={{ textAlign: "right" }}>
                                <b style={style}>
                                  {data &&
                                    data.chiSoDongHo &&
                                    data.chiSoDongHo.chiSoCu}
                                </b>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={11}>
                                <p style={style}>SỐ TIÊU THỤ:</p>
                              </Col>
                              <Col
                                span={11}
                                style={{ textAlign: "right", ...style }}
                              >
                                <b style={style}>{data && data?.tieuThu}</b>
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
                                        style={{
                                          ...style,
                                          border: "1px solid black",
                                        }}
                                      >
                                        SỐ T.THỤ
                                      </th>
                                      <th
                                        style={{
                                          ...style,
                                          border: "1px solid black",
                                        }}
                                      >
                                        ĐƠN GIÁ
                                      </th>
                                      <th
                                        style={{
                                          ...style,
                                          border: "1px solid black",
                                        }}
                                      >
                                        THÀNH TIỀN
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {renderTable(data)}
                                    {/* <tr className="total">
                                  <td style={style} colSpan={2}>
                                    Phí VAT 5%
                                  </td>
                                  <td style={style} colSpan={1}>
                                    {Math.ceil(item?.phiVat).toLocaleString(
                                      "en-US"
                                    )}
                                  </td>
                                  
                                </tr> */}

                                {data?.giaPhiDuyTri === null ||
                                    data?.giaPhiDuyTri === 0 ? (
                                      ""
                                    ) : (
                                      <>
                                      <tr className="total">
                                        <td style={style} colSpan={2}>
                                          <b> Phí duy trì</b>
                                        </td>
                                        <td style={style} colSpan={1}>
                                         <b> {Math.floor(
                                            data?.giaPhiDuyTri
                                          ).toLocaleString("en-US")}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr className="total">
                                        <td style={style} colSpan={2}>
                                          <b> % VAT phí duy trì</b>
                                        </td>
                                        <td style={style} colSpan={1}>
                                         <b> {data?.phanTramVATPhiDuyTri}%
                                          </b>
                                        </td>
                                      </tr>
                                     </>
                                    )}

                                    {data?.giaPhiDuyTri === null ||
                                    data?.giaPhiDuyTri === 0 ? (
                                      <tr className="total">
                                        <td style={style} colSpan={2}>
                                          <b>Phí VAT 5%</b>
                                        </td>
                                        {data?.tongTienTruocVat && (
                                          <td style={style} colSpan={1}>
                                            <b>{data.vat?.toLocaleString("en-US")}</b>
                                          </td>
                                        )}
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {data?.giaPhiDuyTri === null ||
                                    data?.giaPhiDuyTri === 0 ? (
                                      <tr className="total">
                                        <td style={style} colSpan={2}>
                                          <b>Tổng tiền thanh toán</b>
                                        </td>
                                        {data?.tongTienHoaDon && (
                                          <td style={style} colSpan={1}>
                                          <b> {data.tongTienHoaDon?.toLocaleString(
                                              "en-US"
                                            )}</b> 
                                          </td>
                                        )}
                                      </tr>
                                    ) : (
                                      <tr className="total">
                                        <td style={style} colSpan={2}>
                                          <b>Tổng tiền thanh toán</b>
                                        </td>
                                        {data?.giaPhiDuyTri && (
                                          <td style={style} colSpan={1}>
                                            <b>{Math.floor(
                                                data?.tongTienPhiDuyTriSauVAT
                                              )?.toLocaleString("en-US")}</b>
                                          </td>
                                        )}
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <b style={style}>
                                  Bằng chữ:{" "}
                                  {data?.giaPhiDuyTri === null ||
                                  data?.giaPhiDuyTri === 0
                                    ? convertToWords(
                                        Math.round(data?.tongTienHoaDon)
                                      )
                                    : convertToWords(
                                        Math.round(data?.giaPhiDuyTri)
                                      )}
                                </b>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <div style={style}>
                                  Thu ngân:{" "}
                                  <b
                                    style={{
                                      color:
                                        data?.trangThaiThanhToan ===
                                        "ChuaThanhToan"
                                          ? "red"
                                          : "green",
                                    }}
                                  >
                                    {data?.trangThaiThanhToan ===
                                    "ChuaThanhToan"
                                      ? "Chưa Thanh Toán"
                                      : "Đã Thanh Toán"}
                                  </b>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        span={1}
                        style={{
                          borderLeft: "1px dotted #000",
                          marginLeft: "1.5rem",
                        }}
                      />
                      <Col span={12}>
                        <Row>
                          <Col className="title-invoice" span={24}>
                            <h2 style={style}>HÓA ĐƠN TIỀN NƯỚC</h2>
                            <p style={style}>(Liên 2: Giao khách hàng)</p>
                            <p style={style}>Kỳ: Từ ngày {data &&
                                    data.ngayDauKy &&
                                    dayjs(data.ngayDauKy).format("DD-MM-YYYY") }</p>
                                <p style={style}>đến ngày {data &&
                                    data.ngayCuoiKy &&
                                    dayjs(data.ngayCuoiKy).format("DD-MM-YYYY") }</p>
                          </Col>

                        </Row>
                        <Row>
                          <Col span={24} className="customer-info">
                          <p style={style}>Số hóa đơn: <span style={{fontWeight:"bold"}}>{data?.keyId}</span></p>
                            <p style={style}>
                              Đơn vị bán hàng:{" "}
                              <b>{data2?.phanLoaiNhaMay}</b>
                            </p>
                            <p style={style}>
                              Địa chỉ: <span style={{fontWeight:"bold"}}>{data2?.diaChiChiTiet}</span>
                            </p>
                            <p style={style}>MS thuế: <span style={{fontWeight:"bold"}}>{data2?.maSoThue}</span></p>

                            <p style={style}>
                              Tài khoản: <span style={{fontWeight:"bold"}}> {data2?.taiKhoanNganHang} - {data2?.tenNganHang}</span>
                            </p>
                            <p style={style}>
                              Chủ tài khoản:{" "}
                              <b>
                                {data2?.chuTaiKhoanNganHang}
                              </b>
                            </p>
                            <p style={style}>
                              <b> {data?.tenNhaMay} </b>{" "}
                            </p>
                            <p style={style}>Điện thoại: <span style={{fontWeight:"bold"}}>{data2?.dienThoai}</span></p>
                            <p style={style}>
                              Tên khách hàng:{" "}
                              <b>{data && data?.tenKhachHang}</b>
                            </p>
                            <p style={style}>
                              Địa chỉ: <b>{data?.diaChi}</b>
                            </p>
                            <p style={style}>MST:{data?.maSoThue}</p>
                            <p style={style}>Số tài khoản:{data?.taiKhoanNH}</p>
                            <p style={style}>
                              Mã số khách hàng: {data?.maKhachHang}
                            </p>
                            <p style={style}>
                              Số điện thoại: {data?.dienThoai}
                            </p>
                            <Row />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <table className="table-invoice">
                              <thead>
                                <tr>
                                  <th
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    CHỈ SỐ MỚI
                                  </th>
                                  <th
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    CHỈ SỐ CŨ
                                  </th>
                                  <th
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    SỐ T.THỤ
                                  </th>
                                  <th
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    ĐƠN GIÁ
                                  </th>
                                  <th
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    THÀNH TIỀN
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <b style={style}>
                                      {data?.chiSoDongHo?.chiSoMoi}
                                    </b>
                                  </td>
                                  <td>
                                    <b style={style}>
                                      {data?.chiSoDongHo?.chiSoCu}
                                    </b>
                                  </td>
                                  <td
                                    style={{
                                      ...style,
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <b>
                                      {data?.chiSoDongHo?.chiSoMoi -
                                        data?.chiSoDongHo?.chiSoCu}
                                    </b>
                                  </td>
                                  <td
                                    style={{ ...style, borderBottom: "0px" }}
                                  ></td>
                                  <td
                                    style={{ ...style, borderBottom: "0px" }}
                                  ></td>
                                </tr>

                                <tr className="sign">
                                  <td
                                    rowSpan={8}
                                    colSpan={2}
                                    style={{
                                      ...style,
                                      border: "1px solid black",
                                    }}
                                  >
                                    <div style={{ textAlign: "center" }}>
                                      <img
                                         src={`${process.env.REACT_APP_IMAGE}${data?.imageChuKy}`}
                                        alt="Ảnh chữ ký"
                                        style={{
                                          width: "152px",
                                          height: "80px",
                                        }}
                                      />
                                      <br />
                                      <b>{data2?.tenGiamDoc}</b>
                                    </div>
                                  </td>
                                </tr>

                                {/*  */}
                                {renderTable(data)}

                                {data?.giaPhiDuyTri === null ||
                                data?.giaPhiDuyTri === 0 ? (
                                  ""
                                ) : (
                                  <tr className="total">
                                    <td style={style} colSpan={2}>
                                      <b>Phí duy trì</b>
                                    </td>
                                    <td style={style} colSpan={1}>
                                     <b> {Math.floor(
                                        data?.giaPhiDuyTri
                                      ).toLocaleString("en-US")}</b>
                                    </td>
                                  </tr>
                                )}

                                {data?.giaPhiDuyTri === null ||
                                data?.giaPhiDuyTri === 0 ? (
                                  <tr className="total">
                                    <td style={style} colSpan={2}>
                                      <b>Phí VAT 5%</b>
                                    </td>
                                    {data?.tongTienTruocVat && (
                                      <td style={style} colSpan={1}>
                                        <b>
                                          {Math.ceil(data.vat)?.toLocaleString(
                                            "en-US"
                                          )}
                                        </b>
                                      </td>
                                    )}
                                  </tr>
                                ) : (
                                  ""
                                )}
                                {data?.giaPhiDuyTri === null ||
                                data?.giaPhiDuyTri === 0 ? (
                                  <tr className="total">
                                    <td colSpan={2} style={style}>
                                      <b>Tổng tiền thanh toán</b>
                                    </td>
                                    {data?.tongTienHoaDon && (
                                      <td colSpan={1} style={style}>
                                        <b>
                                          {data?.tongTienHoaDon?.toLocaleString(
                                            "en-US"
                                          )}
                                        </b>
                                      </td>
                                    )}
                                  </tr>
                                ) : (
                                  <tr className="total">
                                    <td colSpan={2} style={style}>
                                      <b>Tổng tiền thanh toán</b>
                                    </td>
                                    {data?.giaPhiDuyTri && (
                                      <td colSpan={1} style={style}>
                                        <b>
                                          {Math.floor(
                                            data?.giaPhiDuyTri
                                          )?.toLocaleString("en-US")}
                                        </b>
                                      </td>
                                    )}
                                  </tr>
                                )}
                                <tr />
                                <tr />
                                <tr />
                                {/*  */}
                                <tr>
                                  <td
                                    style={{ textAlign: "center", ...style }}
                                    colSpan={1}
                                  >
                                    <b>Bằng chữ</b>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: "1rem",
                                      ...style,
                                    }}
                                    colSpan={4}
                                  >
                                     {data?.giaPhiDuyTri === null ||
                                    data?.giaPhiDuyTri === 0 ? (
                                      <b>
                                        {convertToWords(
                                          Math.round(data?.tongTienHoaDon)
                                        )}
                                      </b>
                                    ) : (
                                      <b>
                                        {convertToWords(
                                          Math.round(data?.giaPhiDuyTri)
                                        )}
                                      </b>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )
              )
            )}
          </div>
        </Row>
      </div>
    </Modal>
  );
};

export default ViewPrintInvoice;
