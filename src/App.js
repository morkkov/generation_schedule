import React, { useState } from "react";
import Header from "./components/Header";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header isRegistered={isRegistered} userData={userData} />
        <main>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  userData={userData}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  setUserData={setUserData}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
