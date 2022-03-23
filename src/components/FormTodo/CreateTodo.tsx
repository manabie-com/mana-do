import React,{ComponentPropsWithRef} from "react"

type InputProps = {
  testId?:string,
  forwardRef?: React.Ref<HTMLInputElement>;
} & ComponentPropsWithRef<"input">;

const CreateTodo = ({forwardRef,testId,...props}:InputProps)=>{
  return (
    <div className="Todo__creation">
                <input
                data-testid={testId}
                    ref={forwardRef}
                    {...props}
                />
            </div>
  )
}

export default CreateTodo