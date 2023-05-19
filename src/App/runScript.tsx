import { createPointsFromData } from '../library/example/pointFromCsv';
import { Point } from '../library/geometry/Point';
import Vec3 from '../library/math/Vec3';

const RunScript = () => {
    createPointsFromData();
    Point(new Vec3(10, 0, 0));
};

export default RunScript;
