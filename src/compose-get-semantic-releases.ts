import { Octokit } from "@octokit/core";
import { composePaginateRest } from "@octokit/plugin-paginate-rest";
import semverValid from "semver/functions/valid";
import semverGt from "semver/functions/gt";
import semverCompare from "semver/functions/compare";

import { GetSemanticReleasesOptions } from "./types";

/**
 * @param octokit Octokit instance
 */
export async function composeGetSemanticReleases(
  octokit: Octokit,
  options: GetSemanticReleasesOptions
) {
  const releases = await composePaginateRest(
    octokit,
    "GET /repos/{owner}/{repo}/releases",
    {
      owner: options.owner,
      repo: options.repo,
    }
  );

  return releases
    .map((release) => {
      const version = tagNameToVersion(release.tag_name);

      // Ignore non-semantic tags
      if (!semverValid(version)) return;

      // If `since` is not specified, return all releases
      if (!options.since) return { version, ...release };

      // If `since` is specified, return only releases newer than `since`
      if (semverGt(version, options.since)) return { version, ...release };
    })
    .filter(Boolean)
    .sort((releaseA, releaseB) =>
      // @ts-expect-error - releases are always defined because of the `.filter(Boolean)` above
      semverCompare(releaseA.version, releaseB.version)
    );
}

function tagNameToVersion(tagName: string) {
  return /^v\d/.test(tagName) ? tagName.slice(1) : tagName;
}
