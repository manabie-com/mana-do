import { configure, shallow, ShallowWrapper } from 'enzyme';
import { TvaDialog } from './index';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('', () => {
  let wrapper: ShallowWrapper<any>;
  const mockCancel = jest.fn(() => {});
  const escape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      mockCancel();
    }
  };
  beforeEach(() => {
    wrapper = shallow(<TvaDialog isShown={true} onCancel={mockCancel} />)
    document.addEventListener('keydown', escape)
  })

  test('should close the dialog when clicking on the background', () => {
    const dialogBackground = wrapper.find('div.Tva__Dialog__Background');
    dialogBackground.simulate('click');
    expect(mockCancel).toHaveBeenCalled();
  })

  test('should close the dialog when pressing escape key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(mockCancel).toHaveBeenCalled();
  })
})