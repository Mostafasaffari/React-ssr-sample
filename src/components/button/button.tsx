import React from "react";
import classnames from "classnames";

import style from "./style.module.scss";

interface IProps {
  type: "button" | "submit";
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button: React.FC<IProps> = ({ type, text, className, onClick }) => {
  return (
    <button
      type={type}
      className={classnames(style["button"], className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
