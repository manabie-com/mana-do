import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MEditableField from "./MEditableField";

const actionOnChange = jest.fn();
describe('Should render MEditableField properly if not always in edit mode', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('If not always in edit mode, just render <span> initial', () => {
    const { container } = render(
      <MEditableField
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );

    expect(container.querySelectorAll('span').length).toEqual(1);
    expect(container.querySelectorAll('input').length).toEqual(0);
  });

  it('Double click on span element will change into input', () => {
    const { container } = render(
      <MEditableField
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );
    fireEvent.dblClick(container.querySelector('span') as HTMLElement);
    expect(container.querySelectorAll('span').length).toEqual(0);
    expect(container.querySelectorAll('input').length).toEqual(1);
  });

  it('Press down Enter button must call actionOnChange', () => {
    const { container } = render(
      <MEditableField
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );
    fireEvent.dblClick(container.querySelector('span') as HTMLElement);
    fireEvent.change(
      container.querySelector('input') as HTMLElement,
      { target: { value: 'This is changed testing text' } }
    );
    fireEvent.keyDown(container.querySelector('input') as HTMLElement, { key: 'Enter' });
    expect(actionOnChange).toBeCalled();
  });

  it('Press down Esc button must not call actionOnChange', () => {
    const { container } = render(
      <MEditableField
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );
    fireEvent.dblClick(container.querySelector('span') as HTMLElement);

    fireEvent.change(
      container.querySelector('input') as HTMLElement,
      { target: { value: 'This is changed testing text' } }
    );

    expect((container.querySelector('input') as HTMLInputElement).value).toEqual('This is changed testing text');

    fireEvent.keyDown(container.querySelector('input') as HTMLElement, { key: 'Escape' });

    expect(actionOnChange).not.toBeCalled();
    expect((container.querySelector('span') as HTMLElement).textContent).toEqual('This is testing text')
  });
});

describe('Should render MEditableField properly if always in edit mode', () => {
  it('If always in edit mode, just render <span> initial', () => {
    const { container } = render(
      <MEditableField
        alwaysEditMode={true}
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );

    expect(container.querySelectorAll('span').length).toEqual(0);
    expect(container.querySelectorAll('input').length).toEqual(1);
  });

  it('If always in edit mode, always call actionOnChange whenever input happens', () => {
    const { container } = render(
      <MEditableField
        alwaysEditMode={true}
        value='This is testing text'
        actionOnChange={actionOnChange}/>
    );

    fireEvent.change(
      container.querySelector('input') as HTMLElement,
      { target: { value: 'This is testing textA' } }
    );
    fireEvent.change(
      container.querySelector('input') as HTMLElement,
      { target: { value: 'This is testing textAB' } }
    );
    expect(actionOnChange).toBeCalledTimes(2);
    expect((container.querySelector('input') as HTMLInputElement).value).toEqual('This is testing textAB');
  });
});
