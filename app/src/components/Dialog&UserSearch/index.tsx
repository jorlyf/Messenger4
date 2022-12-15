import React from "react";
import useAppSelector from "@hooks/useAppSelector";
import Search from "@components/Search";
import SearchResult from "./SearchResult";

interface DialogAndUserSearchProps {
  handleUserItemClick: (userId: number) => void;
  handlePublicGroupItemClick: (groupId: number) => void;
  clearAfterItemClick: boolean;
}

const DialogAndUserSearch: React.FC<DialogAndUserSearchProps> = ({
  handleUserItemClick,
  handlePublicGroupItemClick,
  clearAfterItemClick
}) => {

  //const ownerUser = useAppSelector(state => state.profile.user);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState([]);

  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  }

  const handleOutsideClick = () => {
    if (!inputFocus) {
      setActive(false);
    }
  }

  const clear = () => {
    setSearchResult([]);
    setSearchValue("");
    setActive(false);
  }

  const localHandleUserItemClick = (userId: number) => {
    handleUserItemClick(userId);
    if (clearAfterItemClick) {
      clear();
    }
  }

  const localHandlePublicGroupItemClick = (groupId: number) => {
    handlePublicGroupItemClick(groupId);
    if (clearAfterItemClick) {
      clear();
    }
  }

  React.useEffect(() => {
    if (inputFocus) {
      setActive(true);
    }
  }, [inputFocus]);

  return (
    <div>
      {/* <Search
        value={searchValue}
        setValue={handleChangeSearchValue}
        isFocus={inputFocus}
        setIsFocus={setInputFocus}
        disabled={!ownerUser}
      /> */}
      {active && searchResult &&
        <SearchResult
        // items={searchResult}
        // handleUserItemClick={localHandleUserItemClick}
        // handleOutsideClick={handleOutsideClick}
        />
      }
    </div>
  )
}