import React from 'react';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';

interface FormGroupProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    htmlFor?: string,
    className?: string, 
    type: string, 
    value: string, 
    name: string,
    placeholder?: string
}

const FormGroup: React.FC<FormGroupProps> = ({ onChange, label, htmlFor, className, placeholder, value, type, name }) => (
    <React.Fragment>
        <Label htmlFor={htmlFor}><b>{label}</b></Label>
        <Input onChange={onChange} id={htmlFor} type={type} value={value} className={className} placeholder={placeholder} name={name} ></Input>
    </React.Fragment>
);

FormGroup.defaultProps = {
  className: '',
  label: '',
  htmlFor: '',
  value: ''

}

export default FormGroup;
