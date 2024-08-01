import React from 'react';
import imgLucas from '../../assets/images/Lucas.jpg';
import Button from '../Form/Button';

const Card = () => {
  const handleRedirectMyPortfolio = () => {
    window.location.href = 'https://portfolio-neon-eight-34.vercel.app/index.html';
  }
  return (
    <div className="card border border-danger">
      <img
        src={imgLucas}
        className="card-img-top rounded-circle w-25 mx-auto py-4"
        alt="..."
      />
      <div className="card-body text-center">
        <h1 className="card-title fs-1 mb-3">Lucas Santos</h1>
        <h2 className="card-subtitle fs-2 mb-2">Olá, visitante!</h2>
        <p className="card-text fs-5">
          Estudo Ciência da Computação na Unimetrocamp. Desenvolvi esse projeto
          para colocar em prática meus conhecimentos Full Stack. Espero que
          tenha gostado, caso queira saber mais informações a meu respeito
          clique no botão abaixo
        </p>
        <Button onClick={handleRedirectMyPortfolio}>Saiba mais</Button>
      </div>
    </div>
  );
};

export default Card;
