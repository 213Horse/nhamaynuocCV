import { Table } from "antd";
import dayjs from "dayjs";

function TableChildReportCustomer({ newCustomers, record, isLoading }) {
  // console.log("newCustomers", newCustomers);
  // console.log("record", record);

  const cols = [
    {
      key: "index",
      title: "",
      width: "6%",
      dataIndex: "index",
    },
    {
      key: "maKhachHangKeyId",
      title: "Mã KH",
      dataIndex: "maKhachHangKeyId",
      width: "6%",
    },
    {
      key: "tenKhachHang",
      title: "Tên KH",
      dataIndex: "tenKhachHang",
      width: "10%",
    },
    {
      key: "hopDongKeyId",
      title: "Số hợp đồng",
      dataIndex: "hopDongKeyId",
      width: "6%",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
      width: "15%",
    },
    {
      key: "soHo",
      title: "Số hộ",
      dataIndex: "soHo",
    },
    {
      key: "soNhanKhau",
      title: "Số nhân khẩu",
      dataIndex: "soNhanKhau",
    },
    {
      key: "dienThoai",
      title: "Số điện thoại",
      dataIndex: "dienThoai",
    },
    {
      key: "soCmnd",
      title: "Số CMND",
      dataIndex: "soCmnd",
    },
    {
      key: "ngayCap",
      title: "Ngày cấp",
      dataIndex: "ngayCap",
    },
    {
      key: "noiCapCmnd",
      title: "Nơi cấp",
      dataIndex: "noiCapCmnd",
    },
    {
      key: "ngayLapDat",
      title: "Ngày lắp đặt",
      dataIndex: "ngayLapDat",
    },
  ];

  return (
    <Table
      // key="stt"
      columns={cols}
      bordered={true}
      loading={isLoading}
      dataSource={newCustomers?.data
        ?.filter((__customer) => __customer.keyId === record.keyId)
        ?.map((_customer, index) => ({
          stt: index + 1,
          maKhachHangKeyId: _customer.keyId,
          tenKhachHang: _customer.tenKhachHang,
          hopDongKeyId: _customer.keyId,
          diaChi: _customer.diaChi,
          soHo: _customer.soHo,
          soNhanKhau: _customer.soKhau,
          dienThoai: _customer.dienThoai,
          soCmnd: _customer.soCmnd,
          ngayCap:
            _customer.ngayCapCmnd === ""
              ? ""
              : dayjs(_customer.ngayCapCmnd).format("YYYY-MM-DD"),
          noiCapCmnd: _customer.noiCapCmnd,
          ngayLapDat:
            _customer?.hopDongs[0]?.ngayLapDat === ""
              ? ""
              : dayjs(_customer?.hopDongs[0]?.ngayLapDat).format("DD/MM/YYYY"),
        }))}
      pagination={false}
      rowKey="stt"
      size="small"
      scroll={{
        x: 2600,
      }}
      defaultExpandAllRows={true}
      defaultExpandedRowKeys={["0"]}
    />
  );
}

export default TableChildReportCustomer;
