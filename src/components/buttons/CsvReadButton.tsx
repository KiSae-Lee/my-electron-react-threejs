/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from 'papaparse';
import React, { useRef } from 'react';

interface CsvReadButtonProps {
    hasTitle?: boolean;
    hasHead?: boolean;
    count?: number;
    className?: string | undefined;
    buttonName?: string;
    onItemRead?: (fields: any[][], head: any[], title: any[]) => void;
}

const CsvReadButton = ({
    hasTitle = false,
    hasHead = false,
    count = 1,
    className = undefined,
    buttonName = 'CSV Import',
    onItemRead,
}: CsvReadButtonProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current ? inputRef.current.click() : console.log('*ALERT* there is no inputRef!');
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            let title: any[] = [];
            let head: any[] = [];
            let fields: any[][] = [];
            // console.log("CsvReadButton: files selected!"); // Debug

            Papa.parse(event.target.files[0], {
                complete: (result) => {
                    // if somethings wrong. console.log it.
                    const rowData = result.data;
                    // if somethings wrong. console.log it.
                    const organizedData = rowData.map((data: any) => {
                        const result: any = [];

                        for (let i = 0; i < count; i++) {
                            const checkData =
                                (typeof data[i] === 'string' && data[i].trim() === '') ||
                                typeof data[i] === 'undefined';

                            if (!checkData) result[i] = data[i];
                        }
                        return result;
                    });

                    if (hasTitle) {
                        if (hasHead) {
                            // has Title and Head in the data.
                            title = organizedData[0];
                            head = organizedData[1];
                            fields = organizedData.slice(2);

                            // console.log("Title of the Data:");
                            // console.log(title);
                            // console.log("Head of the data:");
                            // console.log(head);
                            // console.log("Fields of the data:");
                            // console.log(fields);
                            if (onItemRead !== undefined) onItemRead(fields, head, title);
                        } else {
                            // Only has Title in the data.
                            title = organizedData[0];
                            fields = organizedData.slice(1);
                            // console.log("Title of the Data:");
                            // console.log(title);
                            // console.log("Fields of the data:");
                            // console.log(fields);
                            if (onItemRead !== undefined) onItemRead(fields, [], title);
                        }
                    } else {
                        if (hasHead) {
                            // only Head in the data.
                            head = organizedData[0];
                            fields = organizedData.slice(1);
                            // console.log("Head of the data:");
                            // console.log(head);
                            // console.log("Fields of the data:");
                            // console.log(fields);
                            if (onItemRead !== undefined) onItemRead(fields, head, []);
                        } else {
                            // only fields in the data.
                            fields = organizedData;
                            // console.log("Fields of the data:");
                            // console.log(fields);
                            if (onItemRead !== undefined) onItemRead(fields, [], []);
                        }
                    }
                },
            });
        }
    };

    return (
        <>
            <button onClick={handleButtonClick} className={className}>
                {buttonName}
            </button>
            <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleInputChange} />
        </>
    );
};

export default CsvReadButton;
