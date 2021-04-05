import { useCallback, useState } from "react";
import { useHistory } from "react-router";

/* Models */
import { Data } from "src/models/todo";

/* Services */
import Service from "src/service";

export const useSignIn = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const signIn = useCallback(
    async (data: Data) => {
      try {
        if (data?.userId && data?.password) {
          const resp = await Service.signIn(
            data.userId.toString(),
            data.password.toString()
          );
          localStorage.setItem("token", resp);
          history.push("/todo");
        } else {
          setMessage("Something Error");
          setError(true);
        }
      } catch (error) {
        setMessage(error);
        setError(true);
      }
    },
    [history],
  );

  const clearError = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { signIn, clearError, error: error, message: message };
};
