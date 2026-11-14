// Layered "paper-cut" wave inspired by the reference image, re-coloured in the
// logo's orange. Pure SVG = no image download, loads instantly.
//
// Performance notes (this used to lag):
// - NO SVG filters. A blurred drop-shadow on animated shapes forces the browser to
//   re-render the blur every frame. The shadow is now a few static, offset,
//   semi-transparent copies of each layer (looks soft, costs almost nothing).
// - Each layer is its own <svg>, so the browser can slide it on the GPU
//   (transform only) without repainting. See .pw-layer in global.css.

const LAYERS = [
  {
    n: 1,
    from: "#ff8a2a",
    to: "#c43e00",
    d: "M600 0 L250 0 C330 90 270 160 330 250 C390 340 300 380 340 470 C380 560 300 620 360 720 C390 770 450 790 600 800 Z",
  },
  {
    n: 2,
    from: "#ff7a14",
    to: "#e24d00",
    d: "M600 0 L320 0 C390 80 340 150 395 235 C450 320 375 370 410 450 C445 530 380 590 430 680 C455 725 500 765 600 780 Z",
  },
  {
    n: 3,
    from: "#ff9a45",
    to: "#ff6a00",
    d: "M600 0 L390 0 C445 70 410 135 455 210 C500 285 440 335 468 410 C496 485 450 540 490 620 C510 660 545 700 600 715 Z",
    edge: "M390 0 C445 70 410 135 455 210 C500 285 440 335 468 410 C496 485 450 540 490 620 C510 660 545 700 600 715",
  },
];

// soft fake shadow: three offset copies, increasingly close and darker
const SHADOWS = [
  { dx: -11, dy: 14, o: 0.07 },
  { dx: -7, dy: 9, o: 0.1 },
  { dx: -3, dy: 4, o: 0.14 },
];

export default function PaperWave({ className = "" }) {
  return (
    <div className={`paperwave ${className}`} aria-hidden="true" data-depth="6,0,6,0">
      {LAYERS.map((l) => (
        <svg
          key={l.n}
          className={`pw-layer pw-layer--${l.n}`}
          viewBox="0 0 600 800"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <linearGradient id={`pw-g${l.n}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={l.from} />
              <stop offset="1" stopColor={l.to} />
            </linearGradient>
          </defs>
          {SHADOWS.map((s) => (
            <path key={s.dx} d={l.d} fill="#7a2e00" fillOpacity={s.o} transform={`translate(${s.dx} ${s.dy})`} />
          ))}
          <path d={l.d} fill={`url(#pw-g${l.n})`} />
          {l.edge && <path d={l.edge} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />}
        </svg>
      ))}
    </div>
  );
}
