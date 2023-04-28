import { Button, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface EditableRowProps {
    fieldArray: string[];
}

const EditableRow = ({ fieldArray }: EditableRowProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editBtnName, setEditBtnName] = useState('Edit');

    const handleEditClick = () => {
        setIsEditing((prv) => !prv);
    };

    useEffect(() => {
        if (isEditing) {
            setEditBtnName('Confirm');
        } else {
            setEditBtnName('Edit');
        }
    });

    return (
        <TableRow>
            {fieldArray.map((item, index) => (
                <TableCell key={index}>{isEditing ? <EditableCell field={item} /> : item}</TableCell>
            ))}
            <TableCell></TableCell>
            <TableCell>
                <Button onClick={handleEditClick}>{editBtnName}</Button>
                <Button>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

interface EditableCellProps {
    field: string;
}

const EditableCell = ({ field }: EditableCellProps) => {
    const [inputValue, setInputValue] = useState(field);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return <input type="text" value={inputValue} onChange={handleInputChange} />;
};

export default EditableRow;
