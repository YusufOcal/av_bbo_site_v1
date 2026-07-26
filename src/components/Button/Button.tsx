import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ButtonVariant;
  }
>;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  return (
    <a className={classNames} {...props}>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}
