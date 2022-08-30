import React from "react";
import InputField from "@components/InputField";
import SearchIcon from "@public/images/Search.png";

import styles from "./index.module.scss";

interface SearchProps {
  value: string;
  setValue: (newValue: string) => void;
  isFocus: boolean;
  setIsFocus: (bool: boolean) => void;
  disabled: boolean;
}

const Search: React.FC<SearchProps> = (props) => {
  return (
    <div className={styles.search}>
      <img className={styles.icon} src={SearchIcon} alt="SearchIcon" />
      <div className={styles.input}>
        <InputField
          value={props.value}
          setValue={props.setValue}
          placeholder={"Поиск..."}
          isOneRow={true}
          maxRows={1}
          setIsFocus={props.setIsFocus}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default Search;