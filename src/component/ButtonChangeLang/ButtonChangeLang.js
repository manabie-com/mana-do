import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns React Element with change language functional
 */
export default function ButtonChangeLang({ ...rest }) {
  // const lang = state.lang;
  const [isShowMenu, changeShowMenu] = useState(false);
  const { i18n } = useTranslation();
  const list = [
    {
      label: "VI",
      value: "vi",
      id: "vi-lang-option",
    },
    {
      label: "EN",
      value: "en",
      id: "en-lang-option",
    },
  ];
  const handleChange = (value) => {
    if (!value) return;
    const activeLang = value || "vi";
    i18n.changeLanguage(activeLang);
  };
  const onMouseEnterWrap = (event) => {
    if (!isShowMenu) {
      changeShowMenu(true);
    }
  };
  const onMouseLeaveWrap = (event) => {
    if (isShowMenu) {
      changeShowMenu(false);
    }
  };
  return (
    <div className={"group-change-lang-light"} onMouseLeave={onMouseLeaveWrap}>
      <img
        onMouseEnter={onMouseEnterWrap}
        alt="mana-do"
        src="/img/LoginScreen/globe.svg"
      />
      <div
        className={
          isShowMenu
            ? "ma-show-item change-language-option ma-shadow"
            : "ma-hide-item change-language-option ma-shadow"
        }
      >
        {list.map((item, index) => {
          let itemClass = "dropdown-items-lang";
          if (i18n.language === item.value)
            itemClass += " dropdown-item-lang-active ma-text-Medium";
          if (item.customItemClass)
            itemClass = `${itemClass} ${item.customItemClass}`;
          return (
            <div
              key={index}
              className={itemClass}
              onClick={() => handleChange(item.value)}
            >
              <div className="icon-lang">
                <img alt="mana-do" src="/img/LoginScreen/globe.svg" />
              </div>
              <div className="text-lang ma-text">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
