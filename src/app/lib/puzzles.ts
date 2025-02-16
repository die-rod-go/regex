export async function getTodaysPuzzle() {
  const res = await fetch("/api/daily-puzzle");
  if (!res.ok) {
    throw new Error("Failed to fetch the daily puzzle.");
  }
  return res.json();
}

export async function getRandomPuzzle() {
  const res = await fetch("/api/random-puzzle");
  if (!res.ok) {
    throw new Error("Failed to fetch the random puzzle.");
  }
  return res.json();
}
