import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css"; // using css style. need global.d.ts file.

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function Button(props: ButtonProps) {
  const { text="Button", ...rest } = props; // default value for the props.
  return <button className={styles.btn} {...rest}>{text}</button>;
}
