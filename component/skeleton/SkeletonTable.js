import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTable = ({ numRows, numColumns, color }) => {
  const skeletonRows = Array.from({ length: numRows }).map((_, i) => (
    <div key={i}>
      {Array.from({ length: numColumns }).map((_, j) => (
        <p key={j}>
          <Skeleton height={20} style={{ marginTop: "10px" }} color={color} />
        </p>
      ))}
    </div>
  ));

  return <div>{skeletonRows}</div>;
};

export default SkeletonTable;