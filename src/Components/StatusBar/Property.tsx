import React, { useEffect, useState } from 'react';
import { statusBarHeight } from '../../global';
import { TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../../App/store';
import ExecuteSQL, { DataBaseProps } from '../../IPC';

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
    // Get Columns and Values from the Layer.
    // Use map to create JSX codes.
    // Check the result.
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
            <div>
                <button>Add Item</button>
            </div>
            <div>
                <p>{selectedLayer}</p>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeads.map((item) => (
                                    <TableCell key={item}>{item}</TableCell>
                                ))}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData.map((items) => (
                                <TableRow>
                                    {items.map((item) => (
                                        <TableCell key={item}>{item}</TableCell>
                                    ))}
                                    <TableCell>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Property;
