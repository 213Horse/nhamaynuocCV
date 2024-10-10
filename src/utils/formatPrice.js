//* get the value in group number format
const formatPrice = (number) => {
  if (number) {
    return (
      parseFloat(number.toFixed(2)).toLocaleString("en", {
        useGrouping: true,
      }) + " VNĐ"
    );
  }
};

export { formatPrice };
