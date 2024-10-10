import { Form, Input } from "antd";
const AdvancedSearchForm = ({ searchQuery, setSearchQuery }) => {
  const layout = {
    labelCol: {
      span: 13,
    },
    wrapperCol: {
      span: 30,
    },
  };
  return (
    <Form {...layout}>
      <Form.Item
        lassName="custom-form-item"
        label="Nhập mã đồng hồ cần tìm kiếm"
        name="9"
      >
        <Input
          value={searchQuery}
          style={{
            width: "100%",
          }}
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Item>
    </Form>
  );
};
export default AdvancedSearchForm;
