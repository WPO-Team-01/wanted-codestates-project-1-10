import React from 'react';
import classNames from 'classnames';
import styles from './CustomInput.module.scss';
import { api } from '../../axios';

const { inputBox, inputContent, inputText, buttonBox } = styles;

const CustomInput = ({ placeholder, value, disable }) => {
  const handleInputChange = e => {
    console.log(e.target.value);
  };

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputContent)}>
        <div className={classNames(inputText)}>
          <div>&#128269;</div>
          <input type='text' placeholder={placeholder} disabled={disable} />
        </div>
        <div className={classNames(buttonBox)}>
          <button>검색</button>
          onChange={handleInputChange}
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
