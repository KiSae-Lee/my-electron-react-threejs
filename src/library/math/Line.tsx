import Vec3 from './Vec3';

export default class Line {
    startPoint: Vec3;
    endPoint: Vec3;

    constructor(sPt: Vec3, ePt: Vec3) {
        this.startPoint = sPt;
        this.endPoint = ePt;
    }

    direction(): Vec3 {
        return this.endPoint.subtract(this.endPoint);
    }

    length(): number {
        return this.direction().length();
    }

    lengthSquare(): number {
        return this.direction().length() * this.direction().length();
    }
}
