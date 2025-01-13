import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import User from './pages/user/user';
import UserExpenses from "./pages/user/userExpenses/userExpenses";
import GroupExpenses from "./pages/group/groupExpenses/groupExpenses";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import React, { useState } from "react";
import User from "./components/pages/user"; // Asegúrate de que la ruta sea correcta
import Userlist from "./components/pages/userList";
import RegisterForm from "./components/pages/react-hook-form/reactHookForm";

const queryClient = new QueryClient();

function App() {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  return;

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="create-group-btn"
          ></button>
          <CreateGroupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreateGroup={createGroup}
          />

          <Route path="/user/expenses" element={<UserExpenses />} />
          <Route path="/group/expenses" element={<GroupExpenses />} />
          {/* Ruta para ver un usuario con un ID dinámico */}
          <Route path="/users/:id" element={<User />} />
          {/* Ruta de ejemplo para la página principal */}
          <Route path="/" element={<div>Bienvenido a la app</div>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/users" element={<Userlist />} />
          <Route path="/" element={<Navigate to="/group-details" />} />
          <Route
            path="/group-details"
            element={<GroupDetailsPage groups={groups} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>;
}

export default App;
