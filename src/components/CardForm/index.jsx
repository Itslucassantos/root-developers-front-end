import React from 'react';
import './CardForm.css';

const CardForm = ({ firstDiv, secondDiv, order, paddingSide }) => {
  return (
    <div className="container p-5 my-5">
      <div className="row my-md-5">
        <div
          className={`${
            order
              ? 'p-5 col-md-6 colorBg text-white rounded-start-4 text-center shadow d-flex align-items-center rounded-custom-first'
              : 'p-5 col-md-6 border border-light-subtle rounded-start-4 shadow-lg bg-body-tertiary rounded-custom-first'
          } ${paddingSide ? 'px-2' : ''}`}
        >
          {firstDiv}
        </div>
        <div
          className={`${
            order
              ? 'p-5 col-md-6 border border-light-subtle rounded-end-4 shadow-lg bg-body-tertiary rounded-custom-second'
              : 'p-5 col-md-6 colorBg text-white rounded-end-4 text-center shadow d-flex align-items-center rounded-custom-second'
          }`}
        >
          {secondDiv}
        </div>
      </div>
    </div>
  );
};

export default CardForm;
