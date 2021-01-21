import rules, { Rules } from "./rbac-rules";

const check = (rules: Rules, role: string, action: string) => {
  const permissions = rules[role];
  if (!permissions) {
    // wrong role
    return false;
  }

  if (permissions && permissions.includes(action)) {
    return true;
  }
};

interface CanProps {
  role: string;
  perform: string;
  yes: () => JSX.Element;
  no: () => JSX.Element;
}

const Can: React.FC<CanProps> = ({ role, perform, yes, no }) =>
  check(rules, role, perform) ? yes() : no();

export default Can;
