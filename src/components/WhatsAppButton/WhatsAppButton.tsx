import { useSiteContent } from "@/context/ContentContext";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppButton() {
  const { content } = useSiteContent();
  const { phoneNumber, defaultMessage, tooltipText } = content.whatsapp;

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <aside className={styles.wrapper} aria-label="WhatsApp İletişim Hattı">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label={`WhatsApp ile mesaj gönderin (${phoneNumber})`}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.66 20.15 9.3 19.78 8.12 19.08L7.84 18.91L4.72 19.73L5.55 16.69L5.36 16.39C4.6 15.18 4.19 13.56 4.19 11.91C4.19 7.37 7.89 3.67 12.05 3.67M9.07 7.74C8.91 7.74 8.65 7.8 8.44 8.03C8.22 8.26 7.6 8.84 7.6 10.02C7.6 11.2 8.46 12.34 8.58 12.5C8.7 12.66 10.27 15.08 12.68 16.12C13.25 16.37 13.7 16.52 14.05 16.63C14.62 16.81 15.14 16.78 15.55 16.72C16.01 16.65 16.96 16.14 17.16 15.58C17.36 15.02 17.36 14.54 17.3 14.44C17.24 14.34 17.08 14.28 16.84 14.16C16.6 14.04 15.42 13.46 15.2 13.38C14.98 13.3 14.82 13.26 14.66 13.5C14.5 13.74 14.04 14.28 13.9 14.44C13.76 14.6 13.62 14.62 13.38 14.5C13.14 14.38 12.37 14.13 11.45 13.31C10.74 12.67 10.25 11.88 10.11 11.64C9.97 11.4 10.1 11.27 10.22 11.15C10.33 11.04 10.46 10.86 10.58 10.72C10.7 10.58 10.74 10.48 10.82 10.32C10.9 10.16 10.86 10.02 10.8 9.9C10.74 9.78 10.28 8.64 10.08 8.18C9.89 7.72 9.69 7.78 9.54 7.77C9.4 7.76 9.24 7.74 9.07 7.74Z" />
        </svg>
        <span className={styles.tooltip} role="tooltip">
          {tooltipText}
        </span>
      </a>
    </aside>
  );
}
