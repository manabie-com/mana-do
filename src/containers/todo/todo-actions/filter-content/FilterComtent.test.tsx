import React from 'react';
// @ts-ignore
import {render, fireEvent} from '@testing-library/react';

import FilterContent from './FilterContent';

test('render FilterContent correctly', () => {
  const setFilterStatus = jest.fn() as (status: string) => void;
  const {container} = render(
    <FilterContent setFilterStatus={setFilterStatus} filterStatus=''/>
  );
  const filterButtons = container.querySelectorAll('button');
  expect(filterButtons).toHaveLength(3);
  expect(filterButtons[0].textContent).toEqual('All');
  expect(filterButtons[0].className).toContain('active');
  fireEvent.click(filterButtons[1]);
  expect(setFilterStatus).toBeCalled();
});
