import { Container } from "@/components/Container/Container";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { selectedMatters } from "@/content/firm";
import styles from "./SelectedMatters.module.css";

export function SelectedMatters() {
  return (
    <section className={styles.section} id="matters" data-reveal>
      <Container width="wide">
        <SectionHeader
          eyebrow="Seçkin Davalar & İşlemler"
          title="Gizlilik ilkelerine bağlı kalınarak temsil edilen örnek çalışmalar."
          copy="İşlem notları müvekkil isimleriyle değil, üstlenilen rol ve karar bağlamıyla çerçevelenmiştir."
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
