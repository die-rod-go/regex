"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SubmissionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    puzzleType: "match",
    description: "",
    sampleText: "",
  });

  const [testCases, setTestCases] = useState([
    { targetString: "", matches: "" },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (
    index: number,
    field: "targetString" | "matches",
    value: string
  ) => {
    setTestCases((prev) =>
      prev.map((testCase, i) =>
        i === index ? { ...testCase, [field]: value } : testCase
      )
    );
  };

  const addTestCase = () => {
    setTestCases((prev) => [...prev, { targetString: "", matches: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTestCases =
      formData.puzzleType === "match"
        ? testCases.map((tc) => ({
            targetString: tc.targetString,
            matches: tc.matches.split(",").map((m) => m.trim()),
          }))
        : [];

    const submitData = {
      ...formData,
      testCases: formattedTestCases,
      sampleText: formData.sampleText,
    };

    try {
      const response = await fetch("/api/puzzle/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit puzzle");
      }

      const result = await response.json();
      console.log("Puzzle created:", result);
      router.push(`/puzzle/${result.id}`);
    } catch (error) {
      console.error("Error submitting puzzle:", error);
      // TODO add error handling
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex flex-col items-center bg-bg-primary p-16"
    >
      <h1 className="text-3xl font-bold text-accent mb-6">
        Submit Your Own Puzzle
      </h1>
      <div className="bg-bg-card p-6 rounded-lg shadow-lg max-w-3xl w-full transition-all duration-300 ease-in-out">
        {/* Puzzle Type */}
        <div className="mb-4">
          <label className="text-text-primary font-semibold mb-2 text-lg block">
            Puzzle Type
          </label>
          {/* Puzzle Type Radio Buttons */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-text-secondary">
              <input
                type="radio"
                name="puzzleType"
                value="match"
                checked={formData.puzzleType === "match"}
                onChange={handleInputChange}
                className="text-accent focus:ring-accent outline-none focus:outline-accent"
              />
              <span>Match Puzzle</span>
            </label>
            <label className="flex items-center space-x-2 text-text-secondary">
              <input
                type="radio"
                name="puzzleType"
                value="password"
                checked={formData.puzzleType === "password"}
                onChange={handleInputChange}
                className="text-accent focus:ring-accent outline-none focus:outline-accent"
              />
              <span>Password Puzzle</span>
            </label>
          </div>
        </div>

        {/* Puzzle Description */}
        <div className="mb-4">
          <label className="text-text-primary font-semibold mb-2 text-lg block">
            Puzzle Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded border-border bg-bg-input text-text-primary outline-none focus:outline-accent"
            rows={4}
            placeholder="Describe your puzzle and its rules..."
          />
        </div>
        {/* Sample Text/Regex */}
        <div className="mb-4">
          <label className="text-text-primary font-semibold mb-2 text-lg block">
            {formData.puzzleType === "match"
              ? "Sample Text"
              : "Regular Expression to Match"}
          </label>
          <textarea
            name="sampleText"
            value={formData.sampleText}
            onChange={handleInputChange}
            className="w-full p-2 rounded focus:ring-accent bg-bg-input text-text-primary outline-none focus:outline-accent"
            rows={2}
            placeholder={
              formData.puzzleType === "match"
                ? "Enter the sample text for your puzzle..."
                : "Enter the regular expression to match..."
            }
          />
        </div>

        {/* Test Cases Section - Only shown for Match puzzles */}
        {formData.puzzleType === "match" && (
          <div className="mb-4">
            {/* Section Header */}
            <label className="text-text-primary font-semibold mb-2 text-lg block ">
              Test Cases
            </label>

            {/* Test Cases Container */}
            <div className="space-y-4">
              {/* Individual Test Case Inputs */}
              {testCases.map((testCase, index) => (
                <div key={index} className="flex gap-4">
                  {/* Target String Input */}
                  <input
                    type="text"
                    value={testCase.targetString}
                    onChange={(e) =>
                      handleTestCaseChange(
                        index,
                        "targetString",
                        e.target.value
                      )
                    }
                    placeholder="Target String"
                    className="flex-1 p-2 rounded border-border focus:ring-accent bg-bg-input text-text-primary outline-none focus:outline-accent"
                  />

                  {/* Expected Matches Input */}
                  <input
                    type="text"
                    value={testCase.matches}
                    onChange={(e) =>
                      handleTestCaseChange(index, "matches", e.target.value)
                    }
                    placeholder="Expected Matches (comma-separated)"
                    className="flex-2 p-2 rounded border-border focus:ring-accent bg-bg-input text-text-primary outline-none focus:outline-accent"
                  />

                  {/* Remove Test Case Button - Only shown if more than one test case exists */}
                  {testCases.length > 1 && (
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeTestCase(index)}
                        className="p-1 w-6 h-6 rounded-full bg-red-500 text-white flex justify-center items-center hover:bg-red-600 transition-colors outline-none focus:outline-accent"
                      >
                        <XMarkIcon className="w-12 h-12" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Test Case Button */}
              <button
                type="button"
                onClick={addTestCase}
                className="bg-accent text-white rounded-md py-2 px-4 hover:bg-hover-accent transition-colors outline-none focus:outline-accent"
              >
                Add Test Case
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-accent text-white rounded-md hover:bg-hover-accent transition-colors outline-none focus:outline-accent"
        >
          Submit Puzzle
        </button>
      </div>
    </form>
  );
}
