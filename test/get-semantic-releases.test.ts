import fetchMock from "fetch-mock";
import { Octokit } from "@octokit/core";

import { getSemanticReleases } from "../src";

const TestOctokit = Octokit.plugin(getSemanticReleases);

describe("octokit.getSemanticReleases()", () => {
  it("returns an empty array if there are no releases", async () => {
    const mock = fetchMock
      .sandbox()
      .get("https://api.github.com/repos/octokit/core.js/releases", []);

    const octokit = new TestOctokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await octokit.getSemanticReleases({
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

    const octokit = new TestOctokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await octokit.getSemanticReleases({
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

  it("since", async () => {
    const mock = fetchMock
      .sandbox()
      .get("https://api.github.com/repos/octokit/core.js/releases", [
        {
          tag_name: "v1.0.0",
        },
        {
          tag_name: "v1.0.1",
        },
        {
          tag_name: "v1.1.0",
        },
        {
          tag_name: "v1.1.1",
        },
      ]);

    const octokit = new TestOctokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await octokit.getSemanticReleases({
      owner: "octokit",
      repo: "core.js",
      since: "1.0.1",
    });

    expect(releases).toStrictEqual([
      {
        version: "1.1.0",
        tag_name: "v1.1.0",
      },
      {
        version: "1.1.1",
        tag_name: "v1.1.1",
      },
    ]);
  });

  it("sort by version number", async () => {
    const mock = fetchMock
      .sandbox()
      .get("https://api.github.com/repos/octokit/core.js/releases", [
        {
          tag_name: "v2.0.0",
        },
        {
          tag_name: "v1.1.0",
        },
        {
          tag_name: "v1.1.1",
        },
        {
          tag_name: "v1.0.0",
        },
      ]);

    const octokit = new TestOctokit({
      request: {
        fetch: mock,
      },
    });

    const releases = await octokit.getSemanticReleases({
      owner: "octokit",
      repo: "core.js",
    });

    expect(releases).toStrictEqual([
      {
        tag_name: "v1.0.0",
        version: "1.0.0",
      },
      {
        tag_name: "v1.1.0",
        version: "1.1.0",
      },
      {
        tag_name: "v1.1.1",
        version: "1.1.1",
      },
      {
        tag_name: "v2.0.0",
        version: "2.0.0",
      },
    ]);
  });
});
