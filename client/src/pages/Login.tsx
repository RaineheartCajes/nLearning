import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../buttons/submitButton';
import { useAuth } from '../auth/auth-context'; 

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); 
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    const usersData = localStorage.getItem('formData');
    if (usersData) {
      const users = JSON.parse(usersData);
      const userFound = users.find((user: any) => user.email === data.email && user.password === data.password);
  
      if (userFound) {
        login(); 
        localStorage.setItem('currentUser', JSON.stringify({ username: userFound.username }));
        navigate('/dashboard');
      } else {
        setErrorMessage('Incorrect email or password. Please try again.');
        setError("email", { type: "manual", message: "Check your email." });
        setError("password", { type: "manual", message: "Check your password." });
      }
    } else {
      setErrorMessage('No user registered with that email. Please register first.');
    }
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <SubmitButton text="Login" onClick={handleSubmit(onSubmit)} />
          <SubmitButton text="Register" onClick={handleClick} />
        </div>
      </form>
    </div>
  );
};

export default Login;
