import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarAlertProps {
    open: boolean;
    onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    severity: 'success' | 'error';
    message: string;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, onClose, severity, message }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);

export default SnackbarAlert;