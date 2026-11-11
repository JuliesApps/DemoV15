# Clearframe V15 — GitHub Pages PWA installation

This ZIP is a **ready-to-publish static website**. It needs no npm, build process, database or secret keys. It contains 29 routines, 177 subroutines and 357 perspective-reversible indicators.

## Put V15 on GitHub Pages

1. Create a new repository at GitHub (for example `clearframe-v15`). A public repository is simplest for a public Pages website.
2. Extract `Clearframe_V15_GitHub_PWA.zip` on your computer.
3. In the new repository, choose **Add file → Upload files**. Upload the **contents** of the extracted folder, including `index.html`, `sw.js`, `manifest.webmanifest`, all `.js`, `.css` and icons. Do not upload the ZIP as a single file, and do not place everything in an extra nested folder.
4. Commit the uploaded files to the `main` branch.
5. Open the repository's **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
6. Open the Pages URL that GitHub shows when the site is ready. For a standard project repository, it has the form `https://USERNAME.github.io/REPOSITORY/`.
7. In Chrome or another PWA-capable browser, use its **Install app** action. On iPhone/iPad, use Safari's **Add to Home Screen** action where available.

### Confirm it is the right build

The home screen must show the **What's weighing on you?** input. Enter a sentence and select **Untangle this**. The input should disappear and the view should jump to **2 · Matching subroutines**, expanded by default. **1 · The moment** remains collapsed above it, with plain text and no keyword highlights when reopened. Select any other main heading: the previous section should collapse, its heading remain available, and the new one should expand. Scrolling down should likewise advance through sections. Use the pencil beside **1 · The moment** to reopen the original sentence; **Cancel** should restore the result. Check that matches at or above 1% are grouped by control routine. In **2 · Matching subroutines**, the sticky footer should show the highest-matching subroutine's name, Expectation Trigger, and Protective Response, with a gentle fade above it. Each matched subroutine has either **+ Add** or **− Remove** followed by its percentage on the far right; the controls should stay right-aligned even when a long name forces them beneath it on a small screen. Clicking Add should select it and update the sticky footer summary; clicking Remove should deselect it and restore the Add button. **Review possible learned expectations and protective responses** is collapsed by default. Expand it and select a grey suggestion that was not scored in the original matches. It should appear inside the matching groups under its control routine, labeled **Added by you**, and the page should stay in Step 2. The old control-routine dropdown and removable green bubbles should be absent. Select an observation in Step 3 and tap **Swap Shoes** twice: the pronouns should reverse and return while the selected indicator and synthesis remain unchanged. Preferences should open with dark mode and softly fading routine-box edges enabled, with colour and text themes available.

The **Recently Picked Subroutine** footer has a raised **✓** when the current subroutine is included and a recessed **×** when it is excluded. Click that equally sized status button to add or remove the subroutine. The two equally wide **Previous / Next** arrow buttons browse matching subroutines without selecting them and scroll the corresponding row into view immediately above the footer. The borderless position count sits within their rounded central cutout. At the final result, pressing **Next** again expands **Review possible learned expectations and protective responses** and hides the footer for reading.

To test offline use, **first visit online** so the service worker caches the assets, then disconnect and reopen the installed app. The first offline visit cannot work before the cache is installed.

### Privacy and updates

- Your entries and saved moments remain in the **local browser storage for each origin**. The ChatGPT-hosted version and your `github.io` version do **not** share stored moments. Export and import through Clearframe if you want to transfer your saved entries.
- Avoid clearing site data without exporting a backup. Uninstalling an app or clearing a browser profile may remove saved local information.
- A new repository URL avoids old version caches. If you later update V15 on GitHub, adjust the asset query version in `index.html` and the cache version/assets in `sw.js` to force asset replacement.
- GitHub Pages must be enabled; simply viewing `index.html` locally through `file://` does not provide a working installable PWA or service worker.
- This is an educational, original conceptual adaptation of family-therapy ideas, **not a diagnostic, therapy, safety-assessment, or clinically validated tool**.

The included `book1-v10-source-ledger.json` records chapter/page provenance and original editorial mapping decisions for review.
