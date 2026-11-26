# Releasing

Maintainer checklist. Releases are published from GitHub Actions ([`release.yml`](../.github/workflows/release.yml)) so every npm package has [provenance](https://docs.npmjs.com/generating-provenance-statements) linking it to the commit it was built from.

## One-time setup

- On npmjs.com, add a **trusted publisher** for `mcp-keeper`: GitHub Actions, repository `Erbse04/mcp-keeper`, workflow `release.yml`. No token is needed then.
- Alternatively, create an npm *automation* token and store it as the repository secret `NPM_TOKEN`.
- Keep two-factor authentication enabled on the npm account.

## Every release

1. Make sure `main` is green in CI (Linux, macOS, Windows; Node 18, 20, 22, 24).
2. Move the entries under **Unreleased** in [`CHANGELOG.md`](../CHANGELOG.md) to a new version heading with today’s date.
3. Bump the version — this updates `package.json` and `package-lock.json` and creates the tag:

   ```bash
   npm version minor      # or patch / major
   git push --follow-tags
   ```

4. The tag `vX.Y.Z` triggers the release workflow. It builds, tests, publishes to npm, creates the GitHub release from the changelog and moves the major tag (`v0`, later `v1`) that `uses: Erbse04/mcp-keeper@v0` points to.
5. Check:
   - `npm view mcp-keeper version` shows the new version
   - `npx mcp-keeper@latest --version` works
   - the release on GitHub has the changelog text
   - optionally: “Publish this Action to the GitHub Marketplace” on the release

## Versioning

[Semantic versioning](https://semver.org). Before 1.0, minor versions may change behaviour. Treat these as breaking: removed or renamed CLI options, changed exit codes, a rule that gets a higher default severity, changes to the JSON report shape or the library API. New rules and new patterns are minor releases — they can lower scores, so mention them in the changelog.
