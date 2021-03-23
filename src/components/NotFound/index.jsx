import React from "react";
import "./styles.css";

function NotFound(props) {
  return (
    <div className="page__error">
      <h1 className="page__error-title">404</h1>
      <p className="page__error-text">Page not found</p>
      <a className="page__error-link" href="/">
        Return Home
      </a>
    </div>
  );
}

export default NotFound;
