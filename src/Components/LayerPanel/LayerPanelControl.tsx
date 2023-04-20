import React from 'react';

interface LayerPanelControlProps {
    onAddLayerClick(event: React.MouseEvent<HTMLButtonElement>): void;
    onDeleteClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const LayerPanelControl = ({ onAddLayerClick, onDeleteClick }: LayerPanelControlProps) => {
    return (
        <div className="Buttons">
            <button
                className="Add Layer"
                style={{
                    width: '25px',
                    height: '25px',
                    margin: '3px',
                }}
                onClick={onAddLayerClick}
            >
                +
            </button>
            <button
                className="Remove Selected Layer"
                style={{
                    width: '25px',
                    height: '25px',
                    margin: '3px',
                }}
                onClick={onDeleteClick}
            >
                -
            </button>
        </div>
    );
};

export default LayerPanelControl;
