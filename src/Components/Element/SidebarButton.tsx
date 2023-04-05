import React from "react";
import styles from "./SidebarButton.module.css";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function SidebarButton(props: Props) {
  return <button className={styles.sidebarButton} onClick={props.onClick}></button>;
}
