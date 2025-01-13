import React from 'react';
import { useParams } from 'react-router-dom'; // Importamos useParams
import { useQuery } from 'react-query'; // Importamos useQuery desde React Query
import api from '../../utils/axios'; // Ajusta la ruta según tu proyecto

const User = () => {
    const { id } = useParams(); // Extraemos el ID del usuario desde la URL
    const getUserById = (id) => api.get(`/users/${id}`).then((res) => res.data);

const { data: user, isLoading, isError, error } = useQuery(
    ['user', id],
    () => getUserById(id),
    { enabled: !!id }
);


    // Manejo de estados automáticos
    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error: {error.message || 'No se pudo cargar el usuario'}</div>;

    return (
        <div>
            <h1>Perfil del Usuario</h1>
            <img
                src={user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Foto de perfil"
            />
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default User;
