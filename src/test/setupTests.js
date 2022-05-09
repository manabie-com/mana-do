import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'
import React from 'react'
import 'regenerator-runtime/runtime'

React.useLayoutEffect = React.useEffect

const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

configure({ adapter: new Adapter() })

global.matchMedia =
  global.matchMedia ||
  // eslint-disable-next-line func-names
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }
