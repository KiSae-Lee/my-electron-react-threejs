import { store } from '../../app/store';
import { Point } from '../geometry/Point';

export const createPointsFromData = () => {
    const points = store.getState().csvDataSlice.points;

    for (const point of points) {
        Point({ x: Number(point[0]), y: Number(point[1]), z: Number(point[2]) });
    }
};
