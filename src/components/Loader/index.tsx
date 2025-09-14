import React from "react";
import "./Loader.scss";

const Loader: React.FC<{ color?: string }> = ({ color = "#3498db" }) => (
  <div className="loader-container">
    <div
      className="loader-spinner"
      style={{ borderTop: `4px solid ${color}` }}
    />
  </div>
);

export default Loader;
