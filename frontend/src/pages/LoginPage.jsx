import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div>
    <h2>Login</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log('Submitted values:', values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" type="text" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
        </div>

        <button type="submit">Login</button>
      </Form>
    </Formik>
  </div>
);

export default LoginPage;
