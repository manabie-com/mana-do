import Login from './Login';
import { mount, shallow } from 'enzyme';
import '../../../../setupTests';
import Service from '../../../service';

describe('Login', () => {
  it('Should render Login page correctly', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input').at(0).props().type).toBe("text");
    expect(wrapper.find('input').at(1).props().type).toBe("password");
    expect(wrapper.find('button').text()).toBe('Login');
  });
});

 it('Should create new task when press enter', () => {
    const wrapper = mount(<Login />);
    const login = jest.spyOn(Service, 'login').mockResolvedValue({ token: '123', type: 'Bearer'});
    wrapper.find("form").simulate("submit");
    expect(login).toBeCalledTimes(1);
  });

export {};