import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Mess } from "./Pages/Mess";
import { useState } from "react";
import { AddMessInfo } from "./Pages/AddMessInfo";
import { Register } from "./Pages/Register";
import { User } from "./Pages/User";

function App() {
  const [loggedin, setloggedin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/messes" element={<Mess />} />
        <Route exact path="/addmessinfo/:id" element={<AddMessInfo />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
