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
                                    {tableHeads.map((item) => (
                                        <TableCell key={item}>
                                            {item}
                                            <Button>Delete</Button>
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Button>Add Item</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Property;
