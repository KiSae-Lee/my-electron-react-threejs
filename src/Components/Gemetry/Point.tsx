import React, { useRef } from 'react';

export interface PointProps {
    x: number;
    y: number;
    z: number;
}

let vertices = new Float32Array([]);

export const Point = ({ x, y, z }: PointProps) => {
    // Do something...
    const newArr = new Float32Array(vertices.length + 3);
    newArr.set(vertices);
    newArr[newArr.length - 3] = x;
    newArr[newArr.length - 2] = y;
    newArr[newArr.length - 1] = z;

    vertices = newArr;
};

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
