import React, { useState } from 'react';
import { TodoStatus } from '../../models/todo';
import MyButton from '../../shared/components/MyButton';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface IProps {
    setShowing: (action: EnhanceTodoStatus) => void;
}

const TodoTab = ({ setShowing }: IProps) => {

    const tabButtons = [
        { label: 'All', onClick: () => setShowing('ALL') },
        { label: 'Active', onClick: () => setShowing(TodoStatus.ACTIVE) },
        { label: 'Completed', onClick: () => setShowing(TodoStatus.COMPLETED) },
    ].map((button, index) => ({ ...button, checked: index === 0 }));

    const [actionButtons, setActionButton] = useState(tabButtons);

    return (
        <div className="todo-tabs">
            {
                actionButtons.map((button, index) =>
                    <MyButton
                        key={index}
                        label={button.label}
                        className={button.checked ? 'my-button checked' : 'my-button'}
                        style={{ marginLeft: 5 }}
                        onClick={() => {
                            button.onClick();
                            const buttons = actionButtons.map((s, i) => ({ ...s, checked: i === index }));
                            setActionButton(buttons);
                        }}
                    />
                )
            }
        </div>
    )
}

export default TodoTab;