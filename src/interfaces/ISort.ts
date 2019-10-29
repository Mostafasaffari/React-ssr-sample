export interface ISort {
  sort: boolean;
  sortingColumn: string;
  onSort: (columnName: string, sortOrder: "asc" | "dsc") => void;
  order: "asc" | "dsc";
  previusSortColumn: string;
}
