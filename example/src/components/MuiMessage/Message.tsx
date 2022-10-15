import React, { useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface Props {
  content: string;
  duration: number;
  type: AlertColor;
}
const Message: React.FC<Props> = ({ content, duration, type }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={duration}>
      <Alert severity={type}>{content}</Alert>
    </Snackbar>
  );
};
export default Message;
