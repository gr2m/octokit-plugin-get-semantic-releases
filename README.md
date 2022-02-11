# octokit-plugin-get-semantic-releases

> Get repository releases with semantic version tags (e.g. `v1.2.3`, `v2.0.0-beta.1`, etc)

[![@latest](https://img.shields.io/npm/v/octokit-plugin-get-semantic-releases.svg)](https://www.npmjs.com/package/octokit-plugin-get-semantic-releases)
[![Build Status](https://github.com/gr2m/octokit-plugin-get-semantic-releases/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-get-semantic-releases/actions?query=workflow%3ATest+branch%3Amain)

## usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `octokit-plugin-get-semantic-releases` and [`@octokit/core`](https://github.com/octokit/core.js) (or core-compatible module) directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
  import { getSemanticReleases } from "https://cdn.skypack.dev/octokit-plugin-get-semantic-releases";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-get-semantic-releases`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const { getSemanticReleases } = require("octokit-plugin-get-semantic-releases");
```

</td></tr>
</tbody>
</table>

```js
const MyOctokit = Octokit.plugin(getSemanticReleases);
const octokit = new MyOctokit({ auth: "secret123" });

const releases = await octokit.getSemanticReleases({
  owner: "octokit",
  repo: "core.js",
});
// `releases` is array of releases as shown at https://docs.github.com/en/rest/reference/releases#list-releases
// but includes a `version` property, which is the normalized semantic version derived from the tag name.
```

## Options

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>option name</code>
      </th>
      <th>
        <code>option type</code>
      </th>
      <td>
        <strong>Required.</strong> Description here
      </td>
    </tr>
  </tbody>
</table>
  
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
