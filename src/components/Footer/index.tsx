import * as React from "react";
import styles from "./Footer.module.css";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return <div className={`${styles.ManaDo__Footer} mt-3`}></div>;
};

export default Footer;
