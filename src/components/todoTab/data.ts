import { TodoStatus } from "models";
import { EnhanceTodoStatus } from "containers/ToDoPage";

interface IDataButton {
  id: string | number;
  title: string;
  status: EnhanceTodoStatus;
}

export const DATA_BUTTONS: Array<IDataButton> = [
  { id: "ALL", title: "ALL", status: "ALL" },
  {
    id: "ACTIVE",
    title: "ACTIVE",
    status: TodoStatus.ACTIVE,
  },
  {
    id: "COMPLETED",
    title: "COMPLETED",
    status: TodoStatus.COMPLETED,
  },
];
