import { Octokit } from "@octokit/core";

import { getSemanticReleases } from "../src";

describe("Smoke test", () => {
  it("{ getSemanticReleases } export is a function", () => {
    expect(getSemanticReleases).toBeInstanceOf(Function);
  });

  it("getSemanticReleases.VERSION is set", () => {
    expect(getSemanticReleases.VERSION).toEqual("0.0.0-development");
  });

  it("Loads plugin", () => {
    expect(() => {
      const TestOctokit = Octokit.plugin(getSemanticReleases);
      new TestOctokit();
    }).not.toThrow();
  });
});
