import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  secondary?: string;
  className?: string;
  color: string;
}

const allowedColors = ["default", "blue", "red", "green"];

const Header: React.VFC<HeaderProps> = ({
  title,
  secondary,
  className,
  color,
}) => {
  const classes = `header ${className} ${
    secondary ? "header-double" : "header-single"
  } ${allowedColors.includes(color) ? color : "default"}`;
  return (
    <div className={classes}>
      <span>{title}</span>
      <span>{secondary}</span>
    </div>
  );
};

export default Header;
