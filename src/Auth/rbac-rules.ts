export interface Rules {
  [key: string]: string[];
}
const rules: Rules = {
  visitor: ["login"],
  user: ["todo"],
};

export default rules;
