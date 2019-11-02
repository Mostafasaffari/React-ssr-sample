import React, { useState } from "react";

import { IDefaultProps } from "../../interfaces/IDefaultProps";
import { Todo } from "../../entities/todo";

import { getTodoList, updateTodoName_api } from "../../services/todoApi";
import Row from "../../components/grid/row";
import Col from "../../components/grid/col";
import Modal from "../../components/modal";
import Button from "../../components/button";

import style from "./style.module.scss";
import Input from "../../components/input/input";
import Filters from "../../components/filters/filters";
import Grid from "../../components/grid";
import { IColumn } from "../../interfaces/GridInterfaces";

const prefixCls = "home";

const todoListColumn: IColumn[] = [
  {
    fieldName: "id",
    name: "Id",
    sortOrderDefault: "asc",
    sortingColumn: "id"
  },
  {
    fieldName: "title",
    name: "Title",
    sortOrderDefault: "asc"
  },
  {
    fieldName: "description",
    name: "Description",
    sortOrderDefault: "asc"
  },
  {
    fieldName: "date",
    name: "Date",
    sortOrderDefault: "asc",
    sortingColumn: "date"
  }
];

interface IProps {
  todoList: Todo[];
}
const TodoList: IDefaultProps<IProps> = ({ todoList }) => {
  const [todoForEdit, setTodoForEdit] = useState<Todo | undefined>(undefined);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoSelected, setTodoSelected] = useState<Todo | undefined>(undefined);
  const [filterTodoList, setFilterTodoList] = useState<Todo[]>(todoList);

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
  const handleFilterSubmition = (title: string, description: string) => {
    if (title || description) {
      const newList = todoList.filter(s => {
        if (title) return s.title.toLowerCase().includes(title.toLowerCase());
        else if (description)
          return s.description
            .toLowerCase()
            .includes(description.toLowerCase());
        else return false;
      });
      setFilterTodoList(newList);
    } else {
      setFilterTodoList(todoList);
    }
  };

  return (
    <React.Fragment>
      <div className={style[`${prefixCls}-wrapper`]}>
        <Filters onSubmitFilter={handleFilterSubmition} />
        <Grid
          columns={todoListColumn}
          data={filterTodoList}
          onDetail={handleModal}
          onEdit={handleModalEdit}
        />
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
            <Input
              type="text"
              onChange={handleTodoTitle}
              defaultValue={todoTitle}
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
