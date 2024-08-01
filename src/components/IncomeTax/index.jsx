import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import InputField from '../Register/InputField';
import axios from 'axios';
import useStore from '../Register/Store/Store';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const IncomeTax = () => {
  const navigate = useNavigate();
  const [totalPayable, setTotalPayable] = React.useState(null);
  const {
    incomeTaxEmail,
    setIncomeTaxEmail,
    resetIncomeTaxEmail,
    setDeleteStatus,
  } = useStore();
  const [clientData, setClientData] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

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

  const handleSaveLocalStorage = (email) => {
    const encodedEmail = btoa(email);
    localStorage.setItem('encoded', encodedEmail);
  };

  const handleGetLocalStorage = () => {
    const encodedEmail = localStorage.getItem('encoded');
    const decodedEmail = atob(encodedEmail);
    setIncomeTaxEmail(decodedEmail);
  };

  useEffect(() => {
    if (incomeTaxEmail.email) {
      handleSaveLocalStorage(incomeTaxEmail.email);
      handleFetchClientData();
    } else {
      handleGetLocalStorage();
      if (incomeTaxEmail.email) {
        handleFetchClientData();
      }
    }
  }, [incomeTaxEmail.email]);

  const handleDelete = async () => {
    try {
      setErrorMessage('');
      const deleteClientUri = `http://localhost:8081/api/client/${clientData.id}`;

      const response = await axios.delete(deleteClientUri);
      setDeleteStatus(response.status);
      localStorage.removeItem('encoded');
      resetIncomeTaxEmail();
      setClientData(null);
      navigate('/');
    } catch (error) {
      setErrorMessage(
        'Erro ao conectar com o servidor, tente novamente mais tarde!',
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('encoded');
    resetIncomeTaxEmail();
    setClientData(null);
    navigate('/');
  };

  const handleUpdate = () => {
    navigate('/simulador/atualizar');
  };

  const handleSubmit = async (values) => {
    const calculateUrl = 'http://localhost:8081/api/tax/calculate';
    try {
      setErrorMessage('');
      const response = await axios.post(calculateUrl, values);
      setTotalPayable(response.data.totalPayable);
    } catch (error) {
      setErrorMessage(
        'Erro ao conectar com o servidor, tente novamente mais tarde!',
      );
    }
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number);
  };

  const schema = Yup.object().shape({
    monthlyIncome: Yup.number()
      .required('Campo obrigatório')
      .moreThan(0, 'A renda mensal deve ser maior do que zero'),
  });

  return (
    <div className="pt-md-5">
      <Formik
        initialValues={{
          monthlyIncome: 0,
          totalDependents: 0,
          monthlyEducationExpense: 0,
          monthlyAlimonyExpense: 0,
          monthlyMedicalExpense: 0,
          otherDeductions: 0,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="container pt-md-5 mt-5 shadow-lg bg-body-tertiary rounded-4">
              <div className="d-flex justify-content-evenly align-items-center pt-5 mb-4">
                <div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDelete}
                    type="button"
                  >
                    Deletar Conta
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2 ms-md-5"
                    onClick={handleUpdate}
                    type="button"
                  >
                    Editar Conta
                  </button>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm ms-sm-2"
                  type="button"
                  onClick={handleLogout}
                >
                  Sair da Conta
                </button>
              </div>
              <div className="text-center">
                <h1 className="fs-1">Simular seu Imposto de Renda</h1>
                <p className="mb-5">
                  Calcule aqui seu IR 2023. Preencha os campos para fazer a
                  simulação.{' '}
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="monthlyIncome"
                    label="Qual é sua renda mensal bruta?"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="totalDependents"
                    label="Quantos dependentes você tem?"
                  />
                </div>

                <div className="col-md-6 my-md-3">
                  <InputField
                    type="number"
                    name="monthlyEducationExpense"
                    label="Qual é seu gasto mensal com ensino?"
                  />
                </div>

                <div className="col-md-6 my-md-3">
                  <InputField
                    type="number"
                    name="monthlyAlimonyExpense"
                    label="Qual é seu gasto mensal com pensão alimentícia?"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="monthlyMedicalExpense"
                    label="Qual é sua despesa mensal médica?"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="otherDeductions"
                    label="Outras despesas"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <button
                    type="submit"
                    className="btn btn-outline-danger btn-sm my-4"
                  >
                    Calcular Imposto
                  </button>
                </div>
                <div className="ms-5 mt-3">
                  {totalPayable !== null && (
                    <p className="fs-6 fw-semibold">
                      O total de imposto a ser pago é de: {formatCurrency(totalPayable)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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
  );
};

export default IncomeTax;
