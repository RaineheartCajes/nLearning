import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubmitButton from '../buttons/submitButton';
import 'bootstrap/dist/css/bootstrap.min.css';

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();

  const passwordsMatch = (value: string) => {
    return value === watch('password') || "Passwords do not match";
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { confirmPassword, ...userData } = data;
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      if (response.status === 200) {  
        navigate('/'); 
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


    return (
      <div className="container mt-5 bg-dark text-light" style={{ maxWidth: '400px', height: '600px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              {...register("username", { 
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters"
                }
              })} 
            />
            {errors.username && <span className="text-danger">{errors.username.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="firstName" 
              {...register("firstName", { 
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid characters used"
                }
              })} 
            />
            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="lastName" 
              {...register("lastName", { 
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid characters used"
                }
              })} 
            />
            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              {...register("email", { 
                required: "This field is required", 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })} 
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              {...register("password", { 
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })} 
            />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="confirmPassword" 
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: passwordsMatch
              })} 
            />
            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
          </div>

          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <SubmitButton text="Register" onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      </div>
    );
  };

  export default Register;