import { matchResults } from "../__helpers__/utils";
import { problemMatcher as problemMatcherJson } from "../.github/problem-matcher.json";
import { ProblemMatcher, ProblemPattern } from "github-actions-problem-matcher-typings";

const problemMatcher: ProblemMatcher = problemMatcherJson[0];

describe("problemMatcher", () => {
  it("has the correct owner", () => {
    expect(problemMatcher.owner).toEqual("somelinter");
  });

  it("has one pattern", () => {
    expect(problemMatcher.pattern.length).toEqual(1);
  });

  describe("pattern", () => {
    const reportOutput = [
      "ERROR:no viable alternative (file:/C:/actions-runners/blah.xtext line : 5 column : 12)",
    ];

    let pattern: ProblemPattern;
    let results: RegExpExecArray[];

    beforeEach(() => {
      pattern = problemMatcher.pattern[0];

      const regexp = new RegExp(pattern.regexp);

      results = matchResults(reportOutput, regexp);
    });

    it("matches violations", () => {
      expect(results.length).toEqual(3);
    });

    it("matches violation details", () => {
      expect(results[0][pattern.file]).toEqual("file:/C:/actions-runners/blah.xtext");
      expect(results[0][pattern.line]).toEqual("5");
      expect(results[0][pattern.column]).toEqual("12");
      expect(results[0][pattern.severity]).toEqual("ERROR");
      expect(results[0][pattern.message]).toEqual("no viable alternative");
    });
  });
});
