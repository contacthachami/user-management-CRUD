import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchFilter from "./components/SearchFilter";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [lastActivity, setLastActivity] = useState(Date.now());

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  // Session timeout logic
  useEffect(() => {
    const timeoutDuration = 20000;// 5 minutes
    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity > timeoutDuration) {
        handleLogout();
      }
    }, 1000);

    // Event listeners for activity (reset timer on user activity)
    const resetTimeout = () => setLastActivity(Date.now());
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    // Cleanup listeners and interval
    return () => {
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      clearInterval(checkTimeout);
    };
  }, [lastActivity]);

  return (
    <Provider store={store}>
      {isAuthenticated ? (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  User Management System
                </h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
              <UserForm />
              <SearchFilter />
              <UserList />
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </Provider>
  );
}

export default App;
