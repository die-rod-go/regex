"use client";

import React, { useState, useEffect } from "react";
import HighlightedText from "../../components/highlighted_text";
import Results from "../../components/results";
import CongratsPopup from "../../components/congrats_popup";
import ErrorPopup from "../../components/error_popup";
import { getPuzzleById, getRandomPuzzle } from "@/app/lib/puzzles";
import { useRouter } from "next/navigation";
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export default function PuzzlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [puzzle, setPuzzle] = useState<any>(null);
  const [solution, setSolution] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isCongratsPopupVisible, setIsCongratsPopupVisible] =
    useState<boolean>(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] =
    useState<boolean>(false);
  const router = useRouter();

  // fetch the puzzle
  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const puzzle = await getPuzzleById(id);
        setPuzzle(puzzle);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    };

    fetchPuzzle();
  }, [id]);

  function fetchRandomPuzzle() {
    const loadPuzzle = async () => {
      const puzzle = await getRandomPuzzle();
      router.push(`/puzzle/${puzzle.id}`);
    };
    loadPuzzle();
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
    <div className="min-h-screen flex flex-col items-center bg-bg-primary pt-20 pb-20">
      {/* if puzzle exists */}
      {puzzle ? (
        <>
          <h1 className="text-3xl font-bold text-accent mb-6">Regexpert</h1>
          <div
            className="bg-bg-card p-6 rounded-lg shadow-lg max-w-3xl w-full transition-all duration-300 ease-in-out"
            style={{
              maxHeight:
                isCongratsPopupVisible || isErrorPopupVisible || response
                  ? "1000px"
                  : "500px",
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
                    className="mt-2 p-2 bg-bg-input font-mono font-normal rounded-md w-full border-2 border-bg-input outline-none focus:outline-accent"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-text-primary p-2 rounded-md hover:bg-hover-accent transition duration-200 outline-none focus:outline-accent"
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
        <div className="flex flex-col items-center bg-bg-primary pt-36">
          <p className="text-text-muted  text-xl animate-pulse">
            Loading puzzle...
          </p>
        </div>
      )}
    </div>
  );
}
