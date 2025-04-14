import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "./components/Login";
import LogoutButton from "./components/LogOut";
import Dashboard from "./components/Dashboard";
import Posts from "./components/Posts";
import Info from "./components/Info";
import NotFound from "./components/NotFound";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  function ProtectedRoute({ children }) {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAuth()) {
        navigate('/');
      }
    }, [navigate]);
  
    return isAuth() ? children : null;

  }
  function isAuth() {
    return localStorage.getItem("token") !== null;
  }
  return (
    <Router>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow">
        <div>
          <p className="text-2xl font-bold text-green-700">MySite</p>
        </div>
        <div className="p-4 flex items-center gap-x-4">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-blue-600 font-semibold hover:text-blue-800 duration-300">Dashboard</Link>
              <Link to="/posts" className="text-blue-600 font-semibold hover:text-blue-800 duration-300">Posts</Link>
              <Link to="/info" className="text-blue-600 font-semibold hover:text-blue-800 duration-300">Info</Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/info" element={<ProtectedRoute><Info /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
