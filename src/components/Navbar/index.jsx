import React from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg m-lg-4">
      <div className="container-fluid d-sm-flex justify-content-sm-around">
        <h1 className="ms-md-5">
          <img className="d-block w-75" src={logo} alt="Logo da rootDev" />
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-5 mb-2 mb-lg-0">
            <li className="nav-item me-5">
              <a className="nav-link fw-semibold" aria-current="page" href="#sobre">
                Sobre
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link fw-semibold" href="#quem-somos">
                Quem somos
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-decoration-none fw-semibold"
                to="/cadastro-opcoes"
              >
                Cadastre-se agora
              </NavLink>
            </li>
          </ul>
          <NavLink to="login">
            <button className="btn btn-outline-danger fw-semibold">
              Entrar
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
