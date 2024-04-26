import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/auth-context';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LoginResponse {
  token: string;
  username: string; 
}
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

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      
      const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', data);
      
      if (response.data.token) {
        login(response.data.token, response.data.username); 
        navigate('/dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during login.');
      } else {
        setErrorMessage('Network error, please try again later.');
      }
      setError("email", { type: "manual", message: "Check your email." });
      setError("password", { type: "manual", message: "Check your password." });
    }
  };
  
  return (
    <div className="container mt-5 bg-dark text-light" style={{ maxWidth: '400px', height: '350px' }}>
      <h2 className="text-center mb-3">Login</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control bg-secondary text-white" id="email" aria-describedby="emailHelp" {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control bg-secondary text-white" id="password" {...register("password", { required: "Password is required" })} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-light" type="submit">Login</button>
          <button className="btn btn-outline-light" type="button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
