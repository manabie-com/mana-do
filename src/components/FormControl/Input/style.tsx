import styled from 'styled-components';

const InputWrapper = styled.div`
  input {
    width: 30rem;
    height: 3.5rem;
    margin-bottom: 1rem;
    border: 0.1rem solid #ddd;
    border-radius: 0.5rem;
    padding-left: 1rem;
    font-size: 1.5rem;
    transition: background-color 0.3s;

    :focus {
      background-color: #d9ebf7;
    }
  }
  .error-msg {
    color: red;
  }
`;

export { InputWrapper };
