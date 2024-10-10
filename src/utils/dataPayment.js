const dataPayment = Array.from({ length: 20 }, (val, key) => {
  return {
    id: key,
    status_payment: "Đã TT",
    fall_day: "22/07/2023",
    collector: "KT Nguyễn Thị Thúy",
    total: 450000,
    amount_spent: 450000,
    code_contract: "HD49846156",
    line_reading: "baovinh",
    fullName: "Nguyễn Thị Bích Hậu",
    address: "Bảo Vinh - Bảo Hà - Bảo Yên - Bảo Hà",
    phone: "0356451264",
    payments: "Tiền mặt",
    seri_bill: "MT/21E",
    num_bill: "0068975",
    consume: "55",
    into_money: 450000,
    dtdn: 0,
    bvmt: 0,
    vat: 200,
    date_of_contract: "03/07/2023",
    note: "",
  };
});

// data on modal when double click row
const dataOnModalDoubleClick = Array.from({ length: 20 }, (val, key) => {
  return {
    id: key,
    category: `Hạng mục ${key}`,
    quantity: "23",
    price: 450000000,
    into_money: 450000000,
  };
});

export { dataPayment, dataOnModalDoubleClick };
