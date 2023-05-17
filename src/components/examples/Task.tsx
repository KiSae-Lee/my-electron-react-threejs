import React from 'react';

export interface TaskProps {
    task: { id: string; title: string; state: string };
}

export interface TaskEvent {
    onArchiveTask: (id: string) => void;
    onPinTask: (id: string) => void;
}

export const Task = ({ task: { id, title, state } }: TaskProps, { onArchiveTask, onPinTask }: TaskEvent) => {
    return (
        <div className={`list-item ${state}`} style={{ display: 'flex' }}>
            <label className="checkbox">
                <input type="checkbox" defaultChecked={state === 'TASK_ARCHIVED'} disabled={true} name="checked" />
                <span
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}
                    id={`archivedTask-${id}`}
                    aria-label={`archivedTask-${id}`}
                />
            </label>

            <div className="title">
                <input type="text" value={title} readOnly={true} />
            </div>

            <div className="actions" onClick={(event) => event.stopPropagation()}>
                {state !== 'TASK_ARCHIVED' && (
                    <a onClick={() => onPinTask(id)}>
                        <span className={`icon-star`} id={`pinTask-${id}`} aria-label={`pintTask-${id}`} />
                    </a>
                )}
            </div>
        </div>
    );
};
