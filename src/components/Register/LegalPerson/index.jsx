import React from 'react';
import CardForm from '../../CardForm';
import Button from '../../Form/Button';
import { Form, Formik } from 'formik';
import InputField from '../InputField';
import { useWizard } from 'react-use-wizard';
import useStore from '../Store/Store';
import * as Yup from 'yup';

const LegalPerson = () => {
  const { nextStep, goToStep } = useWizard();
  const {
    legalPersonData,
    setLegalPersonData,
    resetLegalPersonData,
    resetAddressData,
  } = useStore();

  const cpfRegex = /^(?!^(\d)\1{10}$)(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
  const telefoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
  const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

  const schema = Yup.object().shape({
    socialReason: Yup.string().required('Campo obrigatório'),
    cnpj: Yup.string()
      .required('Campo obrigatório')
      .matches(cnpjRegex, 'CNPJ inválido'),
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
    resetLegalPersonData();
    resetAddressData();
    goToStep(0);
  }

  return (
    <Formik
      initialValues={{
        socialReason: legalPersonData.socialReason,
        cnpj: legalPersonData.cnpj,
        firstName: legalPersonData.firstName,
        surname: legalPersonData.surname,
        email: legalPersonData.email,
        confirmEmail: legalPersonData.confirmEmail,
        cpf: legalPersonData.cpf,
        phoneNumber: legalPersonData.phoneNumber,
        password: legalPersonData.password,
        confirmPassword: legalPersonData.confirmPassword,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        setLegalPersonData(values);
        nextStep();
      }}
    >
      {(formik) => (
        <Form>
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
                      name="socialReason"
                      label="Razão Social"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField type="text" name="cnpj" label="CNPJ" />
                  </div>
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
                <h1 className="fs-2">Vamos agora preencher o seu endereço</h1>
                <h2 className="fs-4 my-4">
                  Clique no botão a baixo para continuar
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

export default LegalPerson;
