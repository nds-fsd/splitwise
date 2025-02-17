import { useForm } from 'react-hook-form';
import  api  from '../../utils/axios';
import {setStorageObject} from '../../utils/localStorage';
import styles from './loginForm.module.css';
import {useNavigate} from 'react-router';
import { useAuth } from '../../context/userContextAuth';

const Login = ({forceUpdate}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
    });
    const {login} = useAuth();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        api.post('/auth/login', data)
        .then((response) => {
            if (response?.data.token) {
                login(response.data);
                navigate('/groups');
            }
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h2>Login</h2>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
        })}
        placeholder="Email"
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' }
        })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}

      <input type="submit" value="Login" className={styles.submitBtn} />
    </form>
  );
};

export default Login;


