import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./CustomInput.module.scss";
import { useSelector } from "react-redux";

const {
  inputBox,
  inputContent,
  inputText,
  buttonBox,
  ulBox,
  liBox,
  textContent,
} = styles;

const CustomInput = ({
  placeholder,
  //onChange,
  value,
  disable,
}) => {
  const inputRef = useRef();
  const ulRef = useRef();
  const liRefs = useRef();
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState();
  const [open, setOpen] = useState();

  const onChange = (e) => {
    setKeyword(e.target.value);
    setOpen(true);
  };

  const resultLists = useSelector((state) => state.resultSlice);
  console.log(resultLists);
  const ARROW_DOWN = "ArrowDown";
  const ARROW_UP = "ArrowUp";
  const ESCAPE = "Escape";

  const onInputKeyDown = (e) => {
    if (e.key === ARROW_DOWN) {
      if (e.keyCode === 229) {
        return;
      }
      console.log(e.target.value, e.isComposing);
      //모달 열기
      setOpen(true);
      const first = liRefs.current[0];
      //첫 요소에 포커스 주기
      if (first) {
        first.focus();
      }
    }
    if (e.key === ESCAPE) {
      //모달 닫기
      setOpen(false);
      inputRef.current.focus();
    }
  };

  const onListKeyDown = (e, index) => {
    const next = liRefs.current[index + 1];
    const prev = liRefs.current[index - 1];
    const first = liRefs.current[0];
    const last = liRefs.current[liRefs.current.length - 1];
    console.log(e, index, liRefs);
    if (e.key === ARROW_DOWN) {
      e.preventDefault();
      if (next) {
        next.focus();
        console.log(next);
      } else {
        //다음 요소 없으면 처음으로
        first && first.focus();
      }
    }

    if (e.key === ARROW_UP) {
      e.preventDefault();
      if (prev) {
        prev.focus();
      } else {
        //다음 요소 없으면 마지막으로
        last && last.focus();
      }
    }
    if (e.key === ESCAPE) {
      e.preventDefault();
      setKeyword("");
      setOpen(false);
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    liRefs.current = [];
    if (!keyword) {
      setOpen(false);
      return;
    }
    const newList = resultLists.filter(
      (item) => item.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
    );
    setList(newList);
  }, [keyword]);

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
            ref={inputRef}
            onKeyDown={onInputKeyDown}
          />
        </div>
        <div className={classNames(buttonBox)}>
          <button>검색</button>
        </div>
      </div>
      {list.length > 0 && open && (
        <div className={classNames(ulBox)}>
          <ul className={classNames(liBox)} ref={ulRef}>
            <p>추천 검색어</p>
            {list.map((item, index) => (
              <li
                key={index}
                ref={(el) => (liRefs.current[index] = el)}
                tabIndex="0"
                onKeyDown={(e) => onListKeyDown(e, index)}
              >
                🔍
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {list.length === 0 && open && (
        <div className={classNames(ulBox)}>
          <p className={classNames(textContent)}>추천 검색어 없음</p>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
