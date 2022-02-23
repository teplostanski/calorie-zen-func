import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";
import "./styles/Register.css";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    calGoal: "",
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

    if (values.password === values.confirmPassword) {
      auth
        .register(
          values.username,
          values.password,
          values.email,
          values.calGoal
        )
        .then((res) => {
          if (res.statusCode !== 400) {
            navigate("/login");
          }
        });
    }
  };

  return (
    <div className="register">
      <p className="register__welcome">Пожалуйста, зарегистрируйтесь.</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">Логин:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Повторите пароль:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <label htmlFor="calGoal">Калории за день:</label>
        <input
          id="calGoal"
          name="calGoal"
          type="number"
          value={values.calGoal}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__link"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}
