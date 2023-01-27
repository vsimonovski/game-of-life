import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/App';
import GlobalStyle from '@/style';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
