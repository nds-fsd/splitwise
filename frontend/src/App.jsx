import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Groups from "./pages/groups/groups";
import GroupExpenses from "./pages/groups/expense/expense";
import UserExpenses from "./pages/user/userExpenses/userExpenses";
import NoMatch from "./pages/noMatch/noMatch"
import { QueryClient, QueryClientProvider } from "react-query";
import User from "./pages/user/userProfile/user"; // Asegúrate de que la ruta sea correcta
import Userlist from "./pages/user/userList/userList";
import RegisterForm from "./components/register/registerForm";
import Login from "./components/login/loginForm";
import { DarkModeContextProvider } from "./context/darkModeContext";

const queryClient = new QueryClient();

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />}>
              <Route path="/user/expenses" element={<UserExpenses />} />
              <Route path="/login" element={<Login forceUpdate={() => setForceUpdate(!forceUpdate)} />} />
              {/* Ruta para ver un usuario con un ID dinámico */}
              <Route path="/users/:id" element={<User />} />
              {/* Ruta de ejemplo para la página principal */}
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/users" element={<Userlist />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:groupId/expenses" element={<GroupExpenses />} />
              <Route path='*' element={<NoMatch />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
