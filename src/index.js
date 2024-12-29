import React from 'react';
import ReactDOM from 'react-dom/client';
import "mdb-react-file-upload/dist/css/file-upload.min.css";
import "mdb-react-table-editor/dist/css/table-editor.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DataContext from './data/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContext>
        <App />
      </DataContext>
    </BrowserRouter>
  </React.StrictMode>
);