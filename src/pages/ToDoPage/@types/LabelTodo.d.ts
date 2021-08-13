interface ILabelTodo {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  todos?: Array<Todo>;
  hasCheckAll?: boolean;
  title?: string;
}
