import {
  AreaChartOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  EuroOutlined,
  FilterOutlined,
  HistoryOutlined,
  QrcodeOutlined,
  RollbackOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Pagination, Row, Tabs } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { data } from "./_data";
import Search from "antd/es/input/Search";
import "./Ledger.css";
import { convertToWords } from "../../../utils/NumberToWords";
import { Printer } from "../../../utils/bluetooth-printer/Printer";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getPrintInvoice,
  getPrintInvoiceDetail,
} from "../../../redux/selector";
import {
  fetchPrintInvoice,
  fetchPrintInvoiceDetail,
  printInvoiceSlice,
} from "../../../redux/slices/printInvoice/printInvoiceSlice";
import moment from "moment";

export default function LedgerPage({ setIsOpenModalLedger }) {
  const [indexPage, setIndexPage] = React.useState(1);
  const [indexPage2, setIndexPage2] = React.useState(1);
  const [selector, setSelector] = React.useState(null);
  const [selectedSoDocId, setSoDocId] = React.useState(null);
  const [sortPage2, setSortPage2] = React.useState(true);
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const listData = useSelector(getPrintInvoice);
  const listDataDetail = useSelector(getPrintInvoiceDetail);

  function onChange(pageNumber) {
    setIndexPage(pageNumber);
  }

  function onChange2(pageNumber) {
    setIndexPage2(pageNumber);
  }

  const userId = sessionStorage.getItem("userId");

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
    console.log(
      `${factoryQueryString}&userId=${userId}&pageSize=10&pageNumber=${indexPage}`
    );
    return `${factoryQueryString}&userId=${userId}&pageSize=10&pageNumber=${indexPage}`;
  };

  // get list -> sổ đọc theo nhaMayId
  useEffect(() => {
    if (nhaMayId) {
      const queryString = createFilterQueryString();
      dispatch(fetchPrintInvoice(queryString));
      dispatch(printInvoiceSlice.actions.setQueryPrintInvoice(queryString));
    }
  }, [nhaMayId]);

  const createQueryString = () => {
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
    console.log(
      `${factoryQueryString}&soDocChiSoId=${selectedSoDocId}&pageSize=10&pageNumber=${indexPage2}`
    );
    return `${factoryQueryString}&soDocChiSoId=${selectedSoDocId}&pageSize=10&pageNumber=${indexPage2}`;
  };
  useEffect(() => {
    if (nhaMayId) {
      const queryString = createQueryString();
      dispatch(fetchPrintInvoiceDetail(queryString));
      dispatch(
        printInvoiceSlice.actions.setQueryPrintInvoiceDetail(queryString)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSoDocId, indexPage2]);

  useEffect(() => {
    console.log("Data here", listData?.items);
    console.log("Data here2", listDataDetail?.items);
  }, []);

  return (
    <div
      style={{
        zIndex: -1,
      }}
    >
      {!selector && (
        <>
          <Row>
            <Col xs={{ span: 11 }} sm={{ span: 11 }} md={{ span: 20 }}>
              <Button
                onClick={() => setIsOpenModalLedger(false)}
                style={{
                  fontSize: 15,
                }}
              >
                <RollbackOutlined /> Trở lại
              </Button>
            </Col>
            <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }}>
              <Search
                placeholder="input search text"
                style={{ width: 200, fontSize: 15 }}
              />
            </Col>
          </Row>
          <Row
            gutter={[10, 10]}
            style={{
              marginTop: "3%",
            }}
          >
            {listData.items
              ?.slice((indexPage - 1) * 12, (indexPage - 1) * 12 + 12)
              .map((item) => {
                return (
                  <Frame1
                    item={item}
                    setSelector={setSelector}
                    setSoDocId={setSoDocId}
                  />
                );
              })}
          </Row>
          <Row
            style={{
              justifyContent: "center",
              margin: "3% 0 10% -10%",
            }}
          >
            <Pagination
              defaultCurrent={1}
              total={listData.totalCount}
              onChange={(e) => onChange(e)}
            />
          </Row>
        </>
      )}

      {selector && (
        <>
          <Row>
            <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 2 }}>
              <Button
                onClick={() => setSelector(null)}
                style={{
                  fontSize: 15,
                }}
              >
                <RollbackOutlined /> Trở lại
              </Button>
            </Col>
            <Col xs={{ span: 18 }} sm={{ span: 18 }} md={{ span: 7 }}>
              <Button style={{ width: "100%", overflow: "hidden" }}>
                {listDataDetail.id}
              </Button>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              style={{
                display: window.innerWidth < 768 ? "block" : "none",
                margin: "1rem 0",
              }}
            >
              <Search
                placeholder="input search text"
                style={{ width: "100%", fontSize: 15 }}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8, offset: 7 }}
            >
              <Row>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <Button onClick={() => setSortPage2(!sortPage2)}>
                    {sortPage2 ? (
                      <SortDescendingOutlined />
                    ) : (
                      <SortAscendingOutlined />
                    )}
                  </Button>
                  <Button>
                    <AreaChartOutlined />
                  </Button>
                  <Button>
                    <FilterOutlined />
                  </Button>
                  <Button>
                    <QrcodeOutlined />
                  </Button>
                </Col>
                <Col
                  span={11}
                  offset={1}
                  style={{
                    display: window.innerWidth < 768 ? "none" : "block",
                  }}
                >
                  <Search
                    placeholder="input search text"
                    style={{
                      width: "200",
                      fontSize: 15,
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "2rem",
            }}
          >
            <Tabs
              defaultActiveKey="2"
              items={[
                { key: "1", label: "Bản đồ" },
                {
                  key: "2",
                  label: `Danh sách (${listDataDetail.totalCount})`,
                },
              ]}
              // onChange={onChange}
              size="large"
            />
          </Row>
          <Row
            gutter={[10, 10]}
            style={{
              marginTop: "3%",
            }}
          >
            {listDataDetail.items.map((item) => {
              return <Frame2 item={item} />;
            })}
          </Row>
          <Row
            style={{
              justifyContent: "center",
              margin: "5% 0 10% -10%",
            }}
          >
            <Pagination
              defaultCurrent={1}
              total={listDataDetail.totalCount}
              onChange={(e) => onChange2(e)}
            />
          </Row>
        </>
      )}
    </div>
  );
}
class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <p
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    fontWeight: 700,
                    marginRight: "15px",
                    paddingRight: "15px",
                  }}
                >
                  Công ty Cổ phần Xây dựng và CN môi trường Việt Nam
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    fontWeight: 700,
                    marginRight: "15px",
                    paddingRight: "15px",
                  }}
                >
                  BIÊN NHẬN ĐÃ THANH TOÁN TIỀN NƯỚC
                </p>

                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  ------------------------------------------
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <p
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  Kỳ hóa đơn: 9/2023
                </p>
                <p
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Khách hàng: Nguyen Van Giam
                </p>
                <p
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Mã KH: NM_HH_so1003477
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  marginRight: "15px",
                  paddingRight: "15px",
                }}
              >
                Địa chỉ: Thôn Ngùi - Việt Ngọc - Tân Yên - Bắc Giang
              </p>
              <p
                style={{
                  fontSize: "10px",
                }}
              >
                Điện thoại: 0985646655
              </p>
              <p
                style={{
                  fontSize: "10px",
                }}
              >
                Số hóa đơn: MT/21E - 0089929
              </p>
              <p
                style={{
                  fontSize: "10px",
                }}
              >
                Hình thức TT: Tiền mặt
              </p>
              <p
                style={{
                  fontSize: "10px",
                }}
              >
                NĐK: 28/08/2023
              </p>
              <p
                style={{
                  fontSize: "10px",
                }}
              >
                NCK: 28/09/2023
              </p>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <p style={{ fontSize: "10px" }}>
                      Chỉ số mới: <b>117</b>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p style={{ fontSize: "10px" }}>
                      Chỉ số cũ: <b>119</b>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <table
                  style={{
                    width: "90%",
                    marginTop: "1rem",
                    borderCollapse: "collapse",
                    marginRight: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <thead style={{ borderBottom: "1px gray solid" }}>
                    <tr>
                      <th style={{ textAlign: "left", fontSize: 10 }}>
                        Số lượng
                      </th>
                      <th style={{ textAlign: "center", fontSize: 10 }}>
                        Đơn giá
                      </th>
                      <th style={{ textAlign: "right", fontSize: 10 }}>
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: "#c3c3c38f" }}>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "0.5rem",
                          fontSize: 12,
                        }}
                      >
                        3
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "1rem",
                          fontSize: 12,
                        }}
                      >
                        6.571
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: 12,
                        }}
                      >
                        19.000
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Thành tiền
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        19.714
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Thuế GTGT
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        986
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Tổng tiền
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        20.700
                      </td>
                    </tr>
                  </tbody>
                </table>
                <b
                  style={{
                    color: "red",
                    paddingRight: "15px",
                    marginRight: "15px",
                  }}
                >
                  Tổng tiền bằng chữ : {convertToWords(20.7)}
                </b>
              </Col>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

function Frame1({ item, setSelector, setSoDocId }) {
  return (
    <Col key={item.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
      <Card className="bigger">
        <div
          style={{
            height: 50,
            overflow: "hidden",
            zIndex: -1,
          }}
        >
          <h3
            onClick={() => {
              setSelector(item.id);
              setSoDocId(item.id);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {item.tenSo}
          </h3>
        </div>
        <p>
          <TeamOutlined /> Đã thanh toán:{" "}
          <b>
            {item.soLuongHoaDonDaTT}/{item.tongSoLuongHoaDon}
          </b>{" "}
          (khách)
        </p>
        <p>
          <EuroOutlined /> Số tiền đã thu:{" "}
          <b>
            {item.tongSoTienDaThu}/{item.tongSoTienHoaDon}
          </b>{" "}
          (vnd)
        </p>
        <p>
          <HistoryOutlined /> Ngày tạo sổ: {item.thangTaoSoDoc}
        </p>
        <div
          className="hover-effect"
          style={{
            position: "absolute",
            right: "1rem",
            bottom: ".5rem",
            fontSize: 30,
            borderRadius: "50%",
            padding: "0 1rem",
            cursor: "pointer",
          }}
        >
          <DashboardOutlined
            style={{
              color: "green",
            }}
          />
        </div>
      </Card>
    </Col>
  );
}
function PrintButton() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
}

function Frame2({ item }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState(item.chiSoDongHo.dienThoai);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const formattedDate = moment(item.ngayThu).format("DD/MM/YYYY");
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Modal
        title="Thông tin hoá đơn"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={window.innerWidth < 768 ? "100%" : "70%"}
      >
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <Row>
              <Col span={24}>
                <Card
                  style={{
                    backgroundColor: "#fffff",
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <p style={{ fontSize: "15px" }}>
                        Cong ty Co phan Xay dung va CN moi truong Viet Nam
                      </p>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={24}>
                          <p style={{ fontSize: "15px" }}>
                            BIEN NHAN DA THANH TOAN TIEN NUOC
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <p style={{ fontSize: "15px" }}>
                        Địa chỉ: <b>{item.diaChi}</b>
                      </p>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={12}>
                          <p style={{ fontSize: "15px" }}>
                            Kỳ hoá đơn: <b></b>
                          </p>
                        </Col>
                        <Col span={12}>
                          <p style={{ fontSize: "15px" }}>
                            Tiêu thụ: <b>{item.chiSoDongHo.tthu}</b>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={12}>
                          <p style={{ fontSize: "15px" }}>
                            Chỉ số mới: <b>{item.chiSoDongHo.chiSoMoi}</b>
                          </p>
                        </Col>
                        <Col span={12}>
                          <p style={{ fontSize: "15px" }}>
                            Chỉ số cũ: <b>{item.chiSoDongHo.chiSoCu}</b>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <table
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead style={{ borderBottom: "1px gray solid" }}>
                    <tr>
                      <th style={{ textAlign: "left", fontSize: 15 }}>
                        Số lượng
                      </th>
                      <th style={{ textAlign: "center", fontSize: 15 }}>
                        Đơn giá
                      </th>
                      <th style={{ textAlign: "right", fontSize: 15 }}>
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.chiTietHoaDonRespondModels.map((value, index) => {
                      return (
                        <tr style={{ backgroundColor: "#c3c3c38f" }}>
                          <td style={{ textAlign: "left", padding: "0.5rem" }}>
                            {value.soTieuThu}
                          </td>
                          {value.donGia && (
                            <td
                              style={{ textAlign: "center", padding: "1rem" }}
                            >
                              {value.donGia.toFixed(1).toLocaleString("en-US")}
                            </td>
                          )}
                          {value.thanhTien && (
                            <td style={{ textAlign: "right", padding: "1rem" }}>
                              {value.thanhTien
                                .toFixed(1)
                                .toLocaleString("en-US")}
                            </td>
                          )}
                        </tr>
                      );
                    })}

                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Thành tiền
                      </td>
                      {item.tongTienTruocVat && (
                        <td
                          style={{
                            textAlign: "right",
                            padding: "1rem",
                            fontSize: "15px",
                          }}
                        >
                          {item.tongTienTruocVat
                            .toFixed(1)
                            .toLocaleString("en-US")}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Thuế GTGT
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        {item.vat.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        Tổng tiền
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "1rem",
                          fontSize: "15px",
                        }}
                      >
                        {item.tongTienHoaDon.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <b
                  style={{
                    color: item.trangThaiThanhToan === 1 ? "red" : "green",
                  }}
                >
                  Tổng tiền bằng chữ :{" "}
                  {convertToWords(Math.round(item.tongTienHoaDon))}
                </b>
              </Col>
              {item.trangThaiThanhToan && (
                <Col span={24}>
                  <h2
                    style={{
                      textAlign: "right",
                      color: item.trangThaiThanhToan === 1 ? "red" : "green",
                      fontSize: "2rem",
                    }}
                  >
                    <CheckCircleOutlined />{" "}
                    {item.trangThaiThanhToan === 1
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </h2>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11, offset: 1 }}>
            <Row>
              <Col span={24} style={{ marginTop: "2rem" }}>
                <b>Ghi chú</b>
                <Input placeholder="Nhập ghi chú" />
              </Col>
              <Col span={24} style={{ marginTop: "2rem" }}>
                <b>Số điện thoại</b>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Col>
              {/*<ComponentToPrint ref={componentRef} />*/}
              <Col span={24} style={{ marginTop: "2rem" }}>
                {/*} <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      background: "blue", // Màu nền xanh
                      color: "white", // Chữ trắng
                      padding: "10px 20px", // Kích thước nút
                      border: "none", // Loại bỏ viền
                      cursor: "pointer", // Biểu tượng "hand" khi di chuột
                    }}
                    onClick={handlePrint}
                  >
                    In hóa đơn
                  </button>
                  </div>*/}
                <Printer data={item} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <Col
        key={item.key}
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        style={{
          cursor: "pointer",
        }}
        // onClick={() => showModal()}
      >
        <Card
          className="bigger"
          style={{
            height: window.innerWidth < 768 ? "fit-content" : 190,
          }}
          onClick={showModal}
        >
          <Row
            style={{
              height: 50,
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                color: item.trangThaiThanhToan === 1 ? "black" : "green",
              }}
            >
              {item.tenKhachHang} , {item.diaChi}
            </h3>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                {/*<Col span={12}>
                  Chỉ số: <b>{item.chiSo}</b>
            </Col>*/}
                <Col span={12}>
                  Sản lượng: <b>{item.tieuThu}</b>
                </Col>
                {/*<Col span={8}>
                  Kỳ HĐ: <b>{item.term}</b>
          </Col>*/}
              </Row>
              <Row>
                <Col span={12}>
                  Tổng tiền: <b>{item.tongTienHoaDon.toLocaleString()}</b>
                </Col>
              </Row>
              {item.trangThaiThanhToan && (
                <>
                  <Row
                    style={{
                      color: item.trangThaiThanhToan === 1 ? "red" : "green",
                    }}
                  >
                    <Col span={12}>
                      <CheckSquareOutlined style={{ fontSize: "1.5rem" }} />{" "}
                      <b>
                        {item.trangThaiThanhToan === 1
                          ? "Chưa thanh toán"
                          : "Đã thanh toán"}
                      </b>
                    </Col>

                    <Col span={10}>
                      <b>
                        Ngày thu:{" "}
                        {formattedDate !== "Invalid date" ? formattedDate : ""}
                      </b>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      color: item.trangThaiThanhToan === 1 ? "red" : "green",
                    }}
                  >
                    <Col span={12}>
                      <b>
                        <UserOutlined />
                        {item.tenNguoiThuTien}
                      </b>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <EnvironmentOutlined
            style={{
              color: item.trangThaiThanhToan === 1 ? "red" : "green",
              position: "absolute",
              right: "1rem",
              bottom: "5rem",
              fontSize: 25,
            }}
          />
        </Card>
      </Col>
    </>
  );
}
