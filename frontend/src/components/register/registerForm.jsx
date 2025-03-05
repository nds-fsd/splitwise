import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import api from '../../utils/axios';
import styles from './registerForm.module.css';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/userContextAuth';

const RegisterForm = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const createUser = (data) => {
        // Creamos un objeto FormData para enviar los datos como archivo y texto
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profilePicture', data.profilePicture[0]);  // El archivo es un array, tomamos el primer elemento

        return api.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Importante para el envío de archivos
            },
        });
    };

    const { login } = useAuth();
    const navigate = useNavigate();
    const mutation = useMutation(createUser, {
        onSuccess: (response) => {
            const userData = response.data;
            login(userData);
            queryClient.invalidateQueries('users');
            navigate('/groups');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    };

    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    const profilePicture = watch('profilePicture');

    return (
        <form className={styles.registerContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.registerTitle}>Register</h2>

            <label className={styles.registerLabel}>
                Name:
                <input
                    className={styles.registerInput}
                    type="text"
                    placeholder="Register your Name.."
                    {...register('name', {
                        required: 'El nombre es obligatorio',
                        maxLength: { value: 20, message: 'El nombre es demasiado largo' },
                    })}
                />
                {errors.name && <p className={styles.registerErrorMessage}>{errors.name.message}</p>}
            </label>

            <label className={styles.registerLabel}>
                Correo electrónico:
                <input
                    className={styles.registerInput}
                    type="text"
                    placeholder="pepe@example.com"
                    {...register('email', {
                        pattern: { value: /^\S+@\S+$/i, message: 'Formato de correo inválido' },
                    })}
                />
                {errors.email && <p className={styles.registerErrorMessage}>{errors.email.message}</p>}
            </label>

            <label className={styles.registerLabel}>
                Contraseña:
                <input
                    className={styles.registerInput}
                    type="password"
                    placeholder="12345678"
                    {...register('password', {
                        minLength: { value: 8, message: 'La contraseña es muy corta' },
                        required: true,
                    })}
                />
                {errors.password && <p className={styles.registerErrorMessage}>{errors.password.message}</p>}
            </label>

            <label className={styles.registerLabel}>
                Foto de perfil:
                <input
                    className={styles.registerInput}
                    type="file"
                    {...register('profilePicture', {
                        required: 'La foto de perfil es obligatoria',
                        validate: (value) => value.length > 0 || 'Debe seleccionar una imagen',
                    })}
                />
                {errors.profilePicture && <p className={styles.registerErrorMessage}>{errors.profilePicture.message}</p>}
            </label>

            <button type="submit" className={styles.registerSubmitButton}>Registrarse</button>

            {mutation.isSuccess && <p>Usuario creado correctamente!</p>}
            {mutation.isError && <p>Hubo un error al crear el usuario. Intenta nuevamente.</p>}

            <h3>Vista previa:</h3>
            <p>Nombre: {name}</p>
            <p>Correo: {email}</p>
            <p>Contraseña: {password}</p>
            <p>
                Foto de perfil:{' '}
                {profilePicture?.[0] ? (
                    <img className={styles.registerPreviewImage} src={URL.createObjectURL(profilePicture[0])} alt="Vista previa" />
                ) : (
                    'No se ha proporcionado una foto'
                )}
            </p>
        </form>
    );
};

export default RegisterForm;

