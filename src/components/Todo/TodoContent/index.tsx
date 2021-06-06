import React, {
  ComponentPropsWithRef,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

type TodoContentType = ComponentPropsWithRef<'div'> & {
  rowIndex: number;
  content: string;
  onContentChange: (text: string, rowIndex: number) => void;
};

const StyledTodoContent = styled.div`
  width: 100%;
  border: none;
  background: none;
  margin: 0 1rem;
  cursor: pointer;
`;
const StyledTodoContentInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  margin: 0 1rem;
  padding: 0.3rem 0;
`;

const TodoContent: FC<TodoContentType> = ({
  rowIndex,
  content,
  onContentChange,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState(content);
  const ref = useRef<HTMLInputElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!ref.current) {
      return;
    }

    if (!ref.current.contains(e.target as Node)) {
      setShowInput(false);
      onContentChange(inputVal, rowIndex);
    }
  };

  const handleSetInputValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && ref.current) {
      setShowInput(false);
      onContentChange(inputVal, rowIndex);
    }
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    if (showInput) {
      ref.current?.focus();
    }
  }, [showInput]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);

    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal]);

  return (
    <>
      {!showInput && (
        <StyledTodoContent
          onDoubleClick={() => {
            setShowInput(true);
          }}
        >
          {content}
        </StyledTodoContent>
      )}
      {showInput && (
        <StyledTodoContentInput
          ref={ref}
          type="text"
          defaultValue={content}
          onChange={handleOnchange}
          onKeyPress={handleSetInputValue}
        />
      )}
    </>
  );
};

export default TodoContent;
