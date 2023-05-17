import React, { useRef } from 'react';
import { RootState, store } from '../../app/store';
import { useSelector } from 'react-redux';
import { addPoint } from '../../app/modules/geometrySlice';

export interface PointProps {
    x: number;
    y: number;
    z: number;
}

// let points = new Float32Array([]);

export const Point = ({ x, y, z }: PointProps) => {
    const points = store.getState().geometrySlice.points;
    // const dispatch = useDispatch();

    const newArr = new Float32Array(points.length + 3);
    newArr.set(points);
    newArr[newArr.length - 3] = x;
    newArr[newArr.length - 2] = y;
    newArr[newArr.length - 1] = z;

    // points = newArr;
    // dispatch(addPoint(newArr));
    store.dispatch(addPoint(newArr));
};

const PointRenderer = () => {
    const ref = useRef(null);
    const points = useSelector((state: RootState) => state.geometrySlice.points);

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
