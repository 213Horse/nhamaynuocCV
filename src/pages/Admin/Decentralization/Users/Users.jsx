import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import TableUser from "./TableUserV2";
import ListFunction from "./ListFunction";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { selectClaims } from "../../../../redux/selector";
import { getAllClaims } from "../../../../redux/slices/claimSlice/claimSlice";

function Users() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // load full list claims -----------------------
  const dispatch = useDispatch();
  const claims = useSelector(selectClaims);

  useEffect(() => {
    dispatch(getAllClaims());
  }, []);
  useEffect(() => {
    console.log("selectedRows", selectedRows);
  }, [selectedRows]);
  //---------------------------------------------

  useEffect(() => {
    // get claims of user
    if (selectedUser) {
      console.log("selectedUser", selectedUser);
      fetch(
        `https://api-awa-v2.amazingtech.vn/api/auth/get-user-claims?UserId=${selectedUser}`
      )
        .then((res) => res.json())
        .then((res) => {
          var result = [];
          res?.map((item, i) => {
            result.push(item.value);
          });
          console.log("result", result);

          // filter selected rows
          setSelectedRows([]);
          var result1 = [];
          claims.map((item, i) => {
            item.claims.map((item2, j) => {
              if (result.includes(item2.value)) {
                result1.push(`${i + 1}.${j + 1}`);
              }
            });
          });
          setSelectedRows(result1); // get key of selected rows
        });
    } else {
      setSelectedRows([]);
    }
  }, [selectedUser]);

  return (
    <>
      <Row gutter={24}>
        <Col span={isTabletOrMobile ? 24 : 12}>
          <TableUser setSelectedUser={setSelectedUser} />
        </Col>
        <Col span={isTabletOrMobile ? 24 : 12}>
          <ListFunction
            selectedUser={selectedUser}
            claims={claims}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </Col>
      </Row>
    </>
  );
}

export default Users;
