import { Container } from "@/components/Container/Container";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { selectedMatters } from "@/content/firm";
import styles from "./SelectedMatters.module.css";

export function SelectedMatters() {
  return (
    <section className={styles.section} id="matters" data-reveal>
      <Container width="wide">
        <SectionHeader
          eyebrow="Selected matters"
          title="Representative work, described with client confidentiality intact."
          copy="Matter notes are framed by role and decision context, not client names."
        />
        <div className={styles.list}>
          {selectedMatters.map((matter) => (
            <article className={styles.item} key={matter.title}>
              <span>{matter.type}</span>
              <h3>{matter.title}</h3>
              <p>{matter.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
