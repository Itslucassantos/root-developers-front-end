import React from 'react';
import CardForm from '../../CardForm';
import Button from '../../Form/Button';
import { Form, Formik } from 'formik';
import { useWizard } from 'react-use-wizard';
import InputField from '../InputField';
import useStore from '../Store/Store';
import * as Yup from 'yup';
import axios from 'axios';
import RegisteredSuccessfully from '../RegisteredSuccessfully';

const Address = () => {
  const { goToStep, previousStep } = useWizard();
  const {
    addressData,
    setAddressData,
    physicalPersonData,
    legalPersonData,
    resetPhysicalPersonData,
    resetLegalPersonData,
    resetAddressData,
  } = useStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const cepRegex = /^\d{5}-?\d{3}$/;

  const schema = Yup.object().shape({
    state: Yup.string().required('Campo obrigatório'),
    city: Yup.string()
      .required('Campo obrigatório')
      .max(58, 'Digite uma cidade válida'),
    publicPlace: Yup.string().required('Campo obrigatório'),
    neighborhood: Yup.string().required('Campo obrigatório'),
    number: Yup.string().required('Campo obrigatório'),
    zipCode: Yup.string()
      .required('Campo obrigatório')
      .matches(cepRegex, 'CEP inválido'),
  });

  function handleButtonClick(values) {
    setAddressData(values);
    if (physicalPersonData.firstName) {
      goToStep(1);
    } else {
      previousStep();
    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setErrorMessage('');
    let completeData = {};
    try {
      if (physicalPersonData.firstName) {
        const physicalUrl = 'http://localhost:8081/api/client/physicalClient';
        completeData = {
          ...physicalPersonData,
          address: values,
        };
        await postData(physicalUrl, completeData, resetForm);
      } else {
        const legalUrl = 'http://localhost:8081/api/client/legalClient';
        completeData = {
          ...legalPersonData,
          address: values,
        };
        await postData(legalUrl, completeData, resetForm);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage('Usuário já cadastrado!');
      } else {
        setErrorMessage(
          'Erro ao conectar com o servidor, tente novamente mais tarde!',
        );
      }
    }
  };

  const postData = async (url, data, resetForm) => {
    try {
      let response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        resetForm();
        resetAddressData();
        resetLegalPersonData();
        resetPhysicalPersonData();
        setIsRegistered(true);
        setSubmitted(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isRegistered && <RegisteredSuccessfully setSubmitted={setSubmitted} />}
      <Formik
        initialValues={{
          state: addressData.state,
          city: addressData.city,
          publicPlace: addressData.publicPlace,
          neighborhood: addressData.neighborhood,
          number: addressData.number,
          zipCode: addressData.zipCode,
          complement: addressData.complement,
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, { resetForm });
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
                      <h1 className="fs-1">Endereço</h1>
                    </div>
                    <div>
                      <Button
                        type="button"
                        disabled={submitted}
                        onClick={() => handleButtonClick(formik.values)}
                      >
                        voltar
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputField type="text" name="state" label="Estado" />
                    </div>
                    <div className="col-md-6">
                      <InputField type="text" name="city" label="Cidade" />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        type="text"
                        name="publicPlace"
                        label="Logradouro"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField
                        type="text"
                        name="neighborhood"
                        label="Bairro"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputField type="text" name="number" label="Número" />
                    </div>
                    <div className="col-md-6">
                      <InputField type="text" name="zipCode" label="CEP" />
                    </div>
                    <div className="col-md-12">
                      <InputField
                        type="text"
                        name="complement"
                        label="Complemento"
                      />
                    </div>
                  </div>
                </div>
              }
              secondDiv={
                <div>
                  <h1 className="fs-2">Estamos quase lá</h1>
                  <h2 className="fs-4 my-4">
                    Clique no botão abaixo para finalizar seu cadastro
                  </h2>
                  <Button
                    type="submit"
                    differentButton="true"
                    disabled={isSubmitting || submitted}
                  >
                    {isSubmitting ? 'Cadastrando...' : 'Finalizar'}
                  </Button>
                  {errorMessage && (
                    <div style={{ color: 'white', marginTop: '25px' }}>
                      {errorMessage}
                    </div>
                  )}
                </div>
              }
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Address;
