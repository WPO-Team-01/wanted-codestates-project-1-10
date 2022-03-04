import React, { useEffect } from "react";
import classNames from "classnames";
import styles from "./MainPage.module.scss";
import { CustomInput } from "../../components";

const { container, title, inputBox } = styles;

const MainPage = () => {
  useEffect(() => {
    // 만료시간 지난 캐시 삭제
    for (let elem in localStorage) {
      const localStorageElem = JSON.parse(localStorage.getItem(elem));
      if (
        localStorageElem?.expireTime &&
        localStorageElem?.expireTime <= Date.now()
      ) {
        localStorage.removeItem(elem);
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
        <CustomInput placeholder="질환명을 입력해 주세요."></CustomInput>
      </div>
    </div>
  );
};

export default MainPage;
