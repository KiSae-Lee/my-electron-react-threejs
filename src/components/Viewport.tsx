import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Renderer } from '../library/geometry/Renderer';
// import RunScript from '../app/runScript';
// import { useDispatch } from 'react-redux';
// import { clear } from '../app/modules/geometrySlice';

export interface ViewportProps {
    width: string;
    height: string;
    test: boolean;
}

const Viewport = ({ width, height, test }: ViewportProps) => {
    console.log('Viewport re-rendered!');
    return (
        <Canvas style={{ width: width, height: height }}>
            <PerspectiveCamera makeDefault position={[10, -10, 10]} fov={75} near={0.1} far={999999} up={[0, 0, 1]} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <axesHelper args={[10]} />
            {test && <Renderer />}
        </Canvas>
    );
};

export default Viewport;
