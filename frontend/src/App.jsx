import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Groups from "./pages/groups/groups";
import GroupExpenses from "./pages/groups/expense/expense";
import UserExpenses from "./pages/user/userExpenses/userExpenses";
import NoMatch from "./pages/noMatch/noMatch";
import { QueryClient, QueryClientProvider } from "react-query";
import User from "./pages/user/userProfile/user";
import Userlist from "./pages/user/userList/userList";
import RegisterForm from "./components/register/registerForm";
import Login from "./components/login/loginForm";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { useAuth } from "./context/userContextAuth"; // Importa el AuthContext para usar useAuth
const queryClient = new QueryClient();

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);

  // Inicializamos el valor del token dentro del componente.
  const {token} = useAuth(); // Evita desestructuración de undefined

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />}>
                <Route path="/user/expenses" element={<UserExpenses />} />
                <Route path="/login" element={<Login forceUpdate={() => setForceUpdate(!forceUpdate)} />} />
                {/* Ruta protegida para un usuario específico */}
                <Route
                path="/profile"
                element={token ? <User /> : <Navigate to="/login" />} // Verifica si hay token
              />
                {/* Ruta protegida para grupos */}
              <Route
                path="/groups"
                element={token ? <Groups /> : <Navigate to="/login" />} // Verifica si hay token
              />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/users" element={<Userlist />} />
                  <Route path="/groups/:groupId/expenses" element={token ? <GroupExpenses /> : <Navigate to="/login" />} /> {/* Ruta protegida de gastos de grupo */}
                <Route path="*" element={<NoMatch />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </DarkModeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
