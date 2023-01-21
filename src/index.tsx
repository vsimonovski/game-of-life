import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'App';
import GlobalStyle from 'globalStyles';
import { store } from 'store';

render(
  <StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
