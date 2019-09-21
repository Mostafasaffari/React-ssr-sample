interface IProps<T> {
  staticContext?: { initialServerData: T };
}
export interface IDefaultProps<T> extends React.FC<IProps<T>> {
  initialData: () => any;
}
