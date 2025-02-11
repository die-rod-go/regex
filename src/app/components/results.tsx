import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HighlightedText from "./highlighted_text";

//  define the structure of a result object
type Result = {
  targetString: string;
  expectedMatches: string;
  actualMatches: string;
  correct: boolean;
};

type ResultsProps = {
  results: Result[];
  regexString: string;
};

export default function Results({ results, regexString }: ResultsProps) {
  //    state to track the current selected result page
  const [page, setPage] = useState<number>(0);

  //    count the number of correct results
  let numCorrect = results.filter((result) => result.correct).length;

  // function to handle page navigation
  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
    else setPage(results.length - 1);
  };

  const goToNextPage = () => {
    if (page < results.length - 1) setPage(page + 1);
    else setPage(0);
  };

  return (
    <div>
      {/* display the number of passed tests */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Results - Passed {numCorrect}/{results.length}
      </h2>

      {/* navigation controls */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={goToPreviousPage}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        {/* colored page circles with slight space between the border */}
        {results.map((result, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`relative w-4 h-4 rounded-full flex items-center justify-center focus:outline-none transition`}
          >
            <span
              className={`absolute w-6 h-6 rounded-full border-2 transition ${
                page === index ? "border-blue-500" : "border-transparent"
              }`}
            ></span>
            <span
              className={`w-4 h-4 rounded-full ${
                result.correct ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* result display section */}
      <div className="flex space-x-4">
        {/* target string section with highlighted text */}
        <div className="p-4 rounded-lg bg-gray-100 w-1/2">
          <h3 className="font-semibold">Target String</h3>
          <HighlightedText
            className="font-mono"
            text={results[page].targetString}
            regexString={regexString}
          />
        </div>

        {/* expected matches section */}
        <div className="p-4 rounded-lg bg-gray-100 w-1/4">
          <h3 className="font-semibold">Expected</h3>
          <p>{results[page].expectedMatches}</p>
        </div>

        {/* actual matches section */}
        <div className="p-4 rounded-lg bg-gray-100 w-1/4">
          <h3 className="font-semibold">Actual</h3>
          <p>{results[page].actualMatches}</p>
        </div>
      </div>
    </div>
  );
}
