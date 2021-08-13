interface IInput {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  name?: string;
  id?: string;
  label?: string;
  className?: string;
  type?: string;
  error?: any;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
}
