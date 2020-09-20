import { Input, Label } from 'components/atoms';
import React from 'react';

type Props = {
  inputValue?: string;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
  inputId?: string;
  inputName?: string;
  inputType?: string;
  labelText: string;
}

const LabelInput = ({ inputValue , onChangeInput , inputId , inputName , inputType, labelText }:Props) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-5 col-md-4 col-lg-3 text-left text-sm-right">
          <Label className="font-weight-bold w-100">{labelText}</Label>
      </div>
      <div className="col-12 col-sm-7 col-md-8 col-lg-9 text-sm-left">
          <Input 
              className="w-100"
              id={inputId}
              name={inputName}
              type={inputType}
              value={inputValue}
              onChange={onChangeInput} />
      </div>
    </div>
  );
};

export default LabelInput;