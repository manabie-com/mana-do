import React, { useState } from "react";
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { title: string, value: number }) {

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                {props.title === 'Completed' &&
                    <LinearProgress color="secondary" variant="determinate" {...props} />}

            </Box>
            <Box minWidth={35} minHeight={20}>
                {props.title === 'Completed' &&
                    <Typography variant="body2" className="percent-value">{`${Math.round(
                        props.value,
                    )}%`}</Typography>}

            </Box>
        </Box>
    );
}

export interface Props {
    className: string,
    title: string,
    value: number,
}

const TodoStatusCard = (props: Props) => {    

    return (
        <div className={`todo-status-card ${(props.title === 'All' && "all-todo-status-card")} ${(props.title === 'Active' && "active-todo-status-card")} ${(props.title === 'Completed' && "complete-todo-status-card")} ${props.className}`}>
            <div className="todo-status-card-title">{props.title}</div>
            <div className="todo-status-card-progress">
                <LinearProgressWithLabel title={props.title} value={props.value} />
            </div>
        </div>
    )
}

export default TodoStatusCard;