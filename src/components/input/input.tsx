import React from "react";
import classnames from "classnames";

import style from "./style.module.scss";

interface IProps {
  type: "text" | "email" | "number" | "password";
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
const Input: React.FC<IProps> = ({
  type,
  className,
  onChange,
  defaultValue
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={defaultValue}
      className={classnames(style["input"], className)}
    />
  );
};
export default Input;
