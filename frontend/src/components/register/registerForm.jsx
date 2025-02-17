import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import  api  from '../../utils/axios';
import styles from './registerForm.module.css';
import {useNavigate} from 'react-router';
import { useAuth } from '../../context/userContextAuth';

const RegisterForm = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const createUser = (data) => {
    return api.post('/auth/register', data);
  };
  const {login} = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation(createUser, {
    onSuccess: (response) => {
      const userData = response.data; // ✅ Asegurarte de acceder a los datos correctamente
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
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
    <h2 className={styles.title}>Register</h2>

    <label className={styles.label}>
      Name:
      <input
        className={styles.input}
        type="text"
        placeholder="Register your Name.."
        {...register('name', {
          required: 'El nombre es obligatorio',
          maxLength: { value: 20, message: 'El nombre es demasiado largo' },
        })}
      />
      {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
    </label>

    <label className={styles.label}>
      Correo electrónico:
      <input
        className={styles.input}
        type="text"
        placeholder="pepe@example.com"
        {...register('email', {
          pattern: { value: /^\S+@\S+$/i, message: 'Formato de correo inválido' },
        })}
      />
      {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
    </label>

    <label className={styles.label}>
      Contraseña:
      <input
        className={styles.input}
        type="password"
        placeholder="12345678"
        {...register('password', {
          minLength: { value: 8, message: 'La contraseña es muy corta' },
          required: true,
        })}
      />
      {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
    </label>

    <label className={styles.label}>
      URL de la foto de perfil:
      <input
        className={styles.input}
        type="text"
        placeholder="https://ejemplo.com/imagen.jpg"
        {...register('profilePicture', {
          required: 'La foto de perfil es obligatoria',
          pattern: { value: /^(http|https):\/\/[^ "]+$/, message: 'Debe ser una URL válida' },
        })}
      />
      {errors.profilePicture && <p className={styles.errorMessage}>{errors.profilePicture.message}</p>}
    </label>

    <div className={styles.checkboxContainer}>
      <input type="checkbox" {...register('policy')} />
      <span>Aceptar políticas</span>
    </div>

    <button type="submit" className={styles.submitButton}>Registrarse</button>

    {mutation.isSuccess && <p>Usuario creado correctamente!</p>}
    {mutation.isError && <p>Hubo un error al crear el usuario. Intenta nuevamente.</p>}

    <h3>Vista previa:</h3>
    <p>Nombre: {name}</p>
    <p>Correo: {email}</p>
    <p>Contraseña: {password}</p>
    <p>
      Foto de perfil:{' '}
      {profilePicture ? (
        <img className={styles.previewImage} src={profilePicture} alt="Vista previa" />
      ) : (
        'No se ha proporcionado una URL'
      )}
    </p>
  </form>
);
};

export default RegisterForm;