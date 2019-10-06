import React, { useState } from "react";

import { IDefaultProps } from "../../interfaces/IDefaultProps";
import { Todo } from "../../entities/todo";

import { getTodoList, updateTodoName_api } from "../../services/todoApi";
import Row from "../../components/grid/row";
import Col from "../../components/grid/col";
import Modal from "../../components/modal";
import Button from "../../components/button";

import style from "./style.module.scss";

const prefixCls = "home";

interface IProps {
  todoList: Todo[];
}
const TodoList: IDefaultProps<IProps> = ({ todoList }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "dsc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [todoForEdit, setTodoForEdit] = useState<Todo | undefined>(undefined);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoSelected, setTodoSelected] = useState<Todo | undefined>(undefined);

  const sorting = (columnName: string, sortOrder: "asc" | "dsc") => {
    todoList.sortList(columnName, sortOrder);
    setSortColumn(columnName);
    setSortOrder(sortOrder);
  };
  const handleModalEdit = (id: string) => (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const todo = todoList.find(s => s.id === id);
    setTodoForEdit(todo);
    setTodoTitle(todo!.title);
  };

  const handleModal = (id: string) => (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    const todo = todoList.find(s => s.id === id);
    setTodoSelected(todo);
  };
  const handleCloseModal = () => {
    setTodoForEdit(undefined);
    setTodoSelected(undefined);
  };

  const handleTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };
  const handleEditName = async () => {
    todoForEdit!.title = todoTitle;
    await updateTodoName_api(todoForEdit!.id, todoForEdit!);
    setTodoForEdit(undefined);
    setTodoTitle("");
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
            <Col>
              <span>description</span>
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
      {todoSelected && (
        <Modal
          showModal={todoSelected && Object.keys(todoSelected).length > 0}
          handleCloseModal={handleCloseModal}
        >
          <div className={style[`${prefixCls}-show`]}>
            <h4>{todoSelected.title}</h4>
            <hr />
            <span>{todoSelected.description}</span>
            <span>{new Date(todoSelected.date).toDateString()}</span>
          </div>
        </Modal>
      )}

      {todoForEdit && (
        <Modal
          showModal={todoForEdit && Object.keys(todoForEdit).length > 0}
          handleCloseModal={handleCloseModal}
        >
          <div className={style[`${prefixCls}-show`]}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={todoTitle}
              onChange={handleTodoTitle}
              type="text"
            />
            <Button onClick={handleEditName} type="button" text="Change" />
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

TodoList.initialData = async () => {
  const data: Todo[] = await getTodoList();
  return { todoList: data };
};

export default TodoList;
