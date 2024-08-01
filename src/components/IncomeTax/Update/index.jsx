import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import InputField from '../../Register/InputField';
import useStore from '../../Register/Store/Store';
import * as Yup from 'yup';
import CardForm from '../../CardForm';
import Button from '../../Form/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { incomeTaxEmail, setIncomeTaxEmail } = useStore();
  const navigate = useNavigate();

  const telefoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
  const cepRegex = /^\d{5}-?\d{3}$/;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [clientData, setClientData] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleFetchClientData = async () => {
    try {
      setErrorMessage('');
      const getClientDataUri = `http://localhost:8081/api/client/${incomeTaxEmail.email}`;

      const response = await axios.get(getClientDataUri);
      setClientData(response.data);
    } catch (error) {
      setErrorMessage(
        'Erro ao conectar com o servidor, tente novamente mais tarde!',
      );
    }
  };

  const handleGetLocalStorage = () => {
    const encodedEmail = localStorage.getItem('encoded');
    const decodedEmail = atob(encodedEmail);
    setIncomeTaxEmail(decodedEmail);
  };

  useEffect(() => {
    if (incomeTaxEmail.email) {
      handleFetchClientData();
    } else {
      handleGetLocalStorage();
      if (incomeTaxEmail.email) {
        handleFetchClientData();
      }
    }
  }, [incomeTaxEmail]);

  const schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Campo obrigatório')
      .matches(telefoneRegex, 'Telefone inválido'),
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

  const handleBack = () => {
    navigate('/simulador');
  };

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const updateUrl = 'http://localhost:8081/api/client/update';
      let completeData = {
        id: clientData.id,
        phoneNumber: values.phoneNumber,
        address: {
          addressId: clientData.address.addressId,
          state: values.state,
          city: values.city,
          publicPlace: values.publicPlace,
          neighborhood: values.neighborhood,
          number: values.number,
          zipCode: values.zipCode,
          complement: values.complement,
        },
      };
      const response = await axios.put(updateUrl, completeData);
      if (response.status === 200) {
        handleShowAlert();
      }
    } catch (error) {
      setErrorMessage(
        'Erro ao conectar com o servidor, tente novamente mais tarde!',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showAlert && (
        <div
          className="alert alert-danger position-absolute top-0 end-0 m-2 text-center"
          role="alert"
        >
          <p className="fs-6">Atualizado com sucesso</p>
        </div>
      )}
      {clientData && (
        <Formik
          initialValues={{
            phoneNumber: clientData.phoneNumber,
            state: clientData.address.state,
            city: clientData.address.city,
            publicPlace: clientData.address.publicPlace,
            neighborhood: clientData.address.neighborhood,
            number: clientData.address.number,
            zipCode: clientData.address.zipCode,
            complement: clientData.address.complement,
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
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
                        <Button type="button" onClick={handleBack}>
                          voltar
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <InputField
                          type="text"
                          name="phoneNumber"
                          label="Telefone"
                        />
                      </div>
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
                      disabled={isSubmitting}
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
      )}
    </>
  );
};

export default Update;
