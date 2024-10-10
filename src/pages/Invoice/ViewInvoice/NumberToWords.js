const units = [
  "",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];
const tens = ["", "", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const powersOfTen = ["", "", " nghìn", " triệu", " tỷ"];

function convertGroupOfThreeDigits(group) {
  const [hundreds, tensDigit, ones] = group;

  let result = "";

  if (hundreds !== 0) {
    result += units[hundreds] + " trăm ";
  }

  if (tensDigit === 1) {
    if (ones === 0) {
      result += "mười ";
    } else {
      result += "mười " + units[ones] + " ";
    }
  } else if (tensDigit > 1) {
    result += tens[tensDigit] + " mươi ";
    if (ones !== 0) {
      result += units[ones] + " ";
    }
  } else if (ones !== 0) {
    // Fix here for the case when tensDigit is 0
    if (hundreds !== 0) {
      result += "lẻ " + units[ones] + " ";
    } else {
      result += units[ones] + " ";
    }
  }

  return result.trim();
}




export function convertToWords(number) {
  if (number === 0) {
    return "không đồng";
  }

  number = number * 1000 + "";
  var numCharMiss = number.length % 3;
  if (numCharMiss > 0) {
    for (var i = 0; i < 3 - numCharMiss; i++) {
      number = "0" + number;
    }
  }

  const numberStr = String(number);
  const groups = [];
  let group = [];
  let digitsInGroup = 0;

  for (let i = numberStr.length - 1; i >= 0; i--) {
    group.unshift(Number(numberStr[i]));
    digitsInGroup++;

    if (digitsInGroup === 3 || i === 0) {
      groups.unshift(group);
      group = [];
      digitsInGroup = 0;
    }
  }

  let result = "";

  for (let i = 0; i < groups.length; i++) {
    const groupWords = convertGroupOfThreeDigits(groups[i]);

    if (groupWords !== "") {
      result += groupWords + powersOfTen[groups.length - 1 - i] + " ";
    }
  }

  return result.trim() + " đồng";
}

// const amount = 472.005;
// const amountInWords = convertToWords(amount);

// console.log(`${amount.toLocaleString('vi-VN')} đồng = ${amountInWords}`);
