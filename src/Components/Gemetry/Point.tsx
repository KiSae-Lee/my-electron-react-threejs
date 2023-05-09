import React, { useRef } from 'react';
import { Vec3 } from './Vector';

export interface PointProps {
    x: number;
    y: number;
    z: number;
}

let vertices = new Float32Array([]);

export function Point({ x, y, z }: PointProps): void;

export function Point(vector: Vec3): void;

export function Point(args: PointProps | Vec3) {
    if ('x' in args && 'y' in args && 'z' in args) {
        const { x, y, z } = args;
        const newArr = new Float32Array(vertices.length + 3);
        newArr.set(vertices);
        newArr[newArr.length - 3] = x;
        newArr[newArr.length - 2] = y;
        newArr[newArr.length - 1] = z;

        vertices = newArr;
    } else {
        const { x, y, z } = args;
        const newArr = new Float32Array(vertices.length + 3);
        newArr.set(vertices);
        newArr[newArr.length - 3] = x;
        newArr[newArr.length - 2] = y;
        newArr[newArr.length - 1] = z;

        vertices = newArr;
    }
}

const PointRenderer = () => {
    const ref = useRef(null);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={vertices}
                    itemSize={3}
                    count={vertices.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="red" sizeAttenuation={true} />
        </points>
    );
};

export default PointRenderer;
