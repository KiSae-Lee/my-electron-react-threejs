import React from 'react';
import PointRenderer from './Point';
import LineRenderer from './Line';

declare global {
    const lines: LineProps[] = [];
    const vertices = new Float32Array();

    export interface PointProps {
        x: number;
        y: number;
        z: number;
    }

    interface LineProps {
        sPt: Vec3;
        ePt: Vec3;
    }
}

export const GeometryRenderer = () => {
    return (
        <>
            <PointRenderer />
            <LineRenderer />
        </>
    );
};
