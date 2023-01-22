import { createGlobalStyle } from 'styled-components';

const size = {
  mobile: '480px',
  tablet: '768px',
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
};

const GlobalStyle = createGlobalStyle`
  body {
    --color-bg: #242424;
    --color-text: #fff;
    --color-accent: #f1c40f;
    --color-dark: #1a1a1a;
    --color-gray: #7f8c8d;
    --color-gray-100: #555;

    --size-xxs: 4px;
    --size-xs: 8px;
    --size-sm: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: monospace;
    font-size: 10px;

    @media ${device.tablet} {
      font-size: 8px;
    }

    @media ${device.mobile} {
      font-size: 6px;
    }
  }

`;

export default GlobalStyle;
