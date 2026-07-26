import type { PropsWithChildren } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = PropsWithChildren<{
  tone?: "dark" | "light";
}>;

export function Eyebrow({ children, tone = "dark" }: EyebrowProps) {
  return <p className={[styles.eyebrow, styles[tone]].join(" ")}>{children}</p>;
}
