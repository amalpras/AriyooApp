export function scoreMatch(userTags: string[], questionTags: string[]): number {
  const set = new Set(userTags.map(t => t.toLowerCase()));
  let score = 0;
  for (const t of questionTags) if (set.has(t.toLowerCase())) score += 1;
  return score;
}