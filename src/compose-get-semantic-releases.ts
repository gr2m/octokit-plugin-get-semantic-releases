import { Octokit } from "@octokit/core";
import { composePaginateRest } from "@octokit/plugin-paginate-rest";
import semverValid from "semver/functions/valid";

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

      if (!semverValid(version)) return;

      return { version, ...release };
    })
    .filter(Boolean);
}

function tagNameToVersion(tagName: string) {
  return /^v\d/.test(tagName) ? tagName.slice(1) : tagName;
}
