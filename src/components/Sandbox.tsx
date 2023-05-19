import React, { useEffect, useState } from 'react';
import Viewport from './Viewport';
import { useDispatch } from 'react-redux';
import { clear } from '../app/modules/geometrySlice';
import RunScript from '../app/runScript';
import CsvReadButton from './buttons/CsvReadButton';
import { readPointData } from '../app/modules/csvDataSlice';

const Sandbox = () => {
    const dispatch = useDispatch();
    const [isTesting, setIsTesting] = useState(true);

    const handleCsvPointData = (fields: string[][], head: string[]) => {
        dispatch(readPointData(fields));
        console.log(head);
    };

    const handleAnotherCsvPointData = (fields: string[][]) => {
        dispatch(readPointData(fields));
    };

    const handleRunScriptButtonClick = () => {
        dispatch(clear());
        RunScript();
        setIsTesting((prev) => !prev);
    };

    useEffect(() => {
        if (!isTesting) {
            setIsTesting((prev) => !prev);
        }
    }, [isTesting]);

    console.log('Sandbox re-rendered!');

    return (
        <div>
            <div>
                <Viewport height="800px" width="800px" test={isTesting} />
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
                <div className="run-script">
                    <button onClick={handleRunScriptButtonClick}>Run Script</button>
                </div>
            </div>
        </div>
    );
};

export default Sandbox;
