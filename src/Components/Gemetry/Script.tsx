import { Line } from './Line';
import { Point } from './Point';
import { Vec3 } from './Vector';

export const RunScript = () => {
    Point({ x: 0, y: 0, z: 0 });
    Point({ x: 1, y: -1, z: 0 });

    const vec: Vec3 = { x: 1, y: 1, z: 0 };
    Point(vec);
    Line({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 0 });
};
