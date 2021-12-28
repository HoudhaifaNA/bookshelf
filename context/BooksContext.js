import { createContext, useState } from "react";

export const BooksContext = createContext();

export function ContextWrapper({ children }) {
  let [term, setTerm] = useState("");

  return (
    <BooksContext.Provider value={[term, setTerm]}>
      {children}
    </BooksContext.Provider>
  );
}
