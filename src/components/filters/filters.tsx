import React from "react";

import style from "./style.module.scss";

interface IProps {
  onSubmitFilter: (title: string, description: string) => void;
}

const Filters: React.FC<IProps> = ({ onSubmitFilter }) => {
  let title: string;
  let description: string;

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    title = e.target.value;
  };
  const setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    description = e.target.value;
  };
  const handleSetFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onSubmitFilter(title, description);
  };
  return (
    <div className={style["filters-wrapper"]}>
      <input type="text" placeholder="Task Title" onChange={setTitle} />
      <input
        type="text"
        placeholder="Task Description"
        onChange={setDescription}
      />
      <button onClick={handleSetFilter}>Filter</button>
    </div>
  );
};

export default Filters;
