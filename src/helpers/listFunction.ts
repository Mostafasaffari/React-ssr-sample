interface Array<T> {
  sortList: (columnName: string, sortOrder: "asc" | "dsc") => T[];
}
Array.prototype.sortList = function<T>(
  columnName: string,
  sortOrder: "asc" | "dsc"
): T[] {
  this.sort((a, b) => {
    if (a[columnName] > b[columnName]) return -1;
    if (a[columnName] < b[columnName]) return 1;
    return 0;
  });
  if (sortOrder === "asc") this.reverse();

  return this;
};
