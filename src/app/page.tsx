"use client";

import { useState, useEffect } from "react";
import HighlightedText from "./components/highlighted_text";
import Results from "./components/results";
import CongratsPopup from "./components/congrats_popup";

export default function Home() {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [solution, setSolution] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  // fetch the daily puzzle
  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const res = await fetch("/api/daily-puzzle");
        if (!res.ok) {
          throw new Error("Failed to fetch the daily puzzle.");
        }
        const data = await res.json();
        setPuzzle(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    };

    fetchPuzzle();
  }, []);

  function fetchRandomPuzzle() {
    setResponse(null);
    const fetchPuzzle = async () => {
      try {
        const res = await fetch("/api/puzzle/random");
        if (!res.ok) {
          throw new Error("Failed to fetch random puzzle.");
        }
        const data = await res.json();
        setPuzzle(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    };

    fetchPuzzle();
  }

  // handle the solution submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse(null);
    setSolution("");

    if (!puzzle) {
      setError("No puzzle available to submit a solution.");
      return;
    }

    const body = {
      puzzleId: puzzle.id,
      solution,
    };

    try {
      const res = await fetch("/api/puzzle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setResponse(data);
      //  show congratulations message if the user solved the puzzle
      if (data.correct) setPopupVisible(true);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-24">
      {error && <p className="text-red-600 mb-4">{`Error: ${error}`}</p>}
      {/* if puzzle exists */}
      {puzzle ? (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Today's Puzzle
          </h1>
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full transition-all duration-300 ease-in-out"
            style={{ maxHeight: popupVisible || response ? "1000px" : "500px" }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {puzzle.description}
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <HighlightedText text={puzzle.sample} regexString={solution} />
            </pre>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-gray-800 font-semibold mb-2">
                  Your Solution:
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="mt-2 p-2 border-2 border-gray-300 font-mono font-normal rounded-md w-full focus:outline-blue-500"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>

            {response && (
              <div className="mt-6">
                <Results results={response.results} regexString={solution} />
              </div>
            )}
            {popupVisible && (
              <CongratsPopup
                onClose={() => {
                  setPopupVisible(false);
                }}
                onRandom={fetchRandomPuzzle}
              ></CongratsPopup>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-60">Loading puzzle...</p>
      )}
    </div>
  );
}
