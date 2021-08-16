
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function Notification({ ...props }) {
  const { noti = {} } = props;
  const {t} = useTranslation()
  let classNameCustome = "ma-noti-defaul";
  const [show,setShow] = useState(noti.status)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000)
  },[noti.status])
  switch (noti.type) {
    case "alert":
      classNameCustome = "ma-noti-default ma-noti-alert";
      break;
    case "success":
      classNameCustome = "ma-noti-default ma-noti-success";
      break;

    default:
      break;
  }
  return (
    <div className={noti.status ? `${classNameCustome} slideDown` : `${classNameCustome} slideUp`}>
      <div className="ma-noti-content ">{noti.content ? t(noti.content) : ""}</div>
    </div>
  );
}
