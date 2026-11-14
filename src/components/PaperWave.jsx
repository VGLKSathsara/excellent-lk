// Layered "paper-cut" wave inspired by the reference image, re-coloured in the
// logo's orange. Pure SVG = no image download, loads instantly.
// Each layer drifts slowly (see .pw-layer in global.css) for a subtle living feel.
export default function PaperWave({ className = "" }) {
  return (
    <svg className={`paperwave ${className}`} viewBox="0 0 600 800" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <defs>
        <filter id="pw-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-6" dy="8" stdDeviation="9" floodColor="#7a2e00" floodOpacity="0.28" />
        </filter>
        <linearGradient id="pw-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a2a" />
          <stop offset="1" stopColor="#c43e00" />
        </linearGradient>
        <linearGradient id="pw-mid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a14" />
          <stop offset="1" stopColor="#e24d00" />
        </linearGradient>
        <linearGradient id="pw-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9a45" />
          <stop offset="1" stopColor="#ff6a00" />
        </linearGradient>
      </defs>

      <path
        className="pw-layer pw-layer--1"
        filter="url(#pw-shadow)"
        fill="url(#pw-deep)"
        d="M600 0 L250 0 C330 90 270 160 330 250 C390 340 300 380 340 470 C380 560 300 620 360 720 C390 770 450 790 600 800 Z"
      />
      <path
        className="pw-layer pw-layer--2"
        filter="url(#pw-shadow)"
        fill="url(#pw-mid)"
        d="M600 0 L320 0 C390 80 340 150 395 235 C450 320 375 370 410 450 C445 530 380 590 430 680 C455 725 500 765 600 780 Z"
      />
      <path
        className="pw-layer pw-layer--3"
        filter="url(#pw-shadow)"
        fill="url(#pw-top)"
        d="M600 0 L390 0 C445 70 410 135 455 210 C500 285 440 335 468 410 C496 485 450 540 490 620 C510 660 545 700 600 715 Z"
      />
      <path
        className="pw-layer pw-layer--3"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="2"
        d="M390 0 C445 70 410 135 455 210 C500 285 440 335 468 410 C496 485 450 540 490 620 C510 660 545 700 600 715"
      />
    </svg>
  );
}
