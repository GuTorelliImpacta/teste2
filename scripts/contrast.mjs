// Gera escalas 50-900 a partir das cores-base da marca e confere contraste WCAG AA.
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const lum = (c) => {
  const [r, g, b] = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export function scale(base500, dark900) {
  const c = hex(base500),
    w = [255, 255, 255],
    k = hex(dark900);
  const t = { 50: 0.93, 100: 0.84, 200: 0.68, 300: 0.5, 400: 0.25 };
  const d = { 600: 0.2, 700: 0.42, 800: 0.65, 900: 1 };
  return Object.fromEntries(
    stops.map((s) => [
      s,
      toHex(s === 500 ? c : t[s] !== undefined ? mix(c, w, t[s]) : mix(c, k, d[s])),
    ]),
  );
}
const bases = {
  cream: ['#F4F4EC', '#4a4a3c'],
  olive: ['#8B8B5E', '#1d1d12'],
  copper: ['#B8651B', '#2b1606'],
  khaki: ['#C2B280', '#3b3216'],
  ink: ['#5b4a3e', '#241A14'],
  wa: ['#128C4A', '#042914'],
};
if (process.argv[1].endsWith('contrast.mjs')) {
  for (const [n, [b, d]] of Object.entries(bases)) console.log(n, JSON.stringify(scale(b, d)));
  const s = Object.fromEntries(Object.entries(bases).map(([n, [b, d]]) => [n, scale(b, d)]));
  const pairs = [
    ['ink on cream', '#241A14', '#F4F4EC'],
    ['white on copper-600', '#FFFFFF', s.copper[600]],
    ['white on copper-700', '#FFFFFF', s.copper[700]],
    ['cream on olive-700', '#F4F4EC', s.olive[700]],
    ['cream on olive-800', '#F4F4EC', s.olive[800]],
    ['khaki-300 on olive-800', s.khaki[300], s.olive[800]],
    ['white on wa-600', '#FFFFFF', s.wa[600]],
    ['white on wa-700', '#FFFFFF', s.wa[700]],
    ['copper-700 on cream', s.copper[700], '#F4F4EC'],
    ['olive-700 on cream', s.olive[700], '#F4F4EC'],
    ['ink-600 on cream (texto de apoio)', s.ink[600], '#F4F4EC'],
    ['copper-400 on ink', s.copper[400], '#241A14'],
    ['cream on ink', '#F4F4EC', '#241A14'],
    ['white on copper-600 (botão no ink)', '#FFFFFF', s.copper[600]],
  ];
  for (const [n, f, b] of pairs) console.log(ratio(f, b).toFixed(2).padStart(6), n);
}
