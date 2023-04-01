import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface AlertDialogProps extends React.PropsWithChildren {
  show: boolean;
  onClose: React.MouseEventHandler;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ show, onClose, children }) => {
  return (
    <div>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
