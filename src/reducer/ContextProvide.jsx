import React, { createContext, useState, useContext } from 'react';

const Context = createContext();

const initialValue={
  summaryContent:{},
  userContent:{},
  youtubeid:"null",
  youtubeLink:"null",
  isNewVideo:true,
  token:null,
  credits:0,
}

const ContextProvider = ({ children }) => {
  const [ContextVariable, setContextVariable] = useState(initialValue);

  return (
    <Context.Provider value={{ ContextVariable, setContextVariable }}>
      {children}
    </Context.Provider>
  );
};

const useContextVariable = () => useContext(Context);

export { ContextProvider, useContextVariable };