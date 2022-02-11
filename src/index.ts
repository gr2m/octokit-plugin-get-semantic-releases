import { Octokit } from "@octokit/core";

import { VERSION } from "./version";
import { composeGetSemanticReleases } from "./compose-get-semantic-releases";

export { composeGetSemanticReleases } from "./compose-get-semantic-releases";
export { GetSemanticReleasesOptions } from "./types";

/**
 * @param octokit Octokit instance
 */
export function getSemanticReleases(octokit: Octokit) {
  return {
    getSemanticReleases: composeGetSemanticReleases.bind(null, octokit),
  };
}

getSemanticReleases.VERSION = VERSION;
