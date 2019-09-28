import React, { ReactNode } from "react";
import style from "./style.module.scss";
import classnames from "classnames";

interface IProps {
  children: ReactNode;
  className?: string;
}
const prefixCls = "grid";
const Row: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={classnames(style[`${prefixCls}-row`], className)}>
      {children}
    </div>
  );
};
export default Row;
