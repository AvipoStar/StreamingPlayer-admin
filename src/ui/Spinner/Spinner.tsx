import React from "react";
import "./Spinner.css";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = "#000" }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid ${color}`,
    borderTop: "4px solid transparent",
    borderRadius: "50%",
  };

  return <div className="spinner" style={style}></div>;
};

export default Spinner;
