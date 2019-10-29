import React, { ReactNode } from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import { ISort } from "../../interfaces/ISort";


interface IProps {
  children: ReactNode;
  className?: string;
  sort?: ISort;
}
const prefixCls = "grid";
const Col: React.FC<IProps> = ({ children, className, sort }) => {
  const handleSort = () => {
    const ordering =
      sort!.sortingColumn === sort!.previusSortColumn
        ? sort!.order === "asc"
          ? "dsc"
          : "asc"
        : sort!.order;
    sort!.onSort(sort!.sortingColumn, ordering);
  };
  return (
    <div className={classnames(style[`${prefixCls}-row-col`], className)}>
      {sort && (
        <img
          alt="sort"
          className={style[`${prefixCls}-row-col--sort`]}
          onClick={handleSort}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAhFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu3R4CAAAAK3RSTlMAE8kvDwEQIt0CyOvOMM/spZrNLcLH6pzkm4GdEp6IyqAU4KlwCDEg59unKbifZQAAAIhJREFUKM9jYKAFEJYQYcEmziymrS0kg0WcWxsIeBjRxXnB4pgyvPzaUMCHIqMGFwfKKCLEOTW0kYAykg4tDgTQVCHGb6rsCKDOihBnVUK2QwFJggtZQg7JKDZ5hLgsJ7IlbEwwcWlOVOthMuKc6A5jAdsjyYnpZBZRbW1BTmyeYRGQYqVJCgAAXCsU5F89hH8AAAAASUVORK5CYII="
        />
      )}
      {children}
    </div>
  );
};
export default Col;
