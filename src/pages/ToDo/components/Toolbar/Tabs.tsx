import React from "react";
import Button from "../../../../components/Forms/Button";
import { TodoStatus } from "../../../../models/todo";

function ToDoToolbarTabs(props: any) {
  const { setShowing } = props;
  return (
    <div className="Todo__tabs">
      <Button
        className="Action__btn"
        title="All"
        onClick={() => setShowing("ALL")}
      />

      <Button
        className="Action__btn"
        title="Active"
        onClick={() => setShowing(TodoStatus.ACTIVE)}
      />

      <Button
        className="Action__btn"
        title="Completed"
        onClick={() => setShowing(TodoStatus.COMPLETED)}
      />
    </div>
  );
}

export default ToDoToolbarTabs;
