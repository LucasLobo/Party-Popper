import React from "react";
import "./Button.css";

interface ButtonProps {
  className?: string;
  label: string;
  disabled?: boolean;
  color?: string;
  onClick: () => void;
}

const allowedColors = ["default", "blue"];

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  onClick,
  color = "default",
  disabled = false,
}) => {
  const computeClasses: () => string = () => {
    const classArray = ["button"];

    if (disabled) classArray.push("disabled");
    if (allowedColors.includes(color)) classArray.push(color);
    else classArray.push("default");
    if (className) classArray.push(className);

    return classArray.reduce((acc, cur) => `${acc} ${cur}`);
  };

  const classes = computeClasses();

  const handleClick: () => void = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      {label}
    </button>
  );
};

export default Button;
