import React, { FC } from "react";
import { BlockShadow, Button } from "../../../../components";
import { TodoStatus } from "../../../../constants/todo";
import { LabelTodo } from "../LabelTodo/LabelTodo";
import "./Toolbar.scss";

export const Toolbar: FC<IToolbar> = ({
  onClickAll,
  onClickActive,
  onClickCompleted,
  showing,
}) => {
  return (
    <BlockShadow className="toolbar">
      <LabelTodo title="Status" />
      <div className="toolbar__container">
        <Button onClick={onClickAll} isWhite={showing !== "ALL"}>
          All
        </Button>
        <Button onClick={onClickActive} isWhite={showing !== TodoStatus.ACTIVE}>
          Active
        </Button>
        <Button
          onClick={onClickCompleted}
          isWhite={showing !== TodoStatus.COMPLETED}
        >
          Completed
        </Button>
      </div>
    </BlockShadow>
  );
};
