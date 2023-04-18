import React, { useState } from 'react';
import SimpleDialog from './SqlDialog';

interface StatusBarProps {
    width: string;
    height: string;
}

const StatusBar = ({ width, height }: StatusBarProps) => {
    const [open, setOpen] = useState(false);

    const HandleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                boxSizing: 'border-box',
                MozBoxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                width: width,
                height: height,
                backgroundColor: 'white',
                border: '1px solid #bababa',
                alignContent: 'center',
            }}
        >
            <button onClick={HandleClickOpen}>SQL Dialog</button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
};

export default StatusBar;
