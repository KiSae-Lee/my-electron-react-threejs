import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Viewport = () => {
    // Three Examples.
    function Box(props: JSX.IntrinsicElements['mesh']) {
        // This reference will give us direct access to the mesh
        const mesh = useRef<THREE.Mesh>(null);
        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false);
        const [active, setActive] = useState(false);
        // Subscribe this component to the render-loop, rotate the mesh every frame
        useFrame((state, delta) => (mesh.current !== null ? (mesh.current.rotation.x += delta) : null));
        // Return view, these are regular three.js elements expressed in JSX
        return (
            <mesh
                {...props}
                ref={mesh}
                scale={active ? 1.5 : 1}
                onClick={() => setActive(!active)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        );
    }

    return (
        <Canvas
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#ebebeb',
            }}
        >
            <Box />
            <ambientLight></ambientLight>
            <spotLight></spotLight>
        </Canvas>
    );
};

export default Viewport;
