import { useEffect, useRef } from 'react';
import styles from './ServicesIntro.module.css';
import serviceVideoSrc from '../../Service_video.mp4';

export default function ServicesIntro() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Video starts immediately
        videoRef.current?.play().catch(() => {});

        // Text reveals after 1 second — car has exited frame by then
        setTimeout(() => {
          line1Ref.current?.classList.add(styles.visible);
        }, 1000);
        setTimeout(() => {
          line2Ref.current?.classList.add(styles.visible);
        }, 1180);

        io.disconnect();
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Top fade from previous section */}
      <div className={styles.fadeTop} aria-hidden="true" />

      {/* Left — text */}
      <div className={styles.left}>
        <h2 className={styles.heading}>
          <span ref={line1Ref} className={styles.line}>OUR</span>
          <span ref={line2Ref} className={styles.line}>SERVICES</span>
        </h2>
      </div>

      {/* Right — vertical video */}
      <div className={styles.right}>
        <video
          ref={videoRef}
          className={styles.video}
          src={serviceVideoSrc}
          muted
          playsInline
          loop
          preload="metadata"
        />
        {/* Soft left-edge blend so video doesn't hard-cut into the text */}
        <div className={styles.videoBlend} aria-hidden="true" />
      </div>

      {/* Bottom fade into Services section */}
      <div className={styles.fadeBottom} aria-hidden="true" />

    </section>
  );
}
