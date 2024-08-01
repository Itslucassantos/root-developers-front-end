import { ErrorMessage, Field } from 'formik';
import React from 'react';
import './styles.css';

const InputField = ({ type, name, label, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control border-danger input "
      />
      <ErrorMessage name={name}>
        {(mensagens) => (
          <div style={{ color: 'red', marginTop: '4px' }}>{mensagens}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
