import React, { useCallback, useMemo, useState } from "react";

/* Models */
import { FormOptions, Data } from "src/models/todo";

/* Components */
import Input from "src/common/Input/Input";

export type Props = {
  options?: FormOptions[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>, data: Data) => void;
  children: React.ReactNode;
  error?: boolean;
  messageError?: string;
  clearError?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const Form = ({
  options,
  onSubmit,
  children,
  error,
  messageError,
  clearError,
}: Props) => {
  const [data, setData] = useState<Data>({});

  const renderMessageError = useMemo(() => {
    return <label className="label__errorMessage">{messageError}</label>;
  }, [messageError]);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      onSubmit && onSubmit(e, data);
    },
    [onSubmit, data]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      clearError && clearError(e);
    },
    [clearError]
  );

  return (
    <>
      {error && renderMessageError}
      <form onSubmit={submit}>
        {options &&
          options.map(({ id, name, label, type }, index) => (
            <Input
              key={index}
              id={id}
              name={name}
              label={label}
              type={type}
              value={data[name]}
              onChange={handleChange}
            />
          ))}
        {children}
      </form>
    </>
  );
};

export default React.memo(Form);
