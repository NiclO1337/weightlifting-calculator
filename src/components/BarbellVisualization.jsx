const PLATE_MAP = {
  25: ['#ff0000', 20, 50],
  20: ['#0c00b4', 20, 50],
  15: ['#ffee00', 18, 50],
  10: ['#00db12', 12, 50],
  // 5: ['#ffffff', 7, 32],    // color and size of real 5 kg metal plate
  5: ['#1b1b1b', 7, 50],    // color of a 5 kg plastic plate
  2.5: ['#8d0202', 7, 30],
  2: ['#0c00b4', 7, 28],
  1.5: ['#ffee00', 7, 26],
  1.25: ['#1b1b1b', 7, 24],
  1: ['#06a313', 7, 22],
  0.5: ['#ffffff', 7, 20],
};

export default function BarbellVisualization({
  plates = [],           // array of per-side plate sizes, e.g. [20, 10, 2.5]
  cap = 20,              // px of bar before first plate and after last plate
  spacing = 1,           // px gap between plates
  barColor = '#cccccc',
  defaultPlate = ['#999', 10, 36],
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
  const maxPlateHeight = Math.max(...plateSpecs.map((p) => p.h), defaultPlate[2] || 0);
  const paddingY = 12;
  const svgHeight = maxPlateHeight + paddingY * 2;
  const barY = svgHeight / 2;
  const barHeight = Math.max(6, Math.round(maxPlateHeight * 0.12));

  // place plates from left cap outward (only right side)
  const positions = [];
  let offset = cap;
  for (let i = 0; i < plateSpecs.length; i++) {
    const p = plateSpecs[i];
    positions.push({ ...p, x: offset });
    offset += p.w + spacing;
  }

  return (
    <svg width={svgWidth} height={svgHeight} role="img" aria-label="Barbell with plates">
      {/* full bar across entire width */}
      <rect x={0} y={barY - barHeight / 2} width={svgWidth} height={barHeight} rx={4} fill={barColor} />
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
            />
          </g>
        ))}
      </g>
    </svg>
  );
}