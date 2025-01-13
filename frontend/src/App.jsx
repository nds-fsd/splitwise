import React from 'react';
import { Routes, Route } from 'react-router-dom';
import User from './components/pages/user'; // Asegúrate de que la ruta sea correcta
import Userlist from './components/pages/userList';
import RegisterForm from './components/pages/react-hook-form/reactHookForm';
function App() {
    return (
            <Routes>
                {/* Ruta para ver un usuario con un ID dinámico */}
                <Route path="/users/:id" element={<User />} />
                {/* Ruta de ejemplo para la página principal */}
                <Route path="/" element={<div>Bienvenido a la app</div>} />
                <Route path="/register" element={<RegisterForm/>}  />
                <Route path="/users" element={<Userlist/>} />
            </Routes>
    );
}

export default App;
