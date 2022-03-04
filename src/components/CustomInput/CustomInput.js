import React from "react";
import classNames from "classnames";
import styles from "./CustomInput.module.scss";

const { inputBox, inputContent, inputText, buttonBox } = styles;

const CustomInput = ({ placeholder, value, disable, onChange }) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputContent)}>
        <div className={classNames(inputText)}>
          <div>&#128269;</div>
          <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
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
