# Photos

These are the restaurant's real photos, used across the site.

- **`hero.jpg`** — the banner image at the top of the page.
- **`chef-fernando.jpg`** — Fernando (chef/owner), shown in the About section.
- Everything else is listed in **`manifest.json`** and shown in the Gallery.

The gallery reads `manifest.json` and displays each `{ "file", "alt" }` entry,
skipping any file that isn't present. To add or reorder photos, edit that file.
