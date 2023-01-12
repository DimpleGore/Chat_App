import React, { createContext, useState,useEffect } from 'react';

 export const SnackbarContext = createContext();
 console.log(SnackbarContext)

export const SnackbarContainer = ({ children }) => {
    console.log("SnackbarContainer")

    const [snackbar, setSnackbar] = useState({
        message: '',
        type: 'default'
      });
      console.log(snackbar)
     
      const handleSnackbarSet = (snackBarObj) => {
        console.log(snackBarObj)
        setSnackbar(snackBarObj)
      };
     
      const contextValue = {
        setSnackbar: handleSnackbarSet,
        snackbar
      };

    return (
      <SnackbarContext.Provider value={contextValue}>
        {children}
      </SnackbarContext.Provider>
    )
  };

export default SnackbarContainer
