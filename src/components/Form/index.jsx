import React from 'react';
import Button from './Button';
import { Form, Formik } from 'formik';
import InputField from '../Register/InputField';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../Register/Store/Store';

const FormComponent = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Campo obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const { setIncomeTaxEmail } = useStore();

  const handleSubmit = async (values) => {
    setErrorMessage('');
    const loginUrl = 'http://localhost:8081/api/login';
    try {
      const response = await axios.post(loginUrl, values);
      if (response.status === 200 && response.data.tokenJWT != null) {
        setIncomeTaxEmail(values.email)
        navigate('/simulador');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage('Email ou senha incorretos');
      } else {
        setErrorMessage(
          'Erro ao conectar com o servidor, tente novamente mais tarde!',
        );
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <InputField
              type="email"
              name="email"
              label="E-mail"
              placeholder="email@gmail.com"
            />
            <InputField
              type="password"
              name="password"
              label="Senha"
              placeholder="********"
            />
            <div className="d-flex justify-content-center mt-4">
              <Button type="submit">Login</Button>
            </div>
            {errorMessage && (
              <div
                style={{
                  color: 'red',
                  marginTop: '15px',
                  textAlign: 'center',
                }}
              >
                {errorMessage}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
