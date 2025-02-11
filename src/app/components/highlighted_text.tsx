import React, { JSX } from "react";

type HighlightedTextProps = {
  text: string;
  regexString: string;
  highlightClass?: string;
  className?: string;
};

function HighlightedText({
  text,
  regexString,
  highlightClass = "bg-yellow-200",
  className = "",
}: HighlightedTextProps) {
  let regex;
  try {
    regex = new RegExp(regexString, "g");
  } catch (error) {
    return <div className={className}>{text}</div>;
  }

  if (!regexString) return <div className={className}>{text}</div>;

  //  match all occurrences
  const matches = [...text.matchAll(regex)];
  if (matches.length === 0) return <div className={className}>{text}</div>;

  let lastIndex = 0;
  let result: Array<JSX.Element> = [];

  matches.forEach((match, index) => {
    const startIndex = match.index ?? 0;
    const matchText = match[0];

    //  add the text before the match
    if (lastIndex < startIndex) {
      result.push(
        <span key={`text-${index}`}>{text.slice(lastIndex, startIndex)}</span>
      );
    }

    //  add the highlighted match
    result.push(
      <span key={`match-${index}`} className={highlightClass}>
        {matchText}
      </span>
    );

    lastIndex = startIndex + matchText.length;
  });

  //  add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(<span key="last">{text.slice(lastIndex)}</span>);
  }

  return <span className={className}>{result}</span>;
}

export default HighlightedText;
