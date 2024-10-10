export const data = Array.from({ length: 500 }, (_, index) => ({
  key: index,
  stt: index + 1,
  contractNumber: `Số hợp đồng ${index}`,
  codeClock: `Mã ĐH ${index}`,
  readingRoute: `Tuyến đọc ${index}`,
  username: `Tên KH ${index}`,
  address: `Địa chỉ ${index}`,
  oldIndex: `Chỉ số cũ ${index}`,
  newIndex: `Chỉ số mới ${index}`,
  consumption: `Tiêu thụ ${index}`,
  codePrice: `Mã ĐT giá ${index}`,
}));