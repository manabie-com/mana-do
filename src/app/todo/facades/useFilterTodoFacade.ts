import shallow from "zustand/shallow";
import useTodoStore from "../store/useTodoStore";

const useFilterTodoFacade = () => {
  const { showStatus, setShowStatus } = useTodoStore(
    (state) => ({
      showStatus: state.showStatus,
      setShowStatus: state.setShowStatus,
    }),
    shallow
  );

  return {
    showStatus,
    setShowStatus,
  };
};

export default useFilterTodoFacade;
