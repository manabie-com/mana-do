import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Layout from "./Layout";
import {getTokenStorage, removeLoginToken, storeLoginToken} from "./utils/storeageUtils";

const MockLayoutChildren = () => {
  return (
    <div>Layout Children</div>
  )
};

describe('<Layout />', () => {
  test('should return snapshot logged-in', () => {
    storeLoginToken('token');
    const tree = renderer.create(<Layout><MockLayoutChildren/></Layout>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('should return snapshot not logged-in yet', () => {
    removeLoginToken();
    const tree = renderer.create(<Layout><MockLayoutChildren/></Layout>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('testing functions', () => {
  test('should remove token after logout success', () => {
    storeLoginToken('token');
    const wrapper = shallow(
      <Layout>
        <MockLayoutChildren/>
      </Layout>
    );
    const logoutButton = wrapper.find('button');
    const logoutButtonProps = logoutButton.props();

    // on logout clicked
    // @ts-ignore
    logoutButtonProps.onClick();
    expect(getTokenStorage()).toBeNull();
  })
})
