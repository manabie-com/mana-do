import { Progress } from "antd";
import React from "react";
import "./TodoProgress.css";

type TodoProgressProps = {
  totalTask: number;
  totalCompletedTask: number;
};

const TodoProgress: React.FC<TodoProgressProps> = ({
  totalTask,
  totalCompletedTask,
}) => {
  const countCompletedTaskPercent = (totalCompletedTask / totalTask) * 100;

  return (
    <div className="ToDo__process w-4/6">
      <Progress percent={countCompletedTaskPercent} showInfo={false} />
      <div className="text-center">
        {totalCompletedTask} of {totalTask} task done
      </div>
    </div>
  );
};

export default TodoProgress;
