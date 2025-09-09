"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  dialogContent: string;
};

const CustomDialog: React.FC<CustomDialogProps> = (props) => {
  const { open, onClose, dialogContent } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="-dialog-title">Alerta</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onClose} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
