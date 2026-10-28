/** Wordmark provisório em SVG (losango + DAMADI + junior). Pedir logo vetorial ao cliente (ver content/PENDENCIAS.md). */
export function Logo({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'cream';
}) {
  const text = tone === 'ink' ? 'var(--color-ink-900)' : 'var(--color-cream-500)';
  return (
    <svg
      className={className}
      viewBox="0 0 176 44"
      role="img"
      aria-label="Damadi Junior Marcenaria"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="21,2 40,21 21,40 2,21" fill="var(--color-copper-500)" />
      <polygon
        points="21,11 31,21 21,31 11,21"
        fill="none"
        stroke={text}
        strokeWidth="2"
        opacity="0.9"
      />
      <text
        x="50"
        y="22"
        fill={text}
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="20"
        letterSpacing="1.5"
      >
        DAMADI
      </text>
      <text
        x="51"
        y="38"
        fill="var(--color-copper-400)"
        fontFamily="var(--font-sans)"
        fontStyle="italic"
        fontWeight="300"
        fontSize="12"
      >
        junior
      </text>
      <text
        x="92"
        y="37"
        fill={text}
        fontFamily="var(--font-display)"
        fontWeight="500"
        fontSize="6.5"
        letterSpacing="2.6"
        opacity="0.8"
      >
        MARCENARIA
      </text>
    </svg>
  );
}
