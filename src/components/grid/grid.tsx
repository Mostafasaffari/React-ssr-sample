import React from "react";
import { ISort } from "../../interfaces/ISort";

interface IProps {
  columns: { name: string; sort: ISort; fieldName: string }[];
  data: any[];
  onEdit: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDetail: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
  onDelete: (id: string) => (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Grid: React.FC<IProps> = ({ data, onEdit, onDetail, onDelete }) => {
  return <div>grid</div>;
};
export default Grid;
