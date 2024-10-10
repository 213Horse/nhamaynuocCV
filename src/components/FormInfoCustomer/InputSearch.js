import { Form, Input } from "antd";

function InputSearch({ handleOnSearch, handleOnChange }) {
  return (
    <>
      <Form.Item>
        <Input.Search
          placeholder="Nhập tên khách hàng..."
          style={{
            marginRight: "5px",
            width: "50%",
            float: "right",
          }}
          onSearch={handleOnSearch}
          onChange={handleOnChange}
        />
      </Form.Item>
    </>
  );
}

export default InputSearch;
