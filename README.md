
# 🎨 Senior Designer Portfolio: Update Instructions

This portfolio is built to be "Data-Driven," meaning you don't need to write code to update it. Everything is controlled by one file: `data/portfolio.ts`.

## 🚀 How to Add or Change Projects

1.  **Prepare your Images:**
    *   Host your project images on a service like Imgur, Cloudinary, or your own server.
    *   Recommended Sizes: 
        *   Logo/Grid: 800x800px or 1000x1000px.
        *   Posters/Vertical: 1000x1500px.
        *   Large Spreads: 1600x1200px.

2.  **Edit `data/portfolio.ts`:**
    *   Open the file in any text editor (Notepad, VS Code, or online JSON editor).
    *   Find the `portfolioData` constant.
    *   To add a project, copy an existing item block `{ ... }` and paste it into the `items` list of your chosen category.
    *   Update the `imageUrl`, `title`, and `description`.
    *   **Tip:** Because this is a `.ts` file, your editor will help highlight errors if you miss a comma or quote!

3.  **To Add a New Category:**
    *   Copy a whole category block inside the `categories` array.
    *   Ensure the `id` is unique (e.g., `brand-identity`).
    *   The website will automatically add it to the Homepage "Expertise" grid!

## 👔 Professional Strategy: Perception by HRs & Directors

This site is architected to signal **Design Maturity**:
*   **The Typography:** Using *Playfair Display* (Serif) against *Inter* (Sans) suggests a high-end, editorial eye found in senior fashion and corporate designers.
*   **Category Focus:** Instead of one long scroll, dedicated category pages show you have *depth* in specific disciplines, which is what hiring managers look for when filling specific roles (e.g., "We need a print specialist").
*   **The Modal System:** Quick previews allow HRs to scan 20 projects in 2 minutes, respecting their time while showing off your scale.
*   **Masonry View:** Signals an understanding of modern digital design patterns (Awwwards/Behance style).
