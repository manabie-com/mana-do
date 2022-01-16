import React from 'react'
import { render } from "@testing-library/react";

import { FilterButton } from '../index'

import "@testing-library/jest-dom";

/**
 * Test cases
 * 1. should be rendered without crashing
 * 2. should be contain active class if active = true
 */

describe('<FilterButton />', () => {

  test('Should be rendered without crashing', () => {
    const wrapper = render(<FilterButton>test</FilterButton>)
    expect(wrapper.container).toMatchSnapshot()
  })

  test('should be contain active class if active = true', () => {
    const wrapper = render(<FilterButton active>test</FilterButton>)
    expect(wrapper.getByRole('button')).toHaveClass('active')
  })

})