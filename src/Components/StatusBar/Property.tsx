import React, { useEffect, useState } from 'react';
import { statusBarHeight } from '../../global';
import { TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../../App/store';
import ExecuteSQL, { DataBaseProps } from '../../IPC';

import EditableRow from './EditableRow';

const Property = () => {
    // Get Name of the Layer.
    const selectedLayer = useSelector((state: RootState) => state.selectedLayer);
    const [tableHeads, setTableHeads] = useState<string[]>([]);
    const [rowData, setRowData] = useState<string[][]>([]);
    const [isAddingItem, setIsAddingItem] = useState(false);

    useEffect(() => {
        if (selectedLayer !== null) {
            // Empty the TableHeads Array.
            setTableHeads([]);
            setRowData([]);
            // Call heads from DB.
            const getTableInfo = async () => {
                await ExecuteSQL<DataBaseProps>(`PRAGMA table_info('${selectedLayer}');`).then((data) => {
                    // window.ipcApi.log('info', `Result from: PRAGMA table_info('${selectedLayer}');`);
                    // window.ipcApi.log('info', data);
                    for (const item of data[0].values) {
                        // Set heads.
                        setTableHeads((current) => [...current, item[1]]);
                    }
                });

                await ExecuteSQL<DataBaseProps>(`select * from '${selectedLayer}'`).then((data) => {
                    // window.ipcApi.log('info', `Result from: select * from '${selectedLayer}'`);
                    // window.ipcApi.log('info', data);
                    for (const item of data[0].values) {
                        setRowData((current) => [...current, item]);
                    }
                });
            };

            getTableInfo();
            // getLayerInfo();
        }
    }, [selectedLayer]);

    const handleAddColumnClick = () => {
        console.log('Click!');
    };

    const handleAddItemClick = () => {
        setIsAddingItem((current) => !current);
    };

    const getEmptyField = () => {
        const arr: string[] = [];
        for (let i = 0; i < rowData[0].length; i++) {
            arr.push('');
        }
        return arr;
    };

    return (
        <div
            style={{
                position: 'fixed',
                width: '100vw',
                height: '300px',
                backgroundColor: 'white',
                bottom: `calc(0vh + ${statusBarHeight})`,
                zIndex: 3,
            }}
        >
            {selectedLayer === null ? null : (
                <div>
                    <p>{selectedLayer}</p>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {tableHeads.map((item, index) => (
                                        <TableCell key={item}>
                                            {item}
                                            {index !== 0 ? <Button>Delete</Button> : null}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Button onClick={handleAddColumnClick}>Add Column</Button>
                                    </TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowData.map((items, index) => (
                                    <EditableRow key={index} fieldArray={items} />
                                ))}
                                {isAddingItem ? (
                                    <EditableRow key="New" fieldArray={getEmptyField()} editing={true} />
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Button onClick={handleAddItemClick}>Add Item</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Property;
