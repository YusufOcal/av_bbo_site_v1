import type { PropsWithChildren } from "react";
import styles from "./Container.module.css";

type ContainerWidth = "default" | "wide" | "narrow";

type ContainerProps = PropsWithChildren<{
  as?: "div" | "section" | "header" | "footer";
  className?: string;
  width?: ContainerWidth;
}>;

export function Container({
  as: Element = "div",
  children,
  className,
  width = "default"
}: ContainerProps) {
  const classNames = [styles.container, styles[width], className].filter(Boolean).join(" ");

  return <Element className={classNames}>{children}</Element>;
}
