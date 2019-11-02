export interface ISort {
  sort: boolean;
  sortingColumn: string;
  onSort: (columnName: string, sortOrder: "asc" | "dsc") => void;
  order: "asc" | "dsc";
  previusSortColumn: string;
}

export interface IColumn {
  name: string;
  sortingColumn?: string;
  sortOrderDefault: "asc" | "desc";
  fieldName: string;
}
