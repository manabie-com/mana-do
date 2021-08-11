import React from 'react';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import {TodoStatus} from '../../../models/todo'
import styles from './styles.module.scss';
interface ButtonGroupProps {
    handleClick?: any, 
    handleDelete?: any
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ handleClick, handleDelete }) => (
    <div className={styles.Todo__toolbar}>
        <div className={styles.group_btn}>
            <Label className={styles.label} >Filter: </Label>
            <Button className={styles.btn_all} onClick={() => handleClick('ALL')} >All</Button>
            <Button className={styles.btn_active} onClick={() => handleClick(TodoStatus.ACTIVE)} >Active</Button>
            <Button  className={styles.btn_complete}  onClick={() => handleClick(TodoStatus.COMPLETED)} >Completed</Button>
        </div>
        <Button className={styles.btn_delete} onClick={() => handleDelete()} >Clear All</Button>
    </div>
);

ButtonGroup.defaultProps = {
}

export default ButtonGroup;
