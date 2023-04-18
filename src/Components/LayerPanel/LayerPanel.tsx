import React from 'react';
import LayerIndicator from './LayerIndicator';
import LayerPanelControl from './LayerPanelControl';
import LayerPanelHeader from './LayerPanelHeader';

const LayerPanel = () => {
    return (
        <div className="LayerPanel">
            <LayerPanelHeader />
            <LayerPanelControl />
            <LayerIndicator title={'test layer'} clickedColor={'#bababa'} />
        </div>
    );
};

export default LayerPanel;
