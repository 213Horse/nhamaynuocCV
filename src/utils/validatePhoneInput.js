export const handleInputChange = (e) => {
    const value = e.target.value;
    // Loại bỏ các ký tự không phải số
    const numericValue = value.replace(/[^0-9]/g, '');
    // Giới hạn độ dài chuỗi nhập vào không vượt quá 10 ký tự
    const truncatedValue = numericValue.slice(0, 10);
    this.setState({ inputValue: truncatedValue });
}