import React from "react";
import { useNavigate } from "react-router";
import useAppSelector from "@hooks/useAppSelector";
import Search from "@components/Search";
import useDebounce from "@hooks/useDebounce";
import UserService from "@services/UserService";
import { RoutingURL } from "@routing/index";
import SearchResultContainer, { SearchResultItems } from "./SearchResult";

interface DialogAndUserSearchContainerProps {
  clearAfterItemClick: boolean;
}

const DialogAndUserSearchContainer: React.FC<DialogAndUserSearchContainerProps> = ({
  clearAfterItemClick
}) => {
  const navigate = useNavigate();
  const ownerUser = useAppSelector(state => state.profile.user);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchResultItems, setSearchResultItems] = React.useState<SearchResultItems>({ users: [], groupDialogs: [] });

  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);

  const search = useDebounce(async (value: string) => {
    if (!ownerUser) return;

    try {
      let users = await UserService.getUsersByLoginContains(value);
      users = users.filter(u => u.id !== ownerUser.id);

      setSearchResultItems({
        groupDialogs: [],
        users: users
      });
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);

    if (newValue) {
      setActive(true);
      search(newValue);
    }
    else {
      setActive(false);
    }
  }

  const handleOutsideClick = () => {
    if (!inputFocus) {
      setActive(false);
    }
  }

  const clear = () => {
    setSearchResultItems({ users: [], groupDialogs: [] });
    setSearchValue("");
    setActive(false);
  }

  const handleUserItemClick = (userId: number) => {
    if (clearAfterItemClick) {
      clear();
    }

    navigate(`${RoutingURL.chat}/user=${userId}`);
  }

  const handleGroupDialogItemClick = (groupId: number) => {
    if (clearAfterItemClick) {
      clear();
    }

    navigate(`${RoutingURL.chat}/group=${groupId}`);
  }

  React.useEffect(() => {
    if (inputFocus) {
      setActive(true);
    }
  }, [inputFocus]);

  return (
    <DialogAndUserSearch
      searchValue={searchValue}
      setSearchValue={handleChangeSearchValue}
      inputFocus={inputFocus}
      setInputFocus={setInputFocus}
      disabled={!ownerUser}
      active={active}
      searchResultItems={searchResultItems}
      handleUserItemClick={handleUserItemClick}
      handleGroupDialogItemClick={handleGroupDialogItemClick}
      handleOutsideClick={handleOutsideClick}
    />
  )
}

interface DialogAndUserSearchProps {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
  inputFocus: boolean;
  setInputFocus: (newValue: boolean) => void;
  disabled: boolean;
  active: boolean;
  searchResultItems: SearchResultItems;
  handleUserItemClick: any;
  handleGroupDialogItemClick: any;
  handleOutsideClick: any;
}

const DialogAndUserSearch: React.FC<DialogAndUserSearchProps> = ({
  searchValue,
  setSearchValue,
  inputFocus,
  setInputFocus,
  disabled,
  active,
  searchResultItems,
  handleUserItemClick,
  handleGroupDialogItemClick,
  handleOutsideClick
}) => {

  return (
    <div>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        isFocus={inputFocus}
        setIsFocus={setInputFocus}
        disabled={disabled}
      />
      {active && (searchResultItems.users.length > 0 || searchResultItems.groupDialogs.length > 0) &&
        <SearchResultContainer
          items={searchResultItems}
          handleUserItemClick={handleUserItemClick}
          handleGroupDialogItemClick={handleGroupDialogItemClick}
          handleOutsideClick={handleOutsideClick}
        />
      }
    </div>
  )
}

export default DialogAndUserSearchContainer;