export interface ITextField {
  id: string;
  required: boolean;
  name: string;
  value: string;
  label: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
