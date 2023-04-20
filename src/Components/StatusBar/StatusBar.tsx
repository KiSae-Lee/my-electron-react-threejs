import React, { useState } from 'react';
import SimpleDialog from '../SqlDialog';
import Property from './Property';

interface StatusBarProps {
    width: string;
    height: string;
}

const StatusBar = ({ width, height }: StatusBarProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openProp, setOpenProp] = useState(false);

    const HandleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleShowProperty = () => {
        setOpenProp((current) => !current);
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
            <button onClick={handleShowProperty}>DB ProPerties</button>
            {openProp ? <Property /> : null}
            <SimpleDialog open={openDialog} onClose={handleClose} />
        </div>
    );
};

export default StatusBar;
