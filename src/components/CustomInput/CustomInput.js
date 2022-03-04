import React from "react";
import classNames from "classnames";
import styles from "./CustomInput.module.scss";
import { api } from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { complete } from "../../store/resultSlice";

const { inputBox, inputContent, inputText, buttonBox } = styles;

const ONE_MINUTE = 1000 * 60 * 60;

const CustomInput = ({ placeholder, value, disable }) => {
  const resultLists = useSelector((state) => state.result.value);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const searchInput = e.target.value;

    if (searchInput) {
      const checkCache = localStorage.getItem(searchInput);

      if (checkCache) {
        dispatch(complete(checkCache));
      } else {
        console.log("ggggggggg");
        api.get(searchInput).then((response) => {
          console.log(response.data);

          const object = {
            data: response.data,
            expireTime: new Date().getTime() + ONE_MINUTE,
          };

          localStorage.setItem(searchInput, JSON.stringify(object));
        });
      }
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
