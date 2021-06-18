import React, {InputHTMLAttributes, LegacyRef, ReactElement} from 'react';

type TodoCreationProps = {
    onKeyDown: (params: any) => any
}
export const TodoCreation = React.forwardRef((props: TodoCreationProps, ref: LegacyRef<any>) => {
    const {onKeyDown} = props;
    return <div className="Todo__creation">
        <input
            ref={ref}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onKeyDown}
        />
    </div>
})