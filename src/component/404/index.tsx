import React from "react";

const NoMatch = () => {
  return (
    <div data-testid="no-match" className="no-match">
      <h1 data-testid="no-match-message">Sorry, the page does not exist</h1>
    </div>
  );
};

export default NoMatch;
