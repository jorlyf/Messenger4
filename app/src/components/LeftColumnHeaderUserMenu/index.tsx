import * as React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { logout } from "@redux/slices/auth";
import useAppSelector from "@hooks/useAppSelector";

import styles from "./index.module.scss";

interface IUserMenuItem {
  text: string;
  iconUrl?: string;
  onClick: () => void | undefined | Promise<void>;
}

interface ILeftColumnHeaderUserMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: IUserMenuItem[];
}

const LeftColumnHeaderUserMenuContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getItems = (): IUserMenuItem[] => {
    if (!isAuthorized) return [];

    const items = [
      {
        //iconUrl: "",
        text: "Профиль",
        onClick: () => { navigate("/profile"); }
      },
      {
        //iconUrl: "",
        text: "Выйти",
        onClick: () => { dispatch(logout()); }
      }
    ];

    return items;
  }

  return (
    <LeftColumnHeaderUserMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      items={getItems()}
    />
  );
}

const LeftColumnHeaderUserMenu: React.FC<ILeftColumnHeaderUserMenuProps> = ({ items, isOpen, setIsOpen }) => {
  return (
    <>
      <div onClick={() => setIsOpen(prev => !prev)} className={styles.menu}>
        <img
          src="/images/DefaultAvatar.jpg"
        />
      </div>
      {isOpen && items?.length > 0 &&
        <div className={styles.content}>
          {items?.map(item => (
            <div key={item.text} className={styles.item}>
              {item.iconUrl && <img src={item.iconUrl} className={styles.icon} alt="" />}
              <span onClick={() => { item.onClick(); setIsOpen(false); }} className={styles.text}>{item.text}</span>
            </div>
          ))}
        </div>
      }
    </>
  );
}

export default LeftColumnHeaderUserMenuContainer;