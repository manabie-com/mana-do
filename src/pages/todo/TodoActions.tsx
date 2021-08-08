import React from 'react';
import { TodoStatus } from '../../models/todo';
import Button from '../../components/button/Button';

const Actions = ({ setShowing }: any) => {
  return (
    <div className='Todo__tabs'>
      <Button title='All' onClick={() => setShowing('ALL')} />
      <Button title='Active' onClick={() => setShowing(TodoStatus.ACTIVE)} />
      <Button
        title='Completed'
        onClick={() => setShowing(TodoStatus.COMPLETED)}
      />
      <Button title='Deleted' onClick={() => setShowing(TodoStatus.DELETED)} />
    </div>
  );
};

export default Actions;
