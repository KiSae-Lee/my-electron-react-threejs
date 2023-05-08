import { createSlice } from '@reduxjs/toolkit';
import ExecuteSQL, { DataBaseProps } from '../IPC';

interface LayerState {
    selectedLayer: string | null;
}

const initialState: LayerState = {
    selectedLayer: null,
};

export const layerSlice = createSlice({
    name: 'layer',
    initialState,
    reducers: {
        setLayerName: (state, action) => {
            state.selectedLayer = action.payload;
            getTableInfo(action.payload);
        },
    },
});

const getTableInfo = async (tableName: string) => {
    const tableHeads: string[][] = [];
    const tableItems: string[][] = [];

    await ExecuteSQL<DataBaseProps>(`PRAGMA table_info('${tableName}');`).then((data) => {
        // window.ipcApi.log('info', `Result from: PRAGMA table_info('${selectedLayer}');`);
        // window.ipcApi.log('info', data);
        for (const item of data[0].values) {
            // Set heads.
            tableHeads.push([item[1]]);
        }
        console.log('Call from getTableInfo:');
        console.log(tableHeads);
    });

    await ExecuteSQL<DataBaseProps>(`select * from '${tableName}'`).then((data) => {
        // window.ipcApi.log('info', `Result from: select * from '${selectedLayer}'`);
        // window.ipcApi.log('info', data);
        for (const item of data[0].values) {
            tableItems.push(item);
        }
        console.log('Call from getTableInfo:');
        console.log(tableItems);
    });
};

// Action creators are generated for each case reducer function
export const { setLayerName } = layerSlice.actions;

export default layerSlice.reducer;
