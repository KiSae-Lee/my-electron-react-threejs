import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './App/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
