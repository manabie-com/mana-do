import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextType = {
  isLogged: boolean;
  signIn: () => void;
  signOut: () => void;
};

const context = createContext<ContextType>({
  isLogged: false,
  signIn: () => {},
  signOut: () => {},
});

export const Provider = function SessionProvider({ children }: ProviderProps) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const signIn = () => {
    setIsLogged(true);
  };

  const signOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('mana-todo-list');
    setIsLogged(false);
  };

  return (
    <context.Provider value={{ signIn, signOut, isLogged }}>
      {children}
    </context.Provider>
  );
};

export const useSession = () => useContext(context);
