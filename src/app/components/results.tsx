import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HighlightedText from "./highlighted_text";

type Result = {
  targetString: string;
  expectedMatches: string[];
  actualMatches: string[];
  correct: boolean;
};

type ResultsProps = {
  results: Result[];
  regexString: string;
};

export default function Results({ results, regexString }: ResultsProps) {
  const [page, setPage] = useState<number>(0);
  const numCorrect = results.filter((result) => result.correct).length;

  const goToPreviousPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : results.length - 1));
  };

  const goToNextPage = () => {
    setPage((prev) => (prev < results.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="h-56 flex flex-col">
      {/* header */}
      <h2 className="text-lg font-semibold text-text-secondary mb-2">
        Passed {numCorrect}/{results.length}
      </h2>
      {/* navigation Controls */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={goToPreviousPage}
          className="p-1 rounded-full hover:bg-bg-sample transition-all duration-300 ease-in-out "
        >
          <ChevronLeftIcon className="w-6 h-6 text-text-secondary" />
        </button>
        {results.map((result, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className="relative w-4 h-4 rounded-full flex items-center justify-center focus:outline-none transition"
          >
            <span
              className={`absolute w-6 h-6 rounded-full border-2 transition ${
                page === index
                  ? result.correct
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-transparent"
              }`}
            />
            <span
              className={`w-4 h-4 rounded-full ${
                result.correct ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="p-1 rounded-full hover:bg-bg-sample transition-all duration-300 ease-in-out "
        >
          <ChevronRightIcon className="w-6 h-6 text-text-secondary" />
        </button>
      </div>
      {/* result Display Section */}
      <div className="flex space-x-4 h-64 overflow-hidden text-text-secondary">
        {/* test Case Section */}
        <div className="p-4 rounded-lg bg-bg-sample w-1/2 overflow-y-auto">
          <h3 className="font-semibold text-sm">Test Case</h3>
          <HighlightedText
            className="font-mono"
            text={results[page].targetString}
            regexString={regexString}
          />
        </div>
        {/* expected Matches Section */}
        <div className="p-4 rounded-lg bg-bg-sample w-1/4 overflow-y-auto">
          <h3 className="font-semibold text-sm">Expected Matches</h3>
          {results[page].expectedMatches.map((match, index) => (
            <div className="font-mono" key={index}>
              {match}
            </div>
          ))}
        </div>
        {/* Actual Matches Section */}
        <div className="p-4 rounded-lg bg-bg-sample w-1/4 overflow-y-auto">
          <h3 className="font-semibold text-sm">Actual Matches</h3>
          {results[page].actualMatches.map((match, index) => (
            <div className="font-mono" key={index}>
              {match}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
