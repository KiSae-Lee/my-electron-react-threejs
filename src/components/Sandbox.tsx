import React from 'react';
import Viewport from './Viewport';
import { useDispatch } from 'react-redux';
import { clear } from '../app/modules/geometrySlice';
import RunScript from '../app/runScript';
import CsvReadButton from './buttons/CsvReadButton';
import { readPointData } from '../app/modules/csvDataSlice';

const Sandbox = () => {
    const dispatch = useDispatch();

    const handleCsvPointData = (fields: string[][]) => {
        dispatch(readPointData(fields));
    };

    const handleAnotherCsvPointData = (fields: string[][]) => {
        dispatch(readPointData(fields));
    };

    dispatch(clear());
    RunScript();

    return (
        <div>
            <div>
                <Viewport height="800px" width="800px" test={true} />
            </div>
            <div style={{ height: '100px' }}>
                <h3>Sandbox Control</h3>
                <div className="custom-controls" style={{ height: '30px' }}>
                    <CsvReadButton
                        hasTitle={true}
                        hasHead={true}
                        count={3}
                        onItemRead={handleCsvPointData}
                        buttonName="Point Data Import"
                    />
                    <CsvReadButton
                        hasTitle={true}
                        hasHead={true}
                        count={3}
                        onItemRead={handleAnotherCsvPointData}
                        buttonName="Point Data Import"
                    />
                </div>
            </div>
        </div>
    );
};

export default Sandbox;
