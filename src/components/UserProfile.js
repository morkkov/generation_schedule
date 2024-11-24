import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile({ isRegistered, setIsRegistered, userData, setUserData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [usersData, setUsersData] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUser = usersData.find(
      (user) => user.email === formData.email
    );

    if (existingUser) {
      alert("Пользователь с таким email уже существует.");
    } else {
      setUsersData([...usersData, formData]);
      setUserData(formData);
      setIsRegistered(true);
      console.log("Данные регистрации:", formData);
      navigate("/dashboard");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usersData.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      setUserData(user);
      setIsRegistered(true);
      navigate("/dashboard");
    } else {
      alert("Неверный email или пароль");
    }
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setUserData(null);
    navigate("/");
  };

  if (isRegistered && userData) {
    return (
      <div className="user-profile">
        <h2>Добро пожаловать, {userData.name}!</h2>
        <p>Email: {userData.email}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {!showLoginForm ? (
        <>
          <h2>Регистрация</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Зарегистрироваться
            </button>
          </form>
          <button
            className="show-login-btn"
            onClick={() => setShowLoginForm(true)}
          >
            Уже есть аккаунт?
          </button>
        </>
      ) : (
        <>
          <h2>Вход</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-email">Email:</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Пароль:</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Войти
            </button>
          </form>
          <button
            className="show-register-btn"
            onClick={() => setShowLoginForm(false)}
          >
            Нет аккаунта? Зарегистрируйтесь
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
