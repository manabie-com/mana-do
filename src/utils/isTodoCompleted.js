import { TodoStatus } from "../constant";

export default function isTodoCompleted(status) {
  return status === TodoStatus.COMPLETED;
}
