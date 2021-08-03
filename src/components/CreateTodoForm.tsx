import React, {useState, useRef, ChangeEvent, FormEvent} from 'react';

interface CreateTodoFormProps {
  createTodo: (newTodo: string) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ createTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTodo.trim()) {
      createTodo(newTodo.trim());
      setNewTodo('');
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <form data-testid="create-todo-form" className="Todo__card Todo__creation">
      <button
        className="Todo__cb_container Todo__create"
        onClick={handleSubmit}
        data-testid="button-create-todo"
      >
        +
      </button>
      <input
        ref={inputRef}
        data-testid="input-create-todo"
        className="Todo__input"
        placeholder="What need to be done?"
        value={newTodo}
        onChange={handleChange}
      />
    </form>
  );
}

export default CreateTodoForm;
