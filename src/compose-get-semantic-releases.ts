import { Octokit } from "@octokit/core";
import { composePaginateRest } from "@octokit/plugin-paginate-rest";
import semverValid from "semver/functions/valid";
import semverSatisfies from "semver/functions/satisfies";
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

      // If `range` is not specified, return all releases
      if (!options.range) return { version, ...release };

      // If `range` is specified, return only releases that match the semver range
      if (semverSatisfies(version, options.range))
        return { version, ...release };
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
