import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {  accessTokenSelector } from "../../selectors/auth.selector";

function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ToastComponent() {
  const toast:any = useSelector(accessTokenSelector);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(toast===false?true:false);
  }, [toast]);

  return (
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="error">
          Login fail,please login again!
        </Alert>
      </Snackbar>
  );
}
