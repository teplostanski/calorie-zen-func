import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";
import "./styles/Login.css";

export default function Login({ onLogin }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.username || !values.password) {
      return;
    }
    auth
      .authorize(values.username, values.password)
      .then((res) => {
        if (res.user && res.jwt) {
          setValues({
            username: "",
            password: "",
          })

          localStorage.setItem('jwt', res.jwt);
          onLogin();
          navigate("/diary");
          
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <p className="login__welcome">Добро пожаловать!</p>
      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="username">Логин:</label>
        <input
          required
          id="username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="login__link"
          >
            Войти
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );

}