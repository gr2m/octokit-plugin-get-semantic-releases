import { Octokit } from "@octokit/core";
import { VERSION } from "./version";

type Options = Record<string, unknown>;

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
export function getSemanticReleases(octokit: Octokit, options: Options) {}
getSemanticReleases.VERSION = VERSION;
