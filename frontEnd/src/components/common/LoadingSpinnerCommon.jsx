import React from "react";

const LoadingSpinnerCommon = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;

  return <span className={`loading loading-spinner ${sizeClass}`} />;
};

export default LoadingSpinnerCommon;
