"use client";

import { useState, useEffect } from "react";
import HighlightedText from "./components/highlighted_text";
import Results from "./components/results";
import CongratsPopup from "./components/congrats_popup";
import ErrorPopup from "./components/error_popup";
import CheatSheet from "./components/cheat_sheet";
import Spinner from "./components/spinner";

export default function Home() {
  const [puzzle, setPuzzle] = useState<any>(null);
  const [solution, setSolution] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isCongratsPopupVisible, setIsCongratsPopupVisible] =
    useState<boolean>(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] =
    useState<boolean>(false);

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
    setSolution("");
    setPuzzle(null);
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
      //  show corresponding popup depending on whether the user solved the puzzle
      if (data.correct) setIsCongratsPopupVisible(true);
      else setIsErrorPopupVisible(true);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      setIsErrorPopupVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg-primary p-24">
      {/* if puzzle exists */}
      {puzzle ? (
        <>
          <h1 className="text-3xl font-bold text-accent mb-6">
            {puzzle.browseType === "daily"
              ? `Today's Puzzle`
              : puzzle.browseType === "random"
              ? "Random Puzzle"
              : "Regexpert"}
          </h1>
          <div
            className="bg-bg-card p-6 rounded-lg shadow-lg max-w-3xl w-full transition-all duration-300 ease-in-out"
            style={{
              maxHeight:
                isCongratsPopupVisible || response ? "1000px" : "500px",
            }}
          >
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {puzzle.description}
            </h2>
            <pre className="bg-bg-sample p-4 rounded-md mb-4 overflow-x-auto text-text-secondary">
              <HighlightedText text={puzzle.sample} regexString={solution} />
            </pre>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-text-secondary font-semibold mb-2 text-lg">
                  Your Solution:
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="mt-2 p-2 border-2 bg-bg-input border-bg-card font-mono font-normal rounded-md w-full"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white p-2 rounded-md hover:bg-hover-accent transition duration-200"
              >
                Submit
              </button>
            </form>

            {puzzle && puzzle.type === "match" && response && (
              <div className="mt-6">
                <Results results={response.results} regexString={solution} />
              </div>
            )}
            {isCongratsPopupVisible && (
              <CongratsPopup
                onClose={() => {
                  setIsCongratsPopupVisible(false);
                }}
                onRandom={fetchRandomPuzzle}
              ></CongratsPopup>
            )}
            {isErrorPopupVisible && (
              <ErrorPopup
                onClose={() => {
                  setIsErrorPopupVisible(false);
                }}
                error={error}
              ></ErrorPopup>
            )}
          </div>
        </>
      ) : (
        <div>
          <p className="text-text-muted mt-60 text-xl animate-pulse">
            Loading puzzle...
          </p>
          {/* <Spinner /> */}
        </div>
      )}
    </div>
  );
}
