// Format ngày/tháng/năm thành chuỗi (dd/mm/yyyy)
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Format Date Obj thành chuỗi (mm/yyyy)
const formatMonth = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${year}`;
};

export { formatDate, formatMonth };
