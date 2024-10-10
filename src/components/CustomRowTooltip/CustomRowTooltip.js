import { Tooltip } from "antd";
import { useMediaQuery } from "react-responsive";

function CustomRowTooltip(props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  return (
    <>
      <Tooltip
        title={isTabletOrMobile ? "" : "Nhấn đúp chuột để xem thông tin."}
      >
        <tr {...props} />
      </Tooltip>
    </>
  );
}

export default CustomRowTooltip;
