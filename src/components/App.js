import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./Header";
import Diary from "./Diary";
import Tips from "./Tips";
import Register from "./Register";
import Login from "./Login";
import NavBar from "./NavBar";
import RequireAuth from "./RequireAuth";
import * as auth from "../auth.js";
import * as calData from "../data";
import "./styles/App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck(location.pathname);
  },[]);


  const handleTokenCheck = (path) => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      // проверяем токен пользователя
      auth.checkToken(jwt).then((res) => {
        if (res) {
          // если есть цель, добавляем её в стейт
          setLoggedIn(true);
          navigate(path);
        }
      });
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout= (evt) => {
    evt.preventDefault();

    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/login')
  }

  return (
    <>
      <Header />
      <main className="content">
        {loggedIn && <NavBar  onLogout={handleLogout}/>}
        <Routes>
          <Route
            path="/diary"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Diary />
              </RequireAuth>
            }
          />
          <Route
            path="/tips"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Tips />
              </RequireAuth>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            exact
            path="/"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Navigate to="/diary" />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
