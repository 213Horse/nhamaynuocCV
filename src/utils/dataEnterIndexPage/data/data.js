// data.js
export const initialData = Array.from({ length: 100 }, (_, i) => {
  return {
    key: "1",
    imageAndStatus: ``,
    imagePath: "",
    order: i + 1,
    readingLine: `Tuyến đọc ${i + 1}`,
    contractNumber: `Số hợp đồng ${i + 1}`,
    clockSen: `Sen đồng hồ ${i + 1}`,
    customerName: `Tên khách hàng ${i + 1}`,
    address: `Địa chỉ ${i + 1}`,
    moneyCollected: `Tiền thu ${i + 1}`,
    oldIndex: `Chỉ số cũ ${i + 1}`,
    newIndex: `Chỉ số mới ${i + 1}`,
    consumption: `Tiêu thụ ${i + 1}`,
    readingDate: `Ngày đọc ${i + 1}`,
    ttd: `Trạng thái đọc ${i + 1}`,
    ndk: `Ngày đầu kì ${i + 1}`,
    nck: `Ngày cuối kì ${i + 1}`,
    ttdh: `Trạng thái ĐH ${i + 1}`,
    gc: `Ghi chú ${i + 1}`,
  };
});
