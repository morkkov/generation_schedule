import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
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
              <button onClick={() => navigate("/")}>Чат</button>
            </li>
            <li>
              <button onClick={() => (window.location.href = "/about_us.html")}>
                О проекте
              </button>
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
