import React from 'react';
import { Box, Dialog, DialogTitle, TextField } from '@mui/material';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>SQL Dialog</DialogTitle>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: '10px', width: '500px' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-multiline-static" label="Query" multiline rows={4} />
            </Box>
            <button style={{ margin: '10px' }}>Submit Query</button>
            <div
                style={{
                    padding: '10px',
                    width: '500px',
                    fontSize: '12px',
                }}
            >
                {'Results Here.'}
            </div>
        </Dialog>
    );
};

export default SimpleDialog;
