import React, { useState } from "react";

import Row from "./row";
import Col from "./col";

import style from "./style.module.scss";

interface IColumn {
  name: string;
  sortingColumn?: string;
  sortOrderDefault: "asc" | "desc";
  fieldName: string;
}

interface IProps {
  columns: IColumn[];
  data: any[];
  onEdit?: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDetail?: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDelete?: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const prefixCls = "grid";
const Grid: React.FC<IProps> = ({
  data,
  onEdit,
  onDetail,
  onDelete,
  columns
}) => {
  const [sortOrder, setSortOrder] = useState<{
    fieldName: string;
    order: "asc" | "dsc";
  }>({ fieldName: "", order: "asc" });

  const sorting = (columnName: string, sortOrder: "asc" | "dsc") => {
    data.sortList(columnName, sortOrder);
    setSortOrder({ fieldName: columnName, order: sortOrder });
  };

  return (
    <Row className={style[`${prefixCls}-head`]}>
      {columns.length > 0 &&
        columns.map((item, index) => {
          <Col
            sort={{
              onSort: sorting,
              sortingColumn: item.sortingColumn ? item.sortingColumn : "",
              order: sortOrder.order || "asc",
              sort: item.sortingColumn ? true : false,
              previusSortColumn: sortOrder.fieldName
            }}
          >
            <span>{item.name}</span>
          </Col>;
        })}
      {onEdit && (
        <Col className={style[`${prefixCls}-head--action`]}>
          <span>Edit</span>
        </Col>
      )}
      {onDetail && (
        <Col className={style[`${prefixCls}-head--action`]}>
          <span>Detail</span>
        </Col>
      )}
    </Row>
  );
};
export default Grid;
