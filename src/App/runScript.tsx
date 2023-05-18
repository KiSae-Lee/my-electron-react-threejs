import { createPointsFromData } from '../library/example/pointFromCsv';
import { Point } from '../library/geometry/Point';

const RunScript = () => {
    createPointsFromData();
    Point({ x: 5, y: 0, z: 0 });
};

export default RunScript;
