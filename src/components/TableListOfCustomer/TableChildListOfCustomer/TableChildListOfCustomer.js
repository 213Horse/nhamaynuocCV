import { Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function TableChildListOfCustomer({ listOfCustomer, record, isLoading }) {
  const [customers, setCustomers] = useState([]);

  console.log("customers", customers);

  const cols = [
    // {
    //   key: "stt",
    //   title: "",
    //   dataIndex: "stt",
    //   width: "1%",
    // },
    {
      key: "empty",
      title: "",
      dataIndex: "",
      width: "0%", // Điều chỉnh giá trị này để thay đổi khoảng cách
    },
    {
      key: "keyId",
      title: "Mã đồng hồ",
      dataIndex: "keyId",
      width: "6%",
    },
    {
      key: "loaiDongHo",
      title: "Loại đồng hồ",
      dataIndex: "loaiDongHo",
    },
    {
      key: "doiTuongGiaKeyId",
      title: "Đối tượng giá",
      dataIndex: "doiTuongGiaKeyId",
    },
    {
      key: "kichCo", // chưa thấy
      title: "Kích cỡ",
      dataIndex: "kichCo",
    },
    {
      key: "trangThaiSuDung",
      title: "Tình trạng",
      dataIndex: "trangThaiSuDung",
    },
    {
      key: "ghiChu",
      title: "Ghi chú",
      dataIndex: "ghiChu",
    },
    {
      key: "nguoiQuanLyId", // chưa pop
      title: "Cán bộ đọc",
      dataIndex: "nguoiQuanLyId",
    },
    {
      key: "tuyenDoc",
      title: "Tuyến đọc",
      dataIndex: "tuyenDoc",
    },
    {
      key: "chiSoCuoi",
      title: "Chỉ số cuối",
      dataIndex: "chiSoCuoi",
    },
    {
      key: "ngaySuDung",
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
    },
    {
      key: "seriDongHo",
      title: "Seri đồng hồ",
      dataIndex: "seriDongHo",
    },
  ];

  // handle row
  useEffect(() => {
    const _customerList = listOfCustomer?.data?.filter(
      (__customer) => __customer.keyId === record.hopDongKeyId
    );

    setCustomers(_customerList[0]);
  }, [listOfCustomer, record.hopDongKeyId]);

  return (
    <Table
      //key="keyId"
      columns={cols}
      bordered={true}
      loading={isLoading}
      dataSource={customers?.dongHoNuocs?.map((_clock, index) => ({
        keyId: _clock?.keyId,
        loaiDongHo:
          _clock?.loaiDongHoId === 1
            ? "Tổng"
            : _clock.loaiDongHoId === 2
            ? "Block"
            : "Hộ dân",
        kichCo: _clock?.duongKinh,
        trangThaiSuDung:
          _clock.trangThaiSuDung === 1 ? (
            <p className="status-normal-water-clock">Đang sử dụng</p>
          ) : _clock.trangThaiSuDung === 2 ? (
            <p className="status-cancel-water-clock">Ngưng sử dụng</p>
          ) : (
            <p className="status-cancel-water-clock">Hủy</p>
          ),
        ghiChu: _clock.ghiChu,
        chiSoCuoi: _clock.chiSoCuoi,
        ngaySuDung: dayjs(_clock.ngaySuDung).format("YYYY-MM-DD"),
        seriDongHo: _clock.seriDongHo,
      }))}
      pagination={false}
      rowKey="keyId"
      size="small"
      scroll={{
        x: 2400,
      }}
      style={{ marginLeft: "0px" }}
      defaultExpandAllRows={true}
      defaultExpandedRowKeys={["0"]}
    />
  );
}

export default TableChildListOfCustomer;
