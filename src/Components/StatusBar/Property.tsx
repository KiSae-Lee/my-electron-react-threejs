import React from 'react';
import { statusBarHeight } from '../../global';
import { TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

const Property = () => {
    // Get Name of the Layer.
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
            <p>Layer Property</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Property;
