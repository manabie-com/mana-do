import React from 'react'
import { shallow } from 'enzyme'
import Spinner from '../Spinner'

test(`should render Spinner with test is "Loading" when "text" prop contain value is "Loading"`, () => {
  const props = { text: 'Loading' }
  const component = shallow(<Spinner {...props} />)
  expect(component.find('.spinner__text').text()).toBe('Loading')
})

test(`should render Spinner with "width" and "hight" styles are "32" by default`, () => {
  const component = shallow(<Spinner />)
  expect(component.find('.spinner__loader').prop('style')).toEqual({
    width: 32,
    height: 32,
  })
})

test(`should render Spinner with "width" and "hight" styles are "16" when "size" prop contain value is "16"`, () => {
  const props = { size: 16 }
  const component = shallow(<Spinner {...props} />)
  expect(component.find('.spinner__loader').prop('style')).toEqual({
    width: 16,
    height: 16,
  })
})
