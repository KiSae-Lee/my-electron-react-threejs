import Line from './Line';

class Vec3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static unitX(): Vec3 {
        return new Vec3(1, 0, 0);
    }

    add(vector: Vec3): Vec3 {
        return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subtract(vector: Vec3): Vec3 {
        return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    multiply(scalar: number): Vec3 {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    dot(vector: Vec3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector: Vec3): Vec3 {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        return new Vec3(x, y, z);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    lengthSquare(): number {
        return this.length() * this.length();
    }

    normalize(): Vec3 {
        const length = this.length();
        return new Vec3(this.x / length, this.y / length, this.z / length);
    }

    rotate(axis: Vec3, angle: number): Vec3 {
        const radian = angle * (Math.PI / 180);
        const cosTheta = Math.cos(radian);
        const sinTheta = Math.sin(radian);

        const dot = axis.dot(this);

        const xPrime =
            axis.x * dot * (1 - cosTheta) + this.x * cosTheta + (-axis.z * this.y + axis.y * this.z) * sinTheta;
        const yPrime =
            axis.y * dot * (1 - cosTheta) + this.y * cosTheta + (axis.z * this.x - axis.x * this.z) * sinTheta;
        const zPrime =
            axis.z * dot * (1 - cosTheta) + this.z * cosTheta + (-axis.y * this.x + axis.x * this.y) * sinTheta;

        return new Vec3(xPrime, yPrime, zPrime);
    }

    toLine(pt: Vec3, line: Line, threshold = 0.0001): Vec3 | null {
        const lineDir = line.direction();
        const lineNormal = lineDir.cross(Vec3.unitX());
        const lineToPoint = pt.subtract(line.startPoint);
        const dot = this.dot(lineNormal);

        if (Math.abs(dot) < threshold) {
            const dot2 = lineToPoint.dot(lineDir);

            if (dot2 >= 0 && dot2 <= lineDir.lengthSquare()) {
                return line.startPoint.add(lineDir.multiply(dot2 / lineDir.lengthSquare()));
            }
        }

        return null;
    }
}

export default Vec3;
