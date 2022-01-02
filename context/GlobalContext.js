import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function ContextWrapper({ children }) {
  const [term, setTerm] = useState("");
  const [modalOpen, toggleModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        search: [term, setTerm],
        modal: [modalOpen, toggleModal],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
