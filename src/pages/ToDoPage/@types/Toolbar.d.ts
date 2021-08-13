interface IToolbar {
  onClickAll?: React.MouseEventHandler<HTMLButtonElement>;
  onClickActive?: React.MouseEventHandler<HTMLButtonElement>;
  onClickCompleted?: React.MouseEventHandler<HTMLButtonElement>;
  showing?: string;
}
