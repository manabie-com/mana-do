import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Josefin Sans", sans-serif;
    outline: none;
  }

  html {
    font-size: 62.5%;
  }

  body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f0f8fd;
    }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .d-flex {
    display : flex;
  }

  .d-justify-center {
    justify-content: center;
  }
  .d-align-center{
    align-items: center;
  }
`;
export default GlobalStyled;
