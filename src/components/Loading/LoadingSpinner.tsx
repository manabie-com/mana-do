import styled from 'styled-components';

const LoadingSpinner = styled.div`
  margin: 30px auto;
  font-size: 4px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid red;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: loading 1s infinite linear;
  animation: loading 1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
  }
`;

export default LoadingSpinner;
