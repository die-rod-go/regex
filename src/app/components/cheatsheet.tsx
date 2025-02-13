import React from "react";

export default function CheatSheet() {
  return (
    <div>
      {/* character classes */}
      <h1 className="font-semibold">Character classes</h1>
      <div className="font-mono flex space-x-6">
        <div className="flex flex-col">
          <p>.</p>
          <p>\w\d\s</p>
          <p>[abc]</p>
          <p>[^abc]</p>
          <p>[a-g]</p>
        </div>
        <div className="flex flex-col">
          <p>any character except newline</p>
          <p>word, digit, whitespace</p>
          <p>any of a, b, or c</p>
          <p>not a, b, or c</p>
          <p>character between a & g</p>
        </div>
      </div>
      <h1 className="font-semibold">Anchors</h1>
      <div className="font-mono flex space-x-6">
        <div className="flex flex-col">
          <p>^abc$</p>
          <p>\b \B</p>
        </div>
        <div className="flex flex-col">
          <p>start / end of the string</p>
          <p>word, not-word boundary</p>
        </div>
      </div>
      <h1 className="font-semibold">Escaped Characters</h1>
      <div className="font-mono flex space-x-6">
        <div className="flex flex-col">
          <p>\. \* \\</p>
          <p>\t \n \r</p>
        </div>
        <div className="flex flex-col">
          <p>escaped special characters</p>
          <p>tab, linefeed, carriage return</p>
        </div>
      </div>
      <h1 className="font-semibold">Groups and Lookaround</h1>
      <div className="font-mono flex space-x-6">
        <div className="flex flex-col">
          <p>(abc)</p>
          <p>\1</p>
          <p>(?:abc)</p>
          <p>(?=abc)</p>
          <p>(?!abc)</p>
        </div>
        <div className="flex flex-col">
          <p>capture group</p>
          <p>backreference to group #1</p>
          <p>non-capturing group</p>
          <p>positive lookahead</p>
          <p>negative lookahead</p>
        </div>
      </div>
      <h1 className="font-semibold">Quantifiers and Alternation</h1>
      <div className="font-mono flex space-x-6">
        <div className="flex flex-col">
          <p>a*a+a?</p>
          <p>{`a{5}a{2,}`}</p>
          <p>{`a{1,3}`}</p>
          <p>{`a+?a{2,}?`}</p>
          <p>ab|cd</p>
        </div>
        <div className="flex flex-col">
          <p>0 or more, 1 or more, 0 or 1</p>
          <p>exactly five, two or more</p>
          <p>between one & three</p>
          <p>match as few as possible</p>
          <p>match ab or cd</p>
        </div>
      </div>
    </div>
  );
}
