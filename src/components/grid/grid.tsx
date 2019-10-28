import React from "react";

interface IProps {
  data: any[];
  onEdit: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDetail: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDelete: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Grid: React.FC<IProps> = ({ data, onEdit, onDetail, onDelete }) => {
  return <div>grid</div>;
};
export default Grid;
