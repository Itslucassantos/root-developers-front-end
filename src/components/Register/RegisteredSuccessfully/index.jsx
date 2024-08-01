import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const RegisteredSuccessfully = ({ setSubmitted }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setSubmitted(false);
    navigate('/login');
  };

  return (
    <div
      className="alert alert-danger position-absolute top-0 end-0 m-2"
      role="alert"
    >
      <div className="d-flex flex-column text-center">
        <div>
          <p className="fs-6">Cadastrado com sucesso</p>
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-danger colorText fw-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisteredSuccessfully;
