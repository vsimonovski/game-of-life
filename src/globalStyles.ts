import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #242424;
    color: #fff;
    font-family: monospace;
  }
`;

export default GlobalStyle;
