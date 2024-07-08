import React, { createContext, useContext, useReducer, useState } from "react";

interface IGlobalContext {
  drawerState: ReturnType<typeof useState<React.ReactNode | null>>;
  modalState: ReturnType<typeof useState<React.ReactNode | null>>;
}

const initialState = {} as IGlobalContext;
const GlobalContext = createContext<IGlobalContext>(initialState);

export function GlobalContextProvider(props: { children: React.ReactNode }) {
  const drawerState = useState<React.ReactNode | null>(null);
  const modalState = useState<React.ReactNode | null>(null);

  const value: IGlobalContext = { drawerState, modalState };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
