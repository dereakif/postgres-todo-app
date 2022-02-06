import { ClockCircleOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { timeAgo } from "../../utils/date";

function UpdatedAt({ timestamp }) {
  const [updateTimer, setUpdateTimer] = useState(0);
  const calculatedTimestamp = useMemo(() => timeAgo(timestamp), [updateTimer]);

  return (
    <Tooltip title="Click to update elapsed time">
      <Tag icon={<ClockCircleOutlined />} color="default">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setUpdateTimer((s) => s + 1)}
        >
          last changed {calculatedTimestamp}
        </span>
      </Tag>
    </Tooltip>
  );
}

export default UpdatedAt;
