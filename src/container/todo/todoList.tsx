import React, { useState } from "react";

import { IDefaultProps } from "../../interfaces/IDefaultProps";
import { Todo } from "../../entities/todo";

import { getTodoList } from "../../services/todoApi";
import Row from "../../components/grid/row";
import Col from "../../components/grid/col";

import style from "./style.module.scss";


const prefixCls = "home";

interface IProps {
  todoList: Todo[];
}
const TodoList: IDefaultProps<IProps> = ({ todoList }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "dsc">("asc");
  const [sortColumn, setSortColumn] = useState();

  const sorting = (columnName: string, sortOrder: "asc" | "dsc") => {
    todoList.sortList(columnName, sortOrder);
    setSortColumn(columnName);
    setSortOrder(sortOrder);
  };
  const handleModalEdit = (id: string) => (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {};

  const handleModal = (id: string) => (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
   
  };
  const handleCloseModal = () => {
  
  };
  return (
    <React.Fragment>
      <div className={style[`${prefixCls}-wrapper`]}>
        <div className={style[`${prefixCls}-todolist`]}>
          <Row className={style[`${prefixCls}-todolist--head`]}>
            <Col
              sort={{
                onSort: sorting,
                sortingColumn: "id",
                order: sortOrder || "asc",
                sort: true,
                previusSortColumn: sortColumn
              }}
            >
              <span>Id</span>
            </Col>
            <Col>
              <span>title</span>
            </Col>
            <Col
              sort={{
                onSort: sorting,
                sortingColumn: "description",
                order: sortOrder || "asc",
                sort: true,
                previusSortColumn: sortColumn
              }}
            >
              <span>date</span>
            </Col>
            <Col className={style[`${prefixCls}-todolist--action`]}>
              <span>Edit</span>
            </Col>
            <Col className={style[`${prefixCls}-todolist--action`]}>
              <span>Detail</span>
            </Col>
          </Row>
          {todoList &&
            todoList.length &&
            todoList.map((item, index) => (
              <Row
                key={index}
                className={
                  index % 2 === 0
                    ? style[`${prefixCls}-todolist-body--alter`]
                    : ""
                }
              >
                <Col>{item.id}</Col>
                <Col>{item.title}</Col>
                <Col>{item.description}</Col>
                <Col>{item.date}</Col>
                <Col className={style[`${prefixCls}-todolist-body--action`]}>
                  <span onClick={handleModalEdit(item.id)} id={item.id}>
                    Edit
                  </span>
                </Col>
                <Col className={style[`${prefixCls}-todolist-body--action`]}>
                  <span onClick={handleModal(item.id)} id={item.id}>
                    Detail
                  </span>
                </Col>
              </Row>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

TodoList.initialData = async () => {
  const data: Todo[] = await getTodoList();
  return { todoList: data };
};

export default TodoList;
