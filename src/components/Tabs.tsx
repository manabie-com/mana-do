import React, { useEffect, useReducer, useRef, useState } from "react";
import classnames from "classnames";
import "../styles/tabs.scss";

type Panel = {
  title: any;
  key: string;
};

type TabsProps = {
  activeKey: string;
  extra: any;
  children: any;
  panels: Panel[];
  onChange: Function;
};

const Tabs = ({ activeKey, children, extra, panels, onChange }: TabsProps) => {
  const renderNav = (
    <div role="tablist" className="tabs__nav">
      <div className="tabs__nav-wrapper">
        {panels.map((panel) => {
          return (
            <div
              onClick={() => {
                onChange(panel.key);
              }}
              className={classnames("nav__tab", {
                "nav__tab--active": panel.key === activeKey,
              })}
              key={panel.key}
            >
              <div role="tab" tabIndex={1} className="nav__tab-btn">
                {panel.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="tabs__nav-action">{extra}</div>
    </div>
  );
  return (
    <div className="ToDo__tabs">
      {renderNav}
      <div className="tabs__body">{children}</div>
    </div>
  );
};

export default Tabs;
