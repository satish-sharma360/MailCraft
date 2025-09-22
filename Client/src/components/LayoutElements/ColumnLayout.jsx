import { Flame } from "lucide-react";
import React from "react";

const ColumnLayout = ({ layout }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((__dirname, index) => (
          <div className="p-2 flex items-center justify-center bg-gray-100 border border-dashed border-gray-400">{index + 1}</div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
