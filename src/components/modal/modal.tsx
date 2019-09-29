import React, { ReactNode } from "react";
import style from "./style.module.scss";
import classnames from "classnames";

interface IProps {
  children: ReactNode;
  className?: string;
  showModal: boolean;
  handleCloseModal: () => void;
}
const prefixCls = "modal";
const Modal: React.FC<IProps> = ({
  children,
  className,
  showModal,
  handleCloseModal
}) => {
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <>
      {showModal ? (
        <div
          className={classnames(style[`${prefixCls}-wrapper`], className)}
          onClick={handleCloseModal}
        >
          <div className={style[`${prefixCls}-inner`]} onClick={handleBoxClick}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
