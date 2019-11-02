import React, { useState } from "react";

import Row from "./row";
import Col from "./col";

import style from "./style.module.scss";
import { IColumn } from "../../interfaces/GridInterfaces";

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
    <div className={style[`${prefixCls}`]}>
      <Row className={style[`${prefixCls}-head`]}>
        {columns.length > 0 &&
          columns.map((item, index) => (
            <Col
              key={index}
              sort={{
                onSort: sorting,
                sortingColumn: item.sortingColumn ? item.sortingColumn : "",
                order: sortOrder.order || "asc",
                sort: item.sortingColumn ? true : false,
                previusSortColumn: sortOrder.fieldName
              }}
            >
              <span>{item.name}</span>
            </Col>
          ))}
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
        {onDelete && (
          <Col className={style[`${prefixCls}-head--action`]}>
            <span>Delete</span>
          </Col>
        )}
      </Row>
      {data &&
        data.map((item, index) => (
          <Row
            key={index}
            className={index % 2 === 0 ? style[`${prefixCls}-body--alter`] : ""}
          >
            {columns.length > 0 &&
              columns.map((col, colIndex) => (
                <Col key={colIndex}>{item[col.fieldName]}</Col>
              ))}
            {onEdit && (
              <Col className={style[`${prefixCls}-body--action`]}>
                <span onClick={onEdit(item.id)} id={`edit-${item.id}`}>
                  Edit
                </span>
              </Col>
            )}
            {onDetail && (
              <Col className={style[`${prefixCls}-body--action`]}>
                <span onClick={onDetail(item.id)} id={`detail-${item.id}`}>
                  Detail
                </span>
              </Col>
            )}
            {onDelete && (
              <Col className={style[`${prefixCls}-head--action`]}>
                <span onClick={onDelete(item.id)} id={`delete-${item.id}`}>
                  Detail
                </span>
              </Col>
            )}
          </Row>
        ))}
    </div>
  );
};
export default Grid;
