import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ isRegistered, userData }) {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Генератор школьных расписаний</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Чат</a>
            </li>
            <li>
              {/* Вернули ссылку на about_us.html */}
              <a href="/about_us.html">О проекте</a>
            </li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button className="dashboard-btn" onClick={handleDashboardClick}>
            Личный кабинет
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
