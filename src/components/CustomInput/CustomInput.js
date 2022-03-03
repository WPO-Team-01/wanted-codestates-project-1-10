import React from 'react';
import classNames from 'classnames';
import styles from './CustomInput.module.scss';
import { useEffect, useState } from 'react';
import { api } from '../../axios';

const { inputBox, inputContent, inputText, buttonBox } = styles;

const CustomInput = ({ placeholder, value, disable }) => {
  const handleInputChange = e => {
    const searchInput = e.target.value;
    const checkCashe = localStorage.getItem(searchInput);
    //이미 입력한적 있는 단어라면
    if (checkCashe) {
      api.get(searchInput).then(res => {
        localStorage.getItem(searchInput);
      });
    } else {
      //처음 입력하는 단어라면
      api.get(searchInput).then(res => {
        localStorage.setItem(searchInput, JSON.stringify(res.data));
      });
    }
  };

  useEffect(() => {
    const now = new Date().getHours();
    if (now === 0) {
      localStorage.clear();
    }
  }, []);

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputContent)}>
        <div className={classNames(inputText)}>
          <div>&#128269;</div>
          <input
            type='text'
            placeholder={placeholder}
            onChange={e => handleInputChange(e)}
            value={value}
            disabled={disable}
          />
        </div>
        <div className={classNames(buttonBox)}>
          <button>검색</button>
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
