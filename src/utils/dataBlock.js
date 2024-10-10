// data.js
export const initialData = Array.from({ length: 100 }, (_, i) => {
  return {
    key: "1",
    stt: i + 1,
    mablock: `  Mã block ${i + 1}`,
    tenblock: `Tên block ${i + 1}`,
    diachi: `Địa chỉ ${i + 1}`,
    makh: `Mã khách hàng ${i + 1}`,
    tenkhach: `Tên khách hàng ${i + 1}`,
    tuyendoc: `Tuyến đọc ${i + 1}`,
    tienthu: `Tiêu thụ ${i + 1}`,
    canbodoc: `Cán bộ đọc ${i + 1}`,
    seri: `Seri ${i + 1}`,
    sohieu: `Số hiệu ${i + 1}`,
    kieudongho: `Kiểu đồng hồ ${i + 1}`,
    trong: ` Trống ${i + 1}`,
  };
});
