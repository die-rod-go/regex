import React from "react";

export default function CheatSheet() {
  return (
    <div className="h-4/5 text-[clamp(10px,1vw,3rem)] flex flex-col justify-between">
      <h2 className="font-bold text-lg w-full text-center">Cheat Sheet</h2>
      {/* character classes */}
      <div>
        <h2 className="font-semibold">Character classes</h2>
        <div className="font-mono flex space-x-6 justify-start">
          <div className="w-1/4">
            <p>.</p>
            <p>\w\d\s</p>
            <p>[abc]</p>
            <p>[^abc]</p>
            <p>[a-g]</p>
          </div>
          <div className="text-left">
            <p>any character except newline</p>
            <p>word, digit, whitespace</p>
            <p>any of a, b, or c</p>
            <p>not a, b, or c</p>
            <p>character between a & g</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold">Anchors</h2>
        <div className="font-mono flex space-x-6 justify-start">
          <div className="w-1/4">
            <p>^abc$</p>
            <p>\b \B</p>
          </div>
          <div>
            <p>start / end of the string</p>
            <p>word, not-word boundary</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold">Escaped Characters</h2>
        <div className="font-mono flex space-x-6 justify-start">
          <div className="w-1/4">
            <p>\. \* \\</p>
            <p>\t \n \r</p>
          </div>
          <div className="text-left">
            <p>escaped special characters</p>
            <p>tab, linefeed, carriage return</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold">Groups and Lookaround</h2>
        <div className="font-mono flex space-x-6 justify-start">
          <div className="w-1/4">
            <p>(abc)</p>
            <p>\1</p>
            <p>(?:abc)</p>
            <p>(?=abc)</p>
            <p>(?!abc)</p>
          </div>
          <div className="text-left">
            <p>capture group</p>
            <p>backreference to group #1</p>
            <p>non-capturing group</p>
            <p>positive lookahead</p>
            <p>negative lookahead</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold">Quantifiers and Alternation</h2>
        <div className="font-mono flex space-x-6 justify-start">
          <div className="w-1/4">
            <p>a*a+a?</p>
            <p>{`a{5}a{2,}`}</p>
            <p>{`a{1,3}`}</p>
            <p>{`a+?a{2,}?`}</p>
            <p>ab|cd</p>
          </div>
          <div className="text-left">
            <p>0 or more, 1 or more, 0 or 1</p>
            <p>exactly five, two or more</p>
            <p>between one & three</p>
            <p>match as few as possible</p>
            <p>match ab or cd</p>
          </div>
        </div>
      </div>
    </div>
  );
}
