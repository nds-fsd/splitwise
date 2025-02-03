import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import  api  from '../../utils/axios';
import {setStorageObject} from '../../utils/localStorage';

const RegisterForm = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const createUser = (data) => {
    return api.post('/auth/register', data);
  };

  const mutation = useMutation(createUser, {
    onSuccess: (response) => {
      const userData = response.data; // ✅ Asegurarte de acceder a los datos correctamente
      setStorageObject(userData);
      queryClient.invalidateQueries('users');
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
    <form onSubmit={handleSubmit(onSubmit)}>
    <h2>Register</h2>
    {/* Nombre */}
    <label htmlFor="name">
      Name:
      <input
        id="name"
        type="text"
        placeholder="Register your Name.."
        {...register('name', {
          required: 'El nombre es obligatorio',
          maxLength: { value: 20, message: 'El nombre es demasiado largo' },
        })}
      />
      {errors?.name && <p>{errors.name.message}</p>}
    </label>
    <br />

    {/* Correo electrónico */}
    <label htmlFor="email">
      Correo electrónico:
      <input
        id="email"
        type="text"
        placeholder="pepe@example.com"
        {...register('email', {
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Formato de correo inválido',
          },
        })}
      />
    </label>
    <br />
    {errors?.email && <p>{errors.email.message}</p>}

    {/* Contraseña */}
    <label htmlFor="password">
      Contraseña:
      <input
        id="password"
        type="password"
        placeholder="12345678"
        {...register('password', {
          minLength: {
            value: 8,
            message: 'La contraseña es muy corta',
          },
          required: true,
        })}
      />
    </label>
    <br />
    {errors?.password && <p>{errors.password.message}</p>}

    {/* Foto de perfil */}
    <label htmlFor="profilePicture">
      URL de la foto de perfil:
      <input
        id="profilePicture"
        type="text"
        placeholder="https://ejemplo.com/imagen.jpg"
        {...register('profilePicture', {
          required: 'La foto de perfil es obligatoria',
          pattern: {
            value: /^(http|https):\/\/[^ "]+$/,
            message: 'Debe ser una URL válida',
          },
        })}
      />
    </label>
    <br />
    {errors?.profilePicture && <p>{errors.profilePicture.message}</p>}

    {/* Checkbox de políticas */}
    <span>Aceptar políticas</span>
    <input type="checkbox" {...register('policy')} />
    <br />

    {/* Botón de envío */}
    <input type="submit" value="Registrarse" />

     {/* Mensaje de éxito o error */}
     {mutation.isSuccess && <p>Usuario creado correctamente!</p>}
    {mutation.isError && <p>Hubo un error al crear el usuario. Intenta nuevamente.</p>}

    {/* Vista previa */}
    <h3>Vista previa:</h3>
    <p>Nombre: {name}</p>
    <p>Correo: {email}</p>
    <p>Contraseña: {password}</p>
    <p>
      Foto de perfil:{' '}
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Vista previa"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      ) : (
        'No se ha proporcionado una URL'
      )}
    </p>
  </form>
);
};

export default RegisterForm;


