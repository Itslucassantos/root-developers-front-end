import React from 'react';
import Button from '../Form/Button';
import CardForm from '../CardForm';
import { NavLink } from 'react-router-dom';
import { Wizard, useWizard } from 'react-use-wizard';
import PhysicalPerson from './PhysicalPerson';
import LegalPerson from './LegalPerson';
import Address from './Address';

const Register = () => {
  return (
    <>
      <Wizard startIndex={0}>
        <CardForm
          firstDiv={
            <div className="text-center">
              <h1 className="fs-1">Já possui uma conta?</h1>
              <p className="fs-6 my-4">
                Clique no botão abaixo e efetue o login para usar a nossa
                plataforma
              </p>
              <NavLink to="/login">
                <Button differentButton="true">Login</Button>
              </NavLink>
            </div>
          }
          secondDiv={
            <div className="d-flex flex-column justify-content-center align-items-center text-center p-md-5">
              <h1 className="fs-1">Cadastrar</h1>
              <p className="fs-6 my-3">Selecione abaixo o tipo de conta desejada</p>
              <StepNavigator />
            </div>
          }
          order="true"
        />

        <PhysicalPerson />
        <LegalPerson />
        <Address />
      </Wizard>
    </>
  );
};

const StepNavigator = () => {
  const { goToStep } = useWizard();

  return (
    <div className='d-flex flex-column justify-content-center'>
      <Button onClick={() => goToStep(1)}>Pessoa Física</Button>
      <Button onClick={() => goToStep(2)}>Pessoa Jurídica</Button>
    </div>
  );
};

export default Register;
