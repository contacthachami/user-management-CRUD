import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchFilter from './components/SearchFilter';
import Login from './components/Login';
import { TOAST_POSITION, TOAST_AUTO_CLOSE } from './utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Header = ({ onLogout }) => {
  return (
    <div className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Système de Gestion d'Utilisateurs</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="card shadow-lg">
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
        </>
      )}
    </Provider>
  );
}

export default App;
