import React from 'react';
import LayerIndicator from './LayerIndicator';

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
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <label>Layers</label>
                <hr></hr>
                <LayerIndicator title={'test layer'} clickedColor={'white'} />
            </div>
        </div>
    );
};

export default Panel;
