import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import { Provider } from "react-redux";
import { store } from './redux/store';

import App from './App.tsx';

import './index.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <Provider store={store}>
              <BrowserRouter>
                  <CookiesProvider defaultSetOptions={{ path: '/' }}>
                    <App/>
                  </CookiesProvider>
              </BrowserRouter>
          </Provider>
  </React.StrictMode>,
)
