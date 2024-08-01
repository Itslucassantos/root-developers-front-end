import React, { useEffect } from 'react';
import '../../App.css';
import Navbar from '../Navbar';
import FormComponent from '../Form';
import imgTeamWork from '../../assets/images/team_work.svg';
import imgFinance from '../../assets/images/finance.svg';
import Button from '../Form/Button';
import imgNakamoto from '../../assets/images/nakamoto.svg';
import Card from '../Card';
import { NavLink } from 'react-router-dom';
import useStore from '../Register/Store/Store';

const Home = () => {
  const { resetDeleteStatus, deleteStatus } = useStore();
  const [showAlert, setShowAlert] = React.useState(false);

  const handleShowAlert = () => {
    resetDeleteStatus();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (deleteStatus.status === 204) {
      handleShowAlert();
    }
  }, []);

  return (
    <>
      {showAlert && (
        <div
          className="alert alert-danger position-absolute top-0 end-0 m-2 text-center"
          style={{ zIndex: 1050 }}
          role="alert"
        >
          <p className="fs-6">Conta deletada com sucesso!</p>
        </div>
      )}
      <Navbar />
      <h2 className="text-center colorTitle fs-1 m-5">
        Conheça nosso simulador de imposto de renda
      </h2>
      <div className="container row align-items-center mx-auto">
        <div className="col-md-5 col-12">
          <FormComponent />
        </div>
        <div className="col-md-7 col-12 mb-4">
          <img className="img-fluid" src={imgTeamWork} alt="Imagem team work" />
        </div>
        <div className="my-5 img-fluid d-flex justify-content-center">
          <img className="w-75" src={imgFinance} alt="Imagem da finance" />
        </div>
      </div>
      <div className="container row mx-auto d-flex justify-content-around my-5">
        <div className="col-12 col-md-6 mb-5">
          <h2 className="fs-2" id="sobre">
            Bem-vindo ao rootDev
          </h2>
          <h3 className="fs-3">Sobre o rootDev</h3>
          <p className="fs-6">
            Temos como objetivo disponibilizar de maneira gratuita o serviço de
            simulação de imposto de renda, visando facilitar para pessoas que
            têm dificuldade para fazer os cálculos e também agilizar o processo.
          </p>
          <p className="fs-6">
            Faça seu cadastro de maneira gratuita, clicando no botão abaixo
          </p>
          <NavLink to="/cadastro-opcoes">
            <Button>Cadastre-se</Button>
          </NavLink>
        </div>
        <div className="col-12 col-md-6">
          <img
            className="img-fluid"
            src={imgNakamoto}
            alt="Imagem do Nakamoto"
          />
        </div>
      </div>
      <div className="container my-5" id="quem-somos">
        <Card />
      </div>
    </>
  );
};

export default Home;
