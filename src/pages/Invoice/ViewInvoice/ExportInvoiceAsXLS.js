import { Row, Col } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import './ViewInvoice.css';
import { convertToWords } from "./NumberToWords";


export default function ExportExcel({ data, children }) {
    const tableRef = useRef(null);
    const [total, setTotal] = useState(0);

    const renderTable = () => {
        var number = data.NewNumber - data.OldNumber + 10; // 10 là số bù lại cho code bên dưới
        return data.Price.map((item, index) => {
            number -= 10;
            return (
                <>
                    {
                        number > 10 ?
                            <tr key={index}>
                                <td>
                                    {
                                        index === 3 ?
                                            <>{number}</>
                                            :
                                            <>10</>
                                    }
                                </td>
                                <td>{item.value}</td>
                                {
                                    index === 3 ?
                                        <td>{(number) * item.value}</td>
                                        :
                                        <td>{10 * item.value}</td>
                                }
                            </tr>

                            :
                            <>
                                {
                                    number > 0 ?
                                        <tr key={index}>
                                            <td>{number}</td>
                                            <td>{item.value}</td>
                                            <td>{number * item.value}</td>
                                        </tr>
                                        :
                                        <></>
                                }
                            </>
                    }
                </>
            )
        })
    }

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
            }
            else {
                if (number > 0) {
                    totals += number * item.value;
                }
            }
        })
        setTotal(totals);
    })

    return (
        <div>
            <DownloadTableExcel
                filename="awa-invoice"
                sheet="invoice1"
                currentTableRef={tableRef.current}
            >
                {children}
            </DownloadTableExcel>

            <table ref={tableRef} style={{ display: 'none' }}>
                <tbody>
                    <tr>
                        <td colSpan="3" className="text-center">
                            <div>CT CP XD VÀ CN MT VIỆT NAM</div>
                            <div>HÓA ĐƠN TIỀN NƯỚC</div>
                            <div>(Liên 1: Lưu)</div>
                            <div>Kỳ: Từ ngày 28/04/2023</div>
                            <div>đến ngày 28/05/2023</div>
                            <Row style={{ textAlign: 'left' }}>
                                <Col span={24} className="customer-info">
                                    <div>Số  hóa đơn: {data.Inumber}</div>
                                    <div>Tên khách hàng: <b>{data.CustomerName}</b></div>
                                    <div>Địa chỉ:  <b>{data.CustomerAddress}</b></div>
                                    <div>Mã số khách hàng: {data.CustomerCode}</div>
                                    <div>Tuyến: {data.Route}</div>
                                    <div>CHỈ SỐ MỚI: <b>{data.NewNumber}</b></div>
                                    <div>CHỈ SỐ CŨ: <b>{data.OldNumber}</b></div>
                                    <div>SỐ TIÊU THỤ:  <b>{data.NewNumber - data.OldNumber}</b></div>
                                    <div>Trong đó</div>
                                    <Row>
                                        <Col span={23}>
                                            <table className="table-invoice">
                                                <thead>
                                                    <tr>
                                                        <th>SỐ T.THỤ</th>
                                                        <th>ĐƠN GIÁ</th>
                                                        <th>THÀNH TIỀN</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderTable()}
                                                    <tr className="total">
                                                        <td colSpan={2}>Phí VAT 5%</td>
                                                        <td colSpan={1}>{(total * 0.05).toFixed(3)}</td>
                                                    </tr>
                                                    <tr className="total">
                                                        <td colSpan={2}>Tiền trả góp</td>
                                                        <td colSpan={1}></td>
                                                    </tr>
                                                    <tr className="total">
                                                        <td colSpan={2}>Tổng tiền thanh toán</td>
                                                        <td colSpan={1}>{(total + total * 0.05).toFixed(3)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Row>
                                    <b>Bằng chữ: {convertToWords((total + total * 0.05).toFixed(3))}</b>
                                    <Row>
                                        Thu ngân:
                                    </Row>
                                </Col>
                            </Row>
                        </td >
                        <td style={{ borderLeft: '2px dotted #000' }} colSpan={0} />
                        <td colSpan="3">
                            <div>HÓA ĐƠN TIỀN NƯỚC</div>
                            <div>(Liên 2: Giao khách hàng)</div>
                            <Row style={{ textAlign: 'left' }}>
                                <Col span={24} className="customer-info">
                                    <div>Số  hóa đơn: {data.Inumber}</div>
                                    <div>Đơn vị bán hàng: <b>Cty CP Xây dựng và CN Môi trường Việt Nam</b></div>
                                    <div>Địa chỉ: Lô B1.2, LK 04-14, KĐT Thanh Hà, X.Cự Khê, H.Thanh Oai, TP Hà Nội</div>
                                    <div>Mã số thuế: 0105172567</div>
                                    <div>Tài khoản: </div>
                                    <div>Điện thoại:  0987732538 - 0982639066</div>
                                    <div>Tên khách hàng: <b>{data.CustomerName}</b></div>
                                    <div>Địa chỉ:  <b>{data.CustomerAddress}</b></div>
                                    <div>MST:</div>
                                    <div>Số tài khoản:</div>
                                    <div>Mã số khách hàng: {data.CustomerCode}</div>
                                    <div>Số điện thoại: {data.CustomerPhone}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <table className="table-invoice">
                                        <thead>
                                            <tr>
                                                <th>CHỈ SỐ MỚI</th>
                                                <th>CHỈ SỐ CŨ</th>
                                                <th>SỐ T.THỤ</th>
                                                <th>ĐƠN GIÁ</th>
                                                <th>THÀNH TIỀN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><b>{data.NewNumber}</b></td>
                                                <td><b>{data.OldNumber}</b></td>
                                                <td><b>{data.NewNumber - data.OldNumber}</b></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr className="sign">
                                                <td rowSpan={8} colSpan={2}>chữ ký</td>
                                            </tr>
                                            {/*  */}
                                            {renderTable()}
                                            <tr className="total">
                                                <td colSpan={2}>Phí VAT 5%</td>
                                                <td colSpan={1}>{(total * 0.05).toFixed(3)}</td>
                                            </tr>
                                            <tr className="total">
                                                <td colSpan={2}>Tiền trả góp</td>
                                                <td colSpan={1}></td>
                                            </tr>
                                            <tr className="total">
                                                <td colSpan={2}>Tổng tiền thanh toán</td>
                                                <td colSpan={1}>{(total + total * 0.05).toFixed(3)}</td>
                                            </tr>
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>

                                            {/*  */}
                                            <tr>
                                                <td style={{ textAlign: 'center' }} colSpan={1}>Số viết thành chữ</td>
                                                <td
                                                    style={{
                                                        textAlign: 'left',
                                                        paddingLeft: '1rem',
                                                        border: '1px solid #000'
                                                    }}
                                                    colSpan={4}>
                                                    {convertToWords((total + total * 0.05).toFixed(3))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );

}
