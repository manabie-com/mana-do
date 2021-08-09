import React from 'react';

const Background = ({wrapClass, url, message}: any) => {
  return <div className={wrapClass}>
    <img src={url}/>
    {(message && message.length) && <div>{message}</div>}
  </div>;
};

export default Background;
