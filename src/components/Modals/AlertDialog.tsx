import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteArticle } from "../../pages/Articles/apis";
import { useHistory } from "react-router";

const AlertDialog = ({
  open,
  setOpen,
  slug,
  token,
  handleAgree,
  handleClose,
}: {
  open: boolean;
  setOpen: any;
  slug: string;
  token: string | null;
  handleAgree: any;
  handleClose: any;
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = () => {
    console.log("I do not agree.");
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Successful Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are successful in deleting!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
