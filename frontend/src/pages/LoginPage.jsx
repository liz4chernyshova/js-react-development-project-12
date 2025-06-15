import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/login', values);
      auth.logIn(response.data);
      navigate('/');
    } catch {
      setErrors({ general: 'Неверные имя пользователя или пароль' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
            </div>

            {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}

            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
