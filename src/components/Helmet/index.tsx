import React from "react";
import { Helmet } from "react-helmet";

interface HelmetTitleProps {
  title: string;
}

const HelmetTitle: React.FC<HelmetTitleProps> = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};

export default HelmetTitle;
