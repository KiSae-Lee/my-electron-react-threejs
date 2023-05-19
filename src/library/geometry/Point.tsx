import React from 'react';
import { RootState, store } from '../../app/store';
import { addPoint } from '../../app/modules/geometrySlice';
import { useSelector } from 'react-redux';
import Vec3 from '../math/Vec3';
import * as THREE from 'three';

export const Point = ({ x, y, z }: Vec3) => {
    store.dispatch(addPoint([x, y, z]));
};

const PointRenderer = () => {
    const pointData = useSelector((state: RootState) => state.geometrySlice.points);
    const pointObjects = [];

    for (let i = 0; i < pointData.length; i++) {
        const coordinate: number[] = [pointData[i][0], pointData[i][1], pointData[i][2]];

        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(coordinate, 3));

        // const pointMaterial = new THREE.PointsMaterial({ color: 'red', sizeAttenuation: false, size: 10 });

        const material = new THREE.ShaderMaterial({
            vertexShader: `
              uniform float pointSize;
          
              void main() {
                gl_PointSize = pointSize;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
            uniform vec4 color;
          
              void main() {
                gl_FragColor = color; // Red color
              }
            `,
            uniforms: {
                pointSize: { value: 10 },
                color: { value: [1.0, 0.0, 0.0, 1.0] },
            },
            vertexColors: true,
        });

        const pointObject = new THREE.Points(pointGeometry, material);

        pointObjects.push(pointObject);
    }

    return (
        <group>
            {pointObjects.map((point, index) => (
                <primitive key={index} object={point} />
            ))}
        </group>
    );
};

export default PointRenderer;
