/**
 * createDataContext: Automation generates Content for remote state management
 */
import React from "react";
import PropTypes from "prop-types";

export const createDataContext = (reducer, actions, initialState) => {
  const Context = React.createContext();

  /**
   * Provider: Define Provider Component for wrapping the dom tree with this Context
   * @param {children} param0 
   */
  const Provider = ({ children }) => {
    /**
     * Using useReducer for state management  
     */
    const [state, dispatch] = React.useReducer(reducer, initialState);

    /**
     * bound dispatch back to the abstraction actions
     */
    const boundActions = {}; 
    Object.keys(actions).forEach((key) => { 
      boundActions[key] = actions[key](dispatch); // map the abstraction actions and call it with dispatch to make the boundActions
    });

    /**
     * Return Wrapper and pass the state and boundActions 
     */
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  Provider.propTypes = {
    children: PropTypes.any,
  };

  /**
   * Main return Context as a way and Provider as a Wraper 
   */
  return { Context, Provider };
};

export default createDataContext;
