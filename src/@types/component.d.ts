interface IHeader {
  title: string;
}

interface IActionButton {
  actionBtn: IBtn;
  statusCheck?: string;
  border?: string;
  boxShadow?: string;
}

interface IBtn {
  title: string;
  status?: string;
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

interface ITodoItem {
  id: string | undefined;
  content: string;
  checked: boolean;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onClick: () => void;
  onKeyDown?:
  | ((
      event:  React.KeyboardEvent<HTMLInputElement>, text?: string
    ) => void)
  | undefined;
  idClick?: string;
  setIdClick?: any;
  handleEditTodos: (todo: TodoEdited) => void;
}
