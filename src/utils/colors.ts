export function getMoodColor(mood: string) {
  switch (mood) {
    case "sad":
      return "#ef4444";
    case "neutral":
      return "#facc15";
    case "happy":
      return "#22c55e";
    default:
      return "#eee";
  }
}

export function getFullnessColor(fullness: number) {
  if (fullness < 30) return "#ef4444";
  if (fullness < 70) return "#facc15";
  return "#22c55e";
}