import { createContext, useState, useEffect } from "react";

const Context = createContext({});

export function ContextProvider(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const context = {
    isLogin,
    setIsLogin,
    loading,
    setLoading
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
