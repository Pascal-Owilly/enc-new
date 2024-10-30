import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
  </React.StrictMode>,
);
