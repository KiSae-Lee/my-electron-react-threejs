import { Button, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface EditableRowProps {
    fieldArray: string[];
    editing?: boolean;
}

const EditableRow = ({ fieldArray, editing }: EditableRowProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editBtnName, setEditBtnName] = useState('Edit');
    const [fields, setFields] = useState(fieldArray);

    useEffect(() => {
        if (isEditing) {
            setEditBtnName('Confirm');
        } else {
            setEditBtnName('Edit');
        }
    }, [isEditing]);

    useEffect(() => {
        if (editing !== undefined) setIsEditing(editing);
    }, []);

    const handleEditClick = () => {
        setIsEditing((prv) => !prv);
        window.ipcApi.log('info', `ID of this field: ${fields[0]}`);

        if (isEditing) {
            // EditableRef.current?.requestSubmit();
        }
    };

    const handleSubmit = () => {
        console.log('Submit');
    };

    return (
        <TableRow>
            {fields.map((item, index) => (
                <TableCell key={index}>
                    {isEditing && index !== 0 ? (
                        <EditableCell field={item === null ? '' : item} onSubmit={handleSubmit} />
                    ) : (
                        item
                    )}
                </TableCell>
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
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

const EditableCell = ({ field, onSubmit }: EditableCellProps) => {
    const [inputValue, setInputValue] = useState(field);
    const formRef = useRef<HTMLFormElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <input type="text" value={inputValue} onChange={handleInputChange} />
        </form>
    );
};

export default EditableRow;
