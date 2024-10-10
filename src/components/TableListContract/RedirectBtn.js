import { EnvironmentOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const RedirectBtn = ({ keyId, kinhDo, viDo }) => {
  const token = localStorage.getItem("token");
  return (
    <Link
      to={`https://nmn-dev-map.amazingtech.vn?keyId=${keyId}&token=${token}&kinhDo=${kinhDo}&viDo=${viDo}`}
      target="_blank"
    >
      <EnvironmentOutlined />
    </Link>
  );
};

export default RedirectBtn;
