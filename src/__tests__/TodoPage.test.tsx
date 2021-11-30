// import React from 'react';
// import Enzyme, { render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import ToDoPage from '../pages/ToDoPage';

// Enzyme.configure({ adapter: new Adapter() });

// describe('Test CRUD feature', () => {
//     it('Input should be empty when begin', () => {
//         const component = mount(<ToDoPage />);
//         const input = component.find('.Todo__input');
//         const inputDOM = input.getDOMNode();
//         (inputDOM as HTMLInputElement).value = 'ABC';
//         input.simulate('change', { target: inputDOM });
//         console.log(input.getDOMNode().value);
//         input.simulate('keydown', { keyCode: 13 });
//         console.log(component.text());
//     });
// });
