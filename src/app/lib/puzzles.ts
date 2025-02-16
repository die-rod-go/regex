export async function getTodaysPuzzle() {
  const res = await fetch("/api/puzzle/daily");
  if (!res.ok) {
    throw new Error("Failed to fetch the daily puzzle.");
  }
  return res.json();
}

export async function getRandomPuzzle() {
  const res = await fetch("/api/puzzle/random");
  if (!res.ok) {
    throw new Error("Failed to fetch the random puzzle.");
  }
  return res.json();
}

export async function getPuzzleById(id: string) {
  const res = await fetch(`/api/puzzle/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch the puzzle.");
  }
  return res.json();
}
