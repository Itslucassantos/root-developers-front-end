import React from 'react';
import Button from '../../Form/Button';
import InputField from '../InputField';
import CardForm from '../../CardForm';
import { Form, Formik } from 'formik';
import { useWizard } from 'react-use-wizard';
import useStore from '../Store/Store';
import * as Yup from 'yup';

const PhysicalPerson = () => {
  const { previousStep, goToStep } = useWizard();
  const {
    physicalPersonData,
    setPhysicalPersonData,
    resetPhysicalPersonData,
    resetAddressData,
  } = useStore();

  const cpfRegex = /^(?!^(\d)\1{10}$)(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
  const telefoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;

  const schema = Yup.object().shape({
    firstName: Yup.string().required('Campo obrigatório'),
    surname: Yup.string().required('Campo obrigatório'),
    email: Yup.string()
      .required('Campo obrigatório')
      .email('Digite um e-mail válido'),
    confirmEmail: Yup.string()
      .required('Campo obrigatório')
      .oneOf([Yup.ref('email'), null], 'Digite o mesmo e-mail'),
    cpf: Yup.string()
      .required('Campo obrigatório')
      .matches(cpfRegex, 'CPF inválido'),
    phoneNumber: Yup.string()
      .required('Campo obrigatório')
      .matches(telefoneRegex, 'Telefone inválido'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: Yup.string()
      .required('Campo obrigatório')
      .oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
  });

  function handleButtonClick() {
    resetPhysicalPersonData();
    resetAddressData();
    previousStep();
  }

  return (
    <Formik
      initialValues={{
        firstName: physicalPersonData.firstName,
        surname: physicalPersonData.surname,
        email: physicalPersonData.email,
        confirmEmail: physicalPersonData.confirmEmail,
        cpf: physicalPersonData.cpf,
        phoneNumber: physicalPersonData.phoneNumber,
        password: physicalPersonData.password,
        confirmPassword: physicalPersonData.confirmPassword,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        setPhysicalPersonData(values);
        goToStep(3);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <CardForm
            paddingSide="true"
            firstDiv={
              <div>
                <div className="d-flex flex-column text-center">
                  <div>
                    <h1 className="fs-1">Cadastro</h1>
                  </div>
                  <div>
                    <Button type="button" onClick={handleButtonClick}>
                      voltar
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      type="text"
                      name="firstName"
                      label="Primeiro Nome"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField type="text" name="surname" label="Sobrenome" />
                  </div>
                  <div className="col-md-6">
                    <InputField type="email" name="email" label="E-mail" />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      type="email"
                      name="confirmEmail"
                      label="Confirmar E-mail"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField type="text" name="cpf" label="CPF" />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      type="text"
                      name="phoneNumber"
                      label="Telefone"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField type="password" name="password" label="Senha" />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      type="password"
                      name="confirmPassword"
                      label="Confirmar Senha"
                    />
                  </div>
                </div>
              </div>
            }
            secondDiv={
              <div>
                <h1 className="fs-2">Agora vamos preencher o seu endereço</h1>
                <h2 className="fs-4 my-4">
                  Clique no botão abaixo para continuar
                </h2>
                <Button type="submit" differentButton="true">
                  Avançar
                </Button>
              </div>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default PhysicalPerson;
