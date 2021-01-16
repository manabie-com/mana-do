import React from 'react';
import Radio from '../../../../components/Inputs/Radio';
import Box from '../../../../components/Layouts/Box';
import Center from '../../../../components/Layouts/Center';
import Row from '../../../../components/Layouts/Row';
import TextNormal from '../../../../components/Text/TextNormal';
import { TodoFilters } from '../../../../models/todo';

const FilterItem = (props: {
  name: string,
  value: TodoFilters,
  checked: boolean,
  onChange: () => void,
  label: string,
}) => {
  const { name, value, checked, onChange, label } = props;

  return <Box m={1}>
    <Row>
      <Box m={1}>
        <Center >
          <Radio
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
        </Center>
      </Box>
      <TextNormal display='inline'>{label}</TextNormal>
    </Row>
  </Box>
}

export default FilterItem;