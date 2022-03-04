import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./MainPage.module.scss";
import { CustomInput } from "../../components";
import { debounce, set } from "lodash";
import { useGetContentsQuery } from "../../store/query/ContentsApi";
import { useDispatch } from "react-redux";

const { container, title, inputBox } = styles;

const MainPage = () => {
  const [value, setValue] = useState("");

  // eslint-disable-next-line
  const handleChange = useCallback(
    debounce((e) => {
      setValue(e.target.value);
    }, 400),
    [value],
  );

  useEffect(() => {
    // 만료시간 지난 캐시 삭제
    for (let i = 0; i < localStorage.length; i++) {
      // console.log(i);
      const localStorageElem = JSON.parse(
        localStorage.getItem(localStorage.key(i)),
      );
      if (localStorageElem.expireTime <= Date.now()) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }, []);

  return (
    <div className={classNames(container)}>
      <h1 className={classNames(title)}>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <div className={classNames(inputBox)}>
        <CustomInput
          placeholder="질환명을 입력해 주세요."
          onChange={handleChange}
        ></CustomInput>
      </div>
    </div>
  );
};

export default MainPage;
