import React from 'react';

interface StatusBarProps {
    width: string;
    height: string;
}

const StatusBar = ({ width, height }: StatusBarProps) => {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                MozBoxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                width: width,
                height: height,
                backgroundColor: 'white',
                border: '1px solid #bababa',
            }}
        ></div>
    );
};

export default StatusBar;
