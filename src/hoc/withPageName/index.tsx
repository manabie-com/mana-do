import React from "react";

const withPageName = (
  WrappedComponent: React.FC,
  name?: string
): (() => JSX.Element) => {
  return (): JSX.Element => {
    return (
      <div>
        <h1>{name} Page</h1>

        <WrappedComponent />
      </div>
    );
  };
};

export default withPageName;
