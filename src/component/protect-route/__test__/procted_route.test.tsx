import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProtectedRoute from '../ProtectedRoute';

describe('<ProtectedRoute />', () => {
  it('Should render corectly', () => {
    const wrapper = mount(<ProtectedRoute />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  it('Should <Redirect /> when unlogin', () => {

  });
});