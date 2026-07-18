# Bellevue Towers Unit 2008 rental website

This folder is a complete, dependency-free website for GitHub Pages. It includes 16 photos of Unit 2008 and 10 updated photos of Bellevue Towers' shared spaces, plus a responsive gallery, an accessible full-screen photo viewer, unit and building highlights, a location link, and an inquiry form that opens the visitor's email app.

The rental is available for immediate move-in with flexible one- to two-year lease terms. It includes one secure parking space. A separate storage unit is not included or advertised.

## Contact privacy and availability

The destination address is stored as an encoded numeric token in `script.js` and reconstructed in the visitor's browser only when the inquiry form is submitted. This deters basic source and mail-link scrapers, though no address used by a static website can be completely secret from a determined scraper.

The page says the home is available for immediate move-in, offers flexible one- to two-year lease terms, and shares rent on inquiry.

## Publish with GitHub Pages

1. Create a new public GitHub repository.
2. Upload everything inside this folder—`index.html`, `styles.css`, `script.js`, `.nojekyll`, and the `images` folder—to the root of the repository.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. GitHub will show the public website address once it is ready.

You can test the page before uploading by double-clicking `index.html`. No install or build step is needed.

## Easy edits

- Page headline and property description: edit the text in `index.html`.
- Colors: edit the color values at the top of `styles.css`.
- Photos: replace files in `images` while keeping the same filenames, or update their paths in `index.html`.
- Contact recipient: update the encoded `contactToken` value in `script.js`.

The inquiry form does not collect or store data. It creates a pre-filled email in the visitor's own email app.
