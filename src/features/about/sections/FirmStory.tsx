import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { aboutContent } from "@/content/about";
import styles from "./FirmStory.module.css";

export function FirmStory() {
  return (
    <section className={styles.section} id="ethos" data-reveal>
      <Container className={styles.inner} width="wide">
        <header className={styles.header}>
          <Eyebrow>{aboutContent.story.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{aboutContent.story.title}</h2>
        </header>

        <div className={styles.body}>
          {aboutContent.story.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
