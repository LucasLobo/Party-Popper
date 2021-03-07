import React from "react";
import "./Input.css";

interface InputProps {
  placeholder: string;
  disabled?: boolean;
  readonly?: boolean;
  autoComplete?: boolean;
  className?: string;
  color?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const allowedColors = ["default", "blue"];

const Input: React.FC<InputProps> = ({
  placeholder,
  className,
  disabled = false,
  readonly = false,
  autoComplete = false,
  color = "default",
  value,
  onChange,
}) => {
  const computeClasses: () => string = () => {
    const classArray = ["input"];

    if (disabled) classArray.push("disabled");
    if (allowedColors.includes(color)) classArray.push(color);
    else classArray.push("default");
    if (className) classArray.push(className);

    return classArray.reduce((acc, cur) => `${acc} ${cur}`);
  };

  const classes = computeClasses();

  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoComplete={autoComplete ? "on" : "false"}
      type="input"
      value={value}
      onChange={onChange}
      className={classes}
    />
  );
};

export default Input;
