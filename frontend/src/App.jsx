import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
// import User from './pages/user/user';
import UserExpenses from "./pages/user/userExpenses/userExpenses";
import GroupExpenses from "./pages/group/groupExpenses/groupExpenses";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useState } from "react";
import User from "./pages/user/userProfile/user"; // Asegúrate de que la ruta sea correcta
import Userlist from "./pages/user/userList/userList";
import RegisterForm from "./components/register/registerForm";
import Login from "./components/login/loginForm";

const queryClient = new QueryClient();

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />
            }
          >
            <Route path="/user/expenses" element={<UserExpenses />} />
            <Route path="/group/expenses" element={<GroupExpenses />} />
            <Route path="/login" element={<Login forceUpdate={() => setForceUpdate(!forceUpdate)} />} />
            {/* Ruta para ver un usuario con un ID dinámico */}
            <Route path="/users/:id" element={<User />} />
            {/* Ruta de ejemplo para la página principal */}
            <Route path="/" element={<div>Bienvenido a la app</div>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users" element={<Userlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
