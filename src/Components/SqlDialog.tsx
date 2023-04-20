import React, { useRef, useState } from 'react';
import { Box, Dialog, DialogTitle, TextField } from '@mui/material';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, open } = props;
    const boxRef = useRef();
    const [textFieldValue, setTextFieldValue] = useState('');
    const [result, setResult] = useState('Result Here');

    const handleClose = () => {
        onClose();
    };

    const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        window.ipcApi.send('run-sql', textFieldValue);
        window.ipcApi.receive('sql-return-run-sql', (data: never[]) => {
            window.ipcApi.log('info', `Received data from main process`);
            window.ipcApi.log('info', data);
            setResult(JSON.stringify(data));
            window.ipcApi.removeListeners('sql-return-run-sql');
        });
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>SQL Dialog</DialogTitle>
            <Box
                display={'flex'}
                flexDirection={'column'}
                ref={boxRef}
                component="form"
                sx={{
                    '& > :not(style)': { m: '10px', width: '500px' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-multiline-static"
                    label="Query"
                    multiline
                    rows={4}
                    value={textFieldValue}
                    onChange={onTextFieldChange}
                />
                <button type="submit" style={{ margin: '10px' }}>
                    Submit Query
                </button>
            </Box>
            <div
                style={{
                    padding: '10px',
                    width: '500px',
                    fontSize: '12px',
                }}
            >
                {result}
            </div>
        </Dialog>
    );
};

export default SimpleDialog;
