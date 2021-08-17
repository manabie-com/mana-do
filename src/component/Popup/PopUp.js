import React from "react";
import { useTranslation } from "react-i18next";

export default function PopUp(props) {
  const {
    popupInfo = {},
    cbConfirm = () => {},
    cbCancel = () => {},
    iconPath = "",
    type = "",
  } = props;
  const { t } = useTranslation();
  let customClass = "ma-popup-content ma-shadow";
  switch (type) {
    case "alert":
      customClass = customClass + " ma-alert-popup";
      break;

    default:
      break;
  }
  return (
    <div
      className={
        popupInfo.showPopup
          ? "ma-popup-wrapper ma-show-item"
          : "ma-popup-wrapper ma-hide-item"
      }
    >
      <div className={customClass}>
        <div className="ma-popup-content-header">
          {iconPath ? <img alt="mana-do" src={iconPath} /> : null}
          <span className="ma-text-Medium">{popupInfo.title ? t(popupInfo.title) : ""}</span>
        </div>
        <div className="ma-popup-content-body">
          <span className="ma-text">{popupInfo.content ? t(popupInfo.content) : ""}</span>
        </div>
        <div className="ma-popup-content-footer">
          <div onClick={cbConfirm} className="ma-button ma-button-confirm">
            {t("confirm")}
          </div>
          <div onClick={cbCancel} className="ma-button ma-button-cancel">
            {t("cancel")}
          </div>
        </div>
      </div>
    </div>
  );
}
