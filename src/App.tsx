import React from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SidebarButton from "./Components/Element/SidebarButton";

import styles from "./App..module.css";

function Box(props: JSX.IntrinsicElements["mesh"]) {

  const ref = React.useRef<THREE.Mesh>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  useFrame((state, delta) =>
    ref.current !== null ? (ref.current.rotation.x += 0.01) : null
  );

  return (
    <mesh
      {...props}
      ref={ref}
      scale={isClicked ? 1.5 : 1}
      onClick={(event) => setIsClicked(!isClicked)}
      onPointerOver={(event) => setIsHovering(true)}
      onPointerOut={(event) => setIsHovering(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovering ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function App() {
  let iconSidebarWidth = 56;

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(0);
  const [appFrameWidth, setAppFrameWidth] = React.useState(
    window.innerWidth - sidebarWidth - iconSidebarWidth - 3
  );

  const startResizing = React.useCallback((event: React.MouseEvent) => {
    console.log(event.type);
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resizing = React.useCallback(
    (event: MouseEvent) => {
      if (isResizing && sidebarRef.current !== null) {
        console.log("Resizing Sidebar!");
        setSidebarWidth(
          event.clientX - sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resizing);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resizing);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resizing, stopResizing]);

  const [isShowing, setIsShowing] = React.useState<string>("none");
  const SidebarButtonClicked = () => {
    if (isShowing === "none") {
      setIsShowing("flex");
    } else {
      setIsShowing("none");
    }
  };

  React.useEffect(() => {
    if (isShowing === "flex") setSidebarWidth(150);
    else setSidebarWidth(0);
  }, [isShowing]);

  React.useEffect(() => {
    setAppFrameWidth(window.innerWidth - sidebarWidth - iconSidebarWidth - 3);
  }, [sidebarWidth, iconSidebarWidth]);

  return (
    <div className={styles.appContainer}>
      <div
        className={styles.iconSidebar}
        style={{ minWidth: iconSidebarWidth }}
      >
        <SidebarButton onClick={SidebarButtonClicked}></SidebarButton>
        <SidebarButton></SidebarButton>
        <SidebarButton></SidebarButton>
        <SidebarButton></SidebarButton>
        <SidebarButton></SidebarButton>
      </div>
      <div
        ref={sidebarRef}
        className={styles.appSidebar}
        style={{
          width: sidebarWidth,
          display: isShowing,
        }}
        onMouseDown={(event) => event.preventDefault()}
      >
        <div className={styles.appSidebarContent}>
          <h3>Menu Here</h3>
        </div>
        <div
          className={styles.appSidebarResizer}
          onMouseDown={startResizing}
        ></div>
      </div>

      <div className={styles.appFrame} style={{ width: appFrameWidth }}>
        <Canvas camera={{ position: [1, 2, 3] }}>
          <OrbitControls />
          <gridHelper args={[10, 20]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <axesHelper args={[5]} />

          <Box position={[0, 0, 0]} />
        </Canvas>
      </div>
    </div>
  );
}
