import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchFilter from './components/SearchFilter';
import { TOAST_POSITION, TOAST_AUTO_CLOSE } from './utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              User Management System
            </h1>
            <UserForm />
            <SearchFilter />
            <UserList />
          </div>
        </div>
        <ToastContainer
          position={TOAST_POSITION}
          autoClose={TOAST_AUTO_CLOSE}
          className="toast-container"
        />
      </div>
    </Provider>
  );
}

export default App;