import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from '../../components/Input'

function InputTest({ defaultValue = '', label = 'text' }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <label>
      {label}
      <Input value={value} onChange={e => setValue((e.target as HTMLTextAreaElement).value)} />
    </label>
  )
}

test('testing input', async () => {
  const { getByDisplayValue } = render(<InputTest />)
  getByDisplayValue('')
})

test('value change', () => {
  const { getByDisplayValue } = render(<InputTest />)

  const input = getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'gino' } })

  getByDisplayValue('gino')
})

test('default value', async () => {
  const { getByDisplayValue } = render(<InputTest defaultValue="pippo" />)
  getByDisplayValue('pippo')
})