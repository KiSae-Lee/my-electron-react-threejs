import React, { useEffect, useState } from 'react';
import LayerIndicator from './LayerIndicator';
import LayerPanelControl from './LayerPanelControl';
import LayerPanelHeader from './LayerPanelHeader';
import ExecuteSQL, { DataBaseProps } from '../../IPC';
import { useDispatch } from 'react-redux';
import { setLayerName } from '../../Action/LayerSlice';

const LayerPanel = () => {
    // NOT allow to give a existing name for a layer.
    // So that, name of the layer going to be Unique and it can be treat as an ID.
    interface LayerProps {
        name: string;
        activated: boolean;
        selected: boolean;
    }

    const [layers, setLayers] = useState<LayerProps[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        ExecuteSQL<DataBaseProps>(`select name from sqlite_master where type='table'`).then((data) => {
            // load Layers from DB.
            const layersFromDb: LayerProps[] = data[0].values
                .map((item) => {
                    if (item[0] === 'sqlite_sequence') {
                        return null;
                    }
                    return {
                        name: item[0],
                        activated: false,
                        selected: false,
                    };
                })
                .filter(Boolean) as LayerProps[];
            setLayers((current) => [...current, ...layersFromDb]);
        });
    }, []);

    const handleAddLayerClick = () => {
        let count = 0;
        let layerName = `Layer ${count}`;

        while (layers.some((item) => item.name == layerName)) {
            count++;
            layerName = `Layer ${count}`;
            console.log('Same Name!');
        }

        console.log(count);

        const newLayer: LayerProps = {
            name: layerName,
            activated: false,
            selected: false,
        };

        setLayers((current) => [...current, newLayer]);
        ExecuteSQL(`create table "${layerName}" (id integer,name text)`);
    };

    const handleLayerActivated = (name: string) => {
        setLayers((items) =>
            items.map((item) => {
                if (item.name === name) {
                    return { ...item, activated: true };
                } else {
                    return { ...item, activated: false };
                }
            }),
        );
    };

    const handleLayerSelected = (name: string) => {
        setLayers((items) =>
            items.map((item) => {
                if (item.name === name) {
                    return { ...item, selected: true };
                } else {
                    return { ...item, selected: false };
                }
            }),
        );
        dispatch(setLayerName(name));
    };

    const handleDeleteClick = () => {
        setLayers(
            layers.filter((item) => {
                if (item.selected == false) {
                    return { ...item };
                } else {
                    window.ipcApi.send('run-sql', `drop table "${item.name}";`);

                    window.ipcApi.receive('sql-return-run-sql', (data: never[]) => {
                        window.ipcApi.log('info', `Received data from main process`);
                        window.ipcApi.log('info', data);
                        window.ipcApi.removeListeners('sql-return-run-sql');
                    });
                }
            }),
        );
    };

    const handleLayerNameChange = (current: string, value: string) => {
        if (layers.some((item) => item.name == value)) {
            console.log('ABORT! There is a layer with the same name.');
            return false;
        } else {
            setLayers((items) =>
                items.map((item) => {
                    if (item.name === current) {
                        window.ipcApi.send('run-sql', `alter table "${item.name}" rename to "${value}"`);

                        window.ipcApi.receive('sql-return-run-sql', (data: never[]) => {
                            window.ipcApi.log('info', `Received data from main process`);
                            window.ipcApi.log('info', data);
                            window.ipcApi.removeListeners('sql-return-run-sql');
                        });

                        return { ...item, name: value };
                    } else {
                        return { ...item, name: item.name };
                    }
                }),
            );

            return true;
        }
    };

    return (
        <div className="LayerPanel">
            <LayerPanelHeader />
            <LayerPanelControl onAddLayerClick={handleAddLayerClick} onDeleteClick={handleDeleteClick} />
            {layers?.map((layer) => (
                <LayerIndicator
                    key={layer.name}
                    activated={layer.activated}
                    selected={layer.selected}
                    title={layer.name}
                    onLayerActivated={handleLayerActivated}
                    onLayerSelected={handleLayerSelected}
                    onNameChange={handleLayerNameChange}
                />
            ))}
        </div>
    );
};

export default LayerPanel;
