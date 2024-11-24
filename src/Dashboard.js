import React, { useState, useEffect } from "react";
import UserProfile from "./components/UserProfile"; // Импорт формы регистрации
import "./Dashboard.css";

function Dashboard({ userData, isRegistered, setIsRegistered, setUserData }) {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    classNumber: "",
    lessonName: "",
    teacherName: "",
    availableRooms: "",
  });
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  useEffect(() => {
    const savedSubjects = localStorage.getItem("subjects");
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  const saveSubjectsToLocalStorage = (updatedSubjects) => {
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
  };

  // Обработчик изменения данных нового предмета
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({
      ...newSubject,
      [name]: value,
    });
  };

  // Добавление нового предмета
  const handleAddSubject = () => {
    const updatedSubjects = [...subjects, newSubject];
    saveSubjectsToLocalStorage(updatedSubjects);
    setNewSubject({
      classNumber: "",
      lessonName: "",
      teacherName: "",
      availableRooms: "",
    }); // Сброс формы
    setIsAddingSubject(false);
  };

  // Удаление предмета
  const handleDeleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    saveSubjectsToLocalStorage(updatedSubjects);
  };

  // Если пользователь не зарегистрирован, отображаем форму регистрации
  if (!isRegistered) {
    return (
      <div className="dashboard-container">
        <h2>Личный кабинет</h2>
        <p>
          Пожалуйста, зарегистрируйтесь, чтобы получить доступ к личному
          кабинету.
        </p>
        <UserProfile
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          userData={userData}
          setUserData={setUserData}
        />
      </div>
    );
  }

  // Если пользователь зарегистрирован, отображаем личный кабинет
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Личный кабинет</h2>
        <p>
          <strong>Имя:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <hr />
        <h3>Ваши предметы</h3>

        {/* Список добавленных предметов */}
        <ul className="subjects-list">
          {subjects.map((subject, index) => (
            <li key={index} className="subject-item">
              <p>
                <strong>Номер класса:</strong> {subject.classNumber}
              </p>
              <p>
                <strong>Название урока:</strong> {subject.lessonName}
              </p>
              <p>
                <strong>ФИО преподавателя:</strong> {subject.teacherName}
              </p>
              <p>
                <strong>Доступные кабинеты:</strong> {subject.availableRooms}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteSubject(index)}
              >
                Удалить предмет
              </button>
            </li>
          ))}
        </ul>

        {/* Кнопка добавления предмета */}
        <button
          className="add-subject-btn"
          onClick={() => setIsAddingSubject(true)}
        >
          Добавить предмет
        </button>

        {/* Форма добавления предмета */}
        {isAddingSubject && (
          <div className="add-subject-form">
            <h4>Добавление нового предмета</h4>
            <label>
              Номер класса:
              <input
                type="text"
                name="classNumber"
                value={newSubject.classNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Название урока:
              <input
                type="text"
                name="lessonName"
                value={newSubject.lessonName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              ФИО преподавателя:
              <input
                type="text"
                name="teacherName"
                value={newSubject.teacherName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Доступные кабинеты:
              <input
                type="text"
                name="availableRooms"
                value={newSubject.availableRooms}
                onChange={handleInputChange}
              />
            </label>
            <button className="save-btn" onClick={handleAddSubject}>
              Сохранить предмет
            </button>
            <button
              className="cancel-btn"
              onClick={() => setIsAddingSubject(false)}
            >
              Отменить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
