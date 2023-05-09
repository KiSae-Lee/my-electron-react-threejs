import React from 'react';
import * as THREE from 'three';
import { Vec3 } from './Vector';

const lines: LineProps[] = [];

interface LineProps {
    sPt: Vec3;
    ePt: Vec3;
}

export function Line(startPoint: Vec3, endPoint: Vec3) {
    lines.push({ sPt: startPoint, ePt: endPoint });
}

function LineRenderer() {
    const ls = [];

    for (let i = 0; i < lines.length; i++) {
        const pts = [];
        pts.push(new THREE.Vector3(lines[i].sPt.x, lines[i].sPt.y, lines[i].sPt.z));
        pts.push(new THREE.Vector3(lines[i].ePt.x, lines[i].ePt.y, lines[i].ePt.z));

        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        const material = new THREE.LineBasicMaterial({ color: 'red', linewidth: 1 });
        const l = new THREE.Line(geometry, material);
        ls.push(l);
    }
    return (
        <group>
            {ls.map((line, i) => (
                <primitive key={i} object={line} />
            ))}
        </group>
    );
}

export default LineRenderer;
