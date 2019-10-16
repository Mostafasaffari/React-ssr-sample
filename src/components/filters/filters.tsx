import React from "react";

import style from "./style.module.scss";

interface IProps {
  onSubmitFilter: (
    title: string,
    description: string
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Filters: React.FC<IProps> = ({ onSubmitFilter }) => {
  let title: string = "";
  let description: string = "";

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    title = e.target.value;
  };
  const setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    description = e.target.value;
  };
  return (
    <div className={style["filters-wrapper"]}>
      <input type="text" placeholder="Task Title" onChange={setTitle} />
      <input
        type="text"
        placeholder="Task Description"
        onChange={setDescription}
      />
      <button onClick={onSubmitFilter(title, description)}></button>
    </div>
  );
};

export default Filters;
