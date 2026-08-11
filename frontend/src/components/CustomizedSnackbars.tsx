import * as React from 'react';
import Alert, { type AlertColor, type AlertPropsColorOverrides } from '@mui/material/Alert';
import { Snackbar, type SnackbarCloseReason } from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';

interface Props {
    id?: string
    message: string
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
    open: boolean
    setOpen: (value: boolean) => void
}

export default function CustomizedSnackbars({ id, message, severity = "success", open, setOpen }: Props) {

  const handleClose = (
    e?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    e?.preventDefault()

    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <Snackbar
        key={id}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
          <Alert
              onClose={handleClose}
              severity={severity}
              variant="filled"
              sx={{ width: '100%' }}
          >
              {message}
          </Alert>
      </Snackbar>
  );
}
