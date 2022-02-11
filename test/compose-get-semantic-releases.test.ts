import fetchMock from "fetch-mock";
import { Octokit } from "@octokit/core";

import { composeGetSemanticReleases } from "../src";

describe("composeGetSemanticReleases()", () => {
  it("returns an empty array if there are no releases", async () => {
    const mock = fetchMock
      .sandbox()
      .get("https://api.github.com/repos/octokit/core.js/releases", []);

    const octokit = new Octokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await composeGetSemanticReleases(octokit, {
      owner: "octokit",
      repo: "core.js",
    });

    expect(releases).toStrictEqual([]);
  });

  it("ignores releases without semantic tag names", async () => {
    const mock = fetchMock
      .sandbox()
      .get("https://api.github.com/repos/octokit/core.js/releases", [
        {
          tag_name: "v1.0.0",
        },
        {
          tag_name: "not-semantic",
        },
      ]);

    const octokit = new Octokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await composeGetSemanticReleases(octokit, {
      owner: "octokit",
      repo: "core.js",
    });

    expect(releases).toStrictEqual([
      {
        version: "1.0.0",
        tag_name: "v1.0.0",
      },
    ]);
  });
});
