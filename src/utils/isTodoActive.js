import { TodoStatus } from "../constant";

export default function isTodoActive(status) {
  return status === TodoStatus.ACTIVE;
}
