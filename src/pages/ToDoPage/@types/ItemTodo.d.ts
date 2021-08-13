interface IItemTodo {
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onChangeChecbox?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  editing?: boolean;
  valueContent?: string | null;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
  toDoContent?: string;
  handleChangeContentTodo?: React.ChangeEventHandler<HTMLInputElement>;
  handleUpdateContentTodo?: React.KeyboardEventHandler<HTMLInputElement>;
}
