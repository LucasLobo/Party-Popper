import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  secondary: string;
}

const Header: React.VFC<HeaderProps> = ({ title, secondary }) => {
  return (
    <div className="header">
      <span>{title}</span>
      <span>{secondary}</span>
    </div>
  );
};

export default Header;
