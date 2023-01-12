import React, { useContext, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@material-ui/core/Snackbar";
//import MuiAlert from "@material-ui/lab/Alert";
import { SnackbarContext } from "../../Context/snackbarProvider";

const SnackBars = () => {

    const {snackbar, setSnackbar} = React.useContext(SnackbarContext)
    console.log(snackbar)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

      const handleClose = () => {
        setSnackbar({
          isOpen: false,
          status: snackbar.status,
        });
      };

    return <div>
        <Snackbar
        anchorOrigin={{vertical: 'top',horizontal: 'center'}}
        open={snackbar.isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.status ? "success" : "error"}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
}

export default SnackBars