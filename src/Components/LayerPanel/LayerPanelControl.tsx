import React from 'react';

const LayerPanelControl = () => {
    return (
        <div className="Buttons">
            <button
                style={{
                    width: '25px',
                    height: '25px',
                    margin: '3px',
                }}
            >
                +
            </button>
            <button
                style={{
                    width: '25px',
                    height: '25px',
                    margin: '3px',
                }}
            >
                -
            </button>
        </div>
    );
};

export default LayerPanelControl;
