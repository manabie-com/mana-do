import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
export default function UserMenu({ ...props }) {
  const userName = localStorage.getItem("username");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { onClickSignOut = () => {} } = props;
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
    }
  };
  useEffect(() => {}, []);
  return (
    <div
      className="ma-user-menu-wrapper"
      onMouseLeave={() => {
        if (show) {
          setShow(false);
        }
      }}
    >
      <div
        onMouseEnter={() => {
          if (!show) {
            setShow(true);
          }
        }}
        className="ma-user-avatar"
      >
        <img alt="mana-do" src="/img/TodoScreen/user.svg" />
      </div>
      <div
        ref={ref}
        className={
          show
            ? "ma-user-menu ma-shadow ma-show-item"
            : "ma-user-menu ma-shadow ma-hide-item"
        }
      >
        <div className="ma-user-menu-title">
          {t("hello")}
          {` ${userName}`}
        </div>
        <div className="ma-user-menu-item-wrapper">
          <div
            onClick={onClickSignOut}
            className="ma-user-menu-item ma-text ma-alert-color"
          >
            {t("sign_out")}
          </div>
        </div>
        {/* <div className="ma-user-menu-item-wrapper">
          <div
            onClick={() => {
              i18n.changeLanguage("vi");
            }}
            className="ma-user-menu-item ma-text"
          >
            {t("language_vi")}
          </div>
        </div>
        <div className="ma-user-menu-item-wrapper">
          <div
            onClick={() => {
              i18n.changeLanguage("en");
            }}
            className="ma-user-menu-item ma-text"
          >
            {t("language_en")}
          </div>
        </div> */}
      </div>
    </div>
  );
}
