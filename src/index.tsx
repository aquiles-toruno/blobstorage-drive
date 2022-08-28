import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain='dev-u-5ydxua.us.auth0.com' audience='https://blob-drive/api' clientId='QJXyl1pMPtZyTlkrFJNQ5DNUNeSJtIhw' cacheLocation='localstorage'
      redirectUri={window.location.origin} onRedirectCallback={onRedirectCallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
