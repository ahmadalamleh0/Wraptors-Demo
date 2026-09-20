import { useState } from 'react';
import styles from './TintCompareSection.module.css';
// Clear-glass reference — shown by default, before the visitor picks a VLT.
import clearImg from '../../Wraptors Media/tinting/gclass-0-tint.png';
// Real installed tint (35% VLT), used as the base once either side is set —
// darker VLT options are simulated on top of it with the overlay masks below.
import tintedImg from '../../Wraptors Media/tinting/561223191_18371224456146462_1224330614266718605_n.jpg';

const VLT_OPTIONS = [0, 5, 15, 20, 35];

// VLT% (visible light transmission) → dark-overlay opacity, layered on top
// of the tinted reference photo (which is itself the true 35% look, so 35
// gets no added overlay). Lower VLT is darker glass, so it gets a stronger
// overlay; this is a visual approximation tuned by eye against the source
// photo, not a physical light-transmission calculation. 0% has no overlay
// value of its own — picking it on both sides shows the real clear photo
// instead (see `configured` below); on a single side it falls back to the
// tinted photo's own baked-in look, the same honest limit as the unset state.
const OPACITY_BY_VLT = { 0: 0, 5: 0.8, 15: 0.6, 20: 0.42, 35: 0 };

// Natural pixel size of the source photo — the SVG viewBox matches this
// exactly, and both the <img> (object-fit: cover) and the <svg>
// (preserveAspectRatio="xMidYMid slice") crop identically from it, so the
// masks stay pinned to the glass at every container size.
const IMG_W = 1440;
const IMG_H = 1915;

// Polygons traced from the photo via pixel-level brightness scanning
// (sharp raw-buffer edge detection across multiple rows/columns, not
// hand-eyeballed), so they land precisely on the glass. Front is one
// shape; rear is the rear door glass + the small rear quarter glass
// together. 8-point rounded-rectangle approximation follows each
// window's corner radius.
const FRONT_WINDOW = '585,777 699,777 714,791 714,874 699,888 585,888 570,874 570,791';
const REAR_WINDOWS = [
  '776,777 897,777 912,791 912,874 897,888 776,888 761,874 761,791',
  '969,777 1109,777 1124,791 1124,874 1109,888 969,888 954,874 954,791',
];

function TintPill({ value, active, onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.pill} ${active ? styles.pillActive : ''}`}
      aria-pressed={active}
      onClick={() => onSelect(value)}
    >
      {value}%
    </button>
  );
}

export default function TintCompareSection() {
  // null (not chosen yet) and 0 (explicitly chosen "0%") both mean "no
  // tint" and show the real clear-glass photo. The tinted (35% real) photo
  // only becomes the base once a side actually picks a positive VLT value,
  // and any side still at null/0 is then treated as 35% — its true,
  // baked-in look, since that's the only side of it this photo can show.
  const [front, setFront] = useState(null);
  const [rear, setRear] = useState(null);
  const configured = Boolean(front) || Boolean(rear);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Compare Tint Options</span>
        <h2 className={styles.heading}>See The Difference.</h2>
        <p className={styles.sub}>
          Preview how different VLT percentages change the look of the glass — front and rear windows independently.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img
            src={configured ? tintedImg : clearImg}
            alt={configured ? 'Mercedes-Benz G-Class tint preview' : 'Mercedes-Benz G-Class with clear, untinted glass'}
            className={styles.img}
          />
          {configured && (
            <svg
              className={styles.overlaySvg}
              viewBox={`0 0 ${IMG_W} ${IMG_H}`}
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <polygon
                points={FRONT_WINDOW}
                fill="#000"
                className={styles.maskShape}
                style={{ opacity: OPACITY_BY_VLT[front ?? 35] }}
              />
              {REAR_WINDOWS.map((pts) => (
                <polygon
                  key={pts}
                  points={pts}
                  fill="#000"
                  className={styles.maskShape}
                  style={{ opacity: OPACITY_BY_VLT[rear ?? 35] }}
                />
              ))}
            </svg>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Front Side Windows</span>
            <div className={styles.pillRow}>
              {VLT_OPTIONS.map((v) => (
                <TintPill key={v} value={v} active={front === v} onSelect={setFront} />
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Rear Side Windows</span>
            <div className={styles.pillRow}>
              {VLT_OPTIONS.map((v) => (
                <TintPill key={v} value={v} active={rear === v} onSelect={setRear} />
              ))}
            </div>
          </div>

          <p className={styles.note}>Visual preview only. Actual appearance varies.</p>
        </div>
      </div>
    </section>
  );
}
