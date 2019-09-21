export interface IDefaultProps<T> extends React.FC<T> {
  initialData: () => any;
}
