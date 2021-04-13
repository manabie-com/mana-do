import { testSnapshots } from '../../utils/test';
import Button from './Button';
describe('render Button', () => {
  testSnapshots(Button, [
    {
      props: {
        children: 'Button'
      },
      description: 'render default Button'
    },
    {
      props: {
        children: 'Button disabled'
      },
      description: 'render disabled Button'
    }
  ]);
});

