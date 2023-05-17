import * as THREE from 'three';

export default class CVector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    //#region utility
    public getUnitVector(): CVector3 {
        const temp = 1 / Math.sqrt(this.x * this.x * +this.y * this.y + this.z * this.z);
        return new CVector3(this.x * temp, this.y * temp, this.z * temp);
    }

    public getLength(): number {
        return Math.sqrt(this.x * this.x * +this.y * this.y + this.z * this.z);
    }

    public reverse(): CVector3 {
        return new CVector3(-this.x, -this.y, -this.z);
    }

    public dot(t: CVector3): number {
        return this.x * t.x + this.y * t.y + this.z * t.z;
    }

    public cross(v: CVector3): CVector3 {
        return new CVector3(this.y * v.z - v.y * this.z, this.z * v.x - v.z * this.x, this.x * v.y - v.x * this.y);
    }

    public static rotate(axis: CVector3, target: CVector3, degree: number): CVector3 {
        const r = degree * (Math.PI / 180);
        const v = target;
        const k = axis.getUnitVector();

        const cos_theta = Math.cos(r);
        const sin_theta = Math.sin(r);

        return v
            .multiplyScalar(cos_theta)
            .add(k.cross(v).multiplyScalar(sin_theta))
            .add(k.multiplyScalar(k.dot(v) * (1 - cos_theta)));
    }

    public static getPerpendicularPt(lineStart: CVector3, lineEnd: CVector3, targetPoint: CVector3): CVector3 {
        const dir = lineEnd.subtract(lineStart).getUnitVector();
        const v = targetPoint.subtract(lineStart);
        const t = v.dot(dir);
        const perpendicularPt = lineStart.add(dir.multiplyScalar(t));

        return perpendicularPt;
    }

    public add(v: CVector3): CVector3 {
        return new CVector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public subtract(v: CVector3): CVector3 {
        return new CVector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public multiplyScalar(scalar: number): CVector3 {
        return new CVector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    public divideScalar(scalar: number): CVector3 {
        return new CVector3(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    public static add(a: CVector3, b: CVector3): CVector3 {
        return new CVector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static subtract(a: CVector3, b: CVector3): CVector3 {
        return new CVector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public static multiply(a: CVector3, scalar: number): CVector3 {
        return new CVector3(a.x * scalar, a.y * scalar, a.z * scalar);
    }

    public static divide(a: CVector3, scalar: number): CVector3 {
        return new CVector3(a.x / scalar, a.y / scalar, a.z / scalar);
    }

    public toVector3(): THREE.Vector3 {
        return new THREE.Vector3(this.x, this.y, this.z);
    }

    public static ToFVec3(p: THREE.Vector3): CVector3 {
        const result = new CVector3(p.x, p.y, p.z);
        return result;
    }

    public static ToThreeVector3(v: CVector3): THREE.Vector3 {
        return new THREE.Vector3(v.x, v.y, v.z);
    }

    public static ToCVector3List(points: THREE.Vector3[]): CVector3[] {
        const result: CVector3[] = [];
        for (const p of points) {
            result.push(CVector3.ToFVec3(p));
        }
        return result;
    }

    public static ToThreeVector3List(vectors: CVector3[]): THREE.Vector3[] {
        const result: THREE.Vector3[] = [];
        for (const v of vectors) {
            result.push(CVector3.ToThreeVector3(v));
        }
        return result;
    }
}
