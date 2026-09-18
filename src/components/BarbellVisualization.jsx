import { PLATE_MAP } from '../constants/plates';
import './BarbellVisualization.css';

export default function BarbellVisualization({
  plates = [], // array of per-side plate sizes, e.g. [20, 10, 2.5]
  cap = 20, // px of bar before first plate and after last plate
  spacing = 1, // px gap between plates
  barColor = '#cccccc',
  defaultPlate = ['#999', 10, 36],
  onPlateClick, // optional (index) => void — when provided, plates become clickable/removable
}) {
  // build plate specs (color, width, height)
  const plateSpecs = plates.map((size) => {
    const spec = PLATE_MAP[size] ?? defaultPlate;
    return { size, color: spec[0], w: spec[1], h: spec[2] };
  });

  // total width required for all plates + spacing
  const platesTotalWidth =
    plateSpecs.reduce((sum, p) => sum + p.w, 0) +
    Math.max(0, plateSpecs.length - 1) * spacing;

  const svgWidth = cap + platesTotalWidth + cap;
  const maxPlateHeight = Math.max(
    ...plateSpecs.map((p) => p.h),
    defaultPlate[2] || 0,
  );
  const paddingY = 12;
  const svgHeight = maxPlateHeight + paddingY * 2;
  const barY = svgHeight / 2;
  const barHeight = Math.max(6, Math.round(maxPlateHeight * 0.12));

  const stopperWidth = 5;
  const stopperHeight = barHeight * 2.5;
  const stopperX = Math.max(0, cap - stopperWidth);
  const stopperY = barY - stopperHeight / 2;

  // place plates from left cap outward (only right side)
  const positions = [];
  let offset = cap;
  for (let i = 0; i < plateSpecs.length; i++) {
    const p = plateSpecs[i];
    positions.push({ ...p, x: offset });
    offset += p.w + spacing;
  }

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      role='img'
      aria-label='Barbell with plates'>
      {/* full bar across entire width */}
      <rect
        x={0}
        y={barY - barHeight / 2}
        width={svgWidth}
        height={barHeight}
        rx={4}
        fill={barColor}
      />
      <rect
        x={stopperX}
        y={stopperY}
        width={stopperWidth}
        height={stopperHeight}
        rx={2}
        fill={barColor}
      />
      <g>
        {positions.map((p, i) => (
          <g key={`P${i}`}>
            <rect
              x={p.x}
              y={barY - p.h / 2}
              width={p.w}
              height={p.h}
              rx={3}
              fill={p.color}
              stroke='#cccccc'
              strokeWidth={0.5}
              strokeOpacity={0.5}
              {...(onPlateClick && {
                role: 'button',
                tabIndex: 0,
                className: 'bv-plate-interactive',
                'aria-label': `Remove ${p.size} kg plate`,
                onClick: () => onPlateClick(i),
                onKeyDown: (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPlateClick(i);
                  }
                },
              })}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
