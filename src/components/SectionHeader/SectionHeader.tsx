import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeader({ copy, eyebrow, title }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className={styles.body}>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}
