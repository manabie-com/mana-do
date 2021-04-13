import { testSnapshots } from '../../utils/test';
import Input from './Input';
describe('render Input', () => {
  testSnapshots(Input, [
    {
      props: {
        isHasLabel: true,
        textLabel: 'password'
      },
      description: 'render input has label'
    },
    {
      props: {
        isHasLabel: false,
        textLabel: 'password'
      },
      description: 'render input does not have label'
    }
  ]);
});
