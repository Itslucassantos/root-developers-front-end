import React from 'react';
import FormComponent from '../Form';
import Button from '../Form/Button';
import './Login.css';
import CardForm from '../CardForm';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        <CardForm
          firstDiv={
            <div>
              <h1 className="fs-1 text-center mb-5 fw-medium">Entrar</h1>
              <FormComponent />
            </div>
          }
          secondDiv={
            <div>
              <h2 className="fs-2">Olá</h2>
              <h3 className="fs-3 my-4">
                Cadastre-se e comece a usar nossa plataforma
              </h3>
              <NavLink to="/cadastro-opcoes">
                <Button differentButton="true">Cadastre-se</Button>
              </NavLink>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Login;
