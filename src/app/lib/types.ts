/*
[
  {
    "targetString": "apple banana apricot orange avocado",
    "expectedMatches": [
      "apple",
      "apricot",
      "avocado"
    ],
    "actualMatches": [],
    "correct": false
  },
  {
    "targetString": "antelope zebra aardvark",
    "expectedMatches": [
      "aardvark",
      "antelope"
    ],
    "actualMatches": [],
    "correct": false
  },
  {
    "targetString": "hello world",
    "expectedMatches": [],
    "actualMatches": [],
    "correct": true
  }
]
*/
type result = {
  targetString: string;
  expectedMatches: string[];
  actualMatches: string[];
  correct: boolean;
};
