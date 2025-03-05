import React from 'react';
import { getUserSession } from '../../../utils/localStorage'; 
import styles from './user.module.css';

const User = () => {
    const user = getUserSession();
    console.log(user);

    if (!user) {
        return <div className={styles.error}>Usuario no encontrado. Por favor, inicia sesión.</div>;
    }

    return (
        <div className={styles.userContainer}>
            <h1 className={styles.title}>Perfil del Usuario</h1>
            <img
                className={styles.profileImage}
                src={user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Foto de perfil"
            />
            <p className={styles.text}><strong>Nombre:</strong> {user.name}</p>
            <p className={styles.text}><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default User;
