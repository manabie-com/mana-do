import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Actions from './TodoActions';

describe('<Actions />', () => {
  test('Should render Action buttons', () => {
    const { getByText } = render(<Actions />);

    const allBtn = getByText(/All/i);
    const activeBtn = getByText(/Active/i);
    const completedBtn = getByText(/Completed/i);
    const deleteBtn = getByText(/Deleted/i);

    expect(allBtn).toBeInTheDocument();
    expect(activeBtn).toBeInTheDocument();
    expect(completedBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  test('Should handle event setShowing', () => {
    const fn = jest.fn();
    const { getByText } = render(<Actions setShowing={fn} />);

    const allBtn = getByText(/All/i);

    fireEvent.click(allBtn);
    expect(fn).toBeCalled();
  });
});
