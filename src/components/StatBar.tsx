type StatBarProps = {
  value: number;
  color: string;
};

export function StatBar({ value, color }: StatBarProps) {
  const isCritical = value <= 0;
  return (
    <div className={`progress-bar ${isCritical ? "critical" : ""}`}>
      <div className="fill" style={{ width: `${value}%` , background: color }}/>
    </div>
  );
}