import React from "react";

import SidebarButton from "./Components/Element/SidebarButton";

import styles from "./App..module.css";

export default function App() {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(268);

  const startResizing = React.useCallback((event: React.MouseEvent) => {
    console.log(event.type);
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resizing = React.useCallback(
    (event: MouseEvent) => {
      console.log("Resizing!");
      if (isResizing && sidebarRef.current !== null) {
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
    if (isShowing === "none") setIsShowing("flex");
    else setIsShowing("none");
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.iconSidebar}>
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
        <div className={styles.appSidebarContent}><h3>Menu Here</h3></div>
        <div
          className={styles.appSidebarResizer}
          onMouseDown={startResizing}
        ></div>
      </div>

      <div className={styles.appFrame}><h1>3D Viewport Here</h1></div>
    </div>
  );
}
