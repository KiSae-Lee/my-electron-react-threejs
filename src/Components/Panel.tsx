import React from 'react';
import LayerPanel from './LayerPanel/LayerPanel';
interface PanelProps {
    width: string;
    height: string;
}

const Panel = ({ width, height }: PanelProps) => {
    return (
        <div
            style={{
                width: width,
                height: height,
                backgroundColor: 'white',
                border: '1px solid #bababa',
            }}
        >
            <LayerPanel />
        </div>
    );
};

export default Panel;
