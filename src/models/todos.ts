export interface Todos {
  id?: string;
  content: string;
  user_id: string;
  status: any;
  created_date: string;
}
export interface PropsTodosChild {
  valueRow: Todos[] | undefined;
  onClose: () => void;
  visible: boolean;
  handleUpdate: () => void;
}

export interface PropsTodos {
  todosValue: string;
  valueRow: Todos[] | undefined;
  onClose: () => void;
  visible: boolean;
  todos: Todos[] | undefined;
  todosTemp: Todos[] | undefined;
  columns: any;
  rowSelection: any;
  handleUpdate: () => void;
  handleRadio: (e: any) => void;
  radio: string;
  loading: boolean;
  showDrawer: () => void;
  selectedRowKeys: any;
  handleTodosValue: (e: any) => void;
  handleAll: () => void;
  handleComplete: (status: string) => void;
  handleDeleteAll: () => void;
}
