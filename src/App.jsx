import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import CreateNewPassword from "./pages/CreateNewPassword";
import HeaderLayout from "./components/HeaderLayout";
import User from "./pages/User";
import Team from "./pages/Team";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/registration" element={<Registration />}/>
        <Route exact path="/authorization" element={<Login />}/>
        <Route exact path="/password-recovery" element={<PasswordRecovery />}/>
        <Route exact path="/create-new-password" element={<CreateNewPassword />}/>
        <Route element={<HeaderLayout/>}>
          <Route exact path="/user/:id" element={<User/>}/>
          <Route exact path="/team/:id" element={<Team/>}/>
          <Route exact path="/admin/:id" element={<Admin/>}/>
          <Route exact path="/user" element={<User/>}/>
          <Route exact path="/team" element={<Team/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
        </Route>
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
