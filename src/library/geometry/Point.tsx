import React, { useRef } from 'react';

export interface PointProps {
    x: number;
    y: number;
    z: number;
}

let points = new Float32Array([]);

export const Point = ({ x, y, z }: PointProps) => {
    // Do something...
    const newArr = new Float32Array(points.length + 3);
    newArr.set(points);
    newArr[newArr.length - 3] = x;
    newArr[newArr.length - 2] = y;
    newArr[newArr.length - 1] = z;

    points = newArr;
};

const PointRenderer = () => {
    const ref = useRef(null);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={points} itemSize={3} count={points.length / 3} />
            </bufferGeometry>
            <pointsMaterial size={1} color="red" sizeAttenuation={true} />
        </points>
    );
};

export default PointRenderer;
