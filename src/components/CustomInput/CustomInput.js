import React from "react";
import classNames from "classnames";
import styles from "./CustomInput.module.scss";
import { api } from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { searchResultRequest } from "../../redux/resultSlice";

const { inputBox, inputContent, inputText, buttonBox } = styles;

const CustomInput = ({ placeholder, value, disable }) => {
  const dispatch = useDispatch();
  const resultLists = useSelector((state) => state.resultSlice);

  const handleInputChange = (e) => {
    const searchInput = e.target.value;

    if (searchInput) {
      dispatch(searchResultRequest(searchInput));
    }
  };

  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputContent)}>
        <div className={classNames(inputText)}>
          <div>&#128269;</div>
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
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
