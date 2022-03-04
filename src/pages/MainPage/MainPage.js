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
  const [skip, setSkip] = useState(true);
  const { data } = useGetContentsQuery(value, { skip });

  useEffect(() => {
    if (!value) {
      setSkip(true);
    }
  }, [value]);

  // eslint-disable-next-line
  const handleChange = useCallback(
    debounce((e) => {
      setValue(e.target.value);
      setSkip(false);
    }, 400),
    [value],
  );

  const handleClickSearch = () => {
    if (!value) {
      alert("검색어를 입력해 주세요!");
    }
  };

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
          onClick={handleClickSearch}
        ></CustomInput>
      </div>
    </div>
  );
};

export default MainPage;
