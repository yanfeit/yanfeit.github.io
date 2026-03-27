---
layout: post
title: Setting Up LaTeX Compilation in VS Code
date: 2026-03-27
tags: [LaTeX, VS Code]
comments: false
toc: true
pinned: false
---

Writing papers on a remote server is common in academic and HPC environments, but getting a smooth LaTeX compilation loop working inside VS Code requires a few non-obvious steps. This guide covers installing TeX Live on a remote Ubuntu server, configuring the **LaTeX Workshop** extension over Remote-SSH, and tuning the workspace settings for an auto-build, auto-clean workflow.

<!-- more -->

## Prerequisites

- **VS Code** installed on your local machine
- **Remote - SSH** extension installed in VS Code
- SSH access to a remote server running Ubuntu 22.04 (or later)

---

## 1. Install TeX Live on the Remote Server

SSH into your remote server and run:

```bash
sudo apt-get update
sudo apt-get install -y texlive-latex-extra texlive-fonts-recommended \
    texlive-science texlive-bibtex-extra biber latexmk
```

> **Why not `texlive-full`?** The full distribution is ~5 GB and its
> post-install step (ConTeXt format generation) can hang indefinitely on some
> servers. The package set above covers the vast majority of academic LaTeX
> use cases. You can always add individual packages later with `apt-get`.
>
> If you attempted `texlive-full` and `dpkg` got stuck, recover with:
>
> ```bash
> sudo kill -9 <stuck_pid>
> sudo rm -f /var/lib/dpkg/lock-frontend /var/lib/dpkg/lock
> sudo dpkg --configure -a
> ```

Verify the installation:

```bash
pdflatex --version
latexmk --version
```

---

## 2. Install the LaTeX Workshop Extension

1. Connect to your remote server in VS Code via **Remote - SSH**
2. Open the Extensions panel (`Ctrl+Shift+X`)
3. Search for **LaTeX Workshop** (publisher: James Yu)
4. Click **Install** — VS Code installs it on the remote side automatically

---

## 3. VS Code Settings (`.vscode/settings.json`)

Place the following in your workspace's `.vscode/settings.json`. The key behaviours it enables:

- **Auto-build on save** — triggers compilation every time you save a `.tex` file
- **Auto-clean** — removes auxiliary files (`.aux`, `.log`, `.synctex.gz`, …) after each successful build
- **Default recipe** — runs `pdflatex → bibtex → pdflatex × 2`, the standard pipeline for papers with a `.bib` bibliography
- **PDF viewer** — opens the compiled PDF in a VS Code tab (works over Remote-SSH)

```json
{
    "latex-workshop.latex.autoBuild.run": "onSave",
    "latex-workshop.latex.autoClean.run": "onBuilt",
    "latex-workshop.latex.recipes": [
        {
            "name": "pdflatex -> bibtex -> pdflatex * 2",
            "tools": ["pdflatex", "bibtex", "pdflatex", "pdflatex"]
        },
        {
            "name": "latexmk (pdflatex)",
            "tools": ["latexmk"]
        },
        {
            "name": "latexmk (xelatex)",
            "tools": ["xelatexmk"]
        },
        {
            "name": "latexmk (lualatex)",
            "tools": ["lualatexmk"]
        }
    ],
    "latex-workshop.latex.tools": [
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ]
        },
        {
            "name": "xelatexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-xelatex",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ]
        },
        {
            "name": "lualatexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-lualatex",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": ["%DOCFILE%"]
        }
    ],
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.synctex.afterBuild.enabled": true
}
```

---

## 4. Usage Workflow

### Building a Document

1. Open any `.tex` file in VS Code
2. **Save** (`Ctrl+S`) — LaTeX Workshop auto-builds using the default recipe
3. The compiled PDF opens in a new VS Code tab

### Bibliography (BibTeX)

The default recipe (`pdflatex → bibtex → pdflatex × 2`) handles bibliographies
automatically. Your document needs only the standard bibliography declarations:

```latex
\usepackage[numbers]{natbib}   % or \usepackage{cite}
...
\bibliographystyle{plainnat}   % options: plain, ieeetr, apalike, etc.
\bibliography{references}      % loads references.bib
```

### Manual Build

- Press `Ctrl+Alt+B` to trigger a build at any time
- Or use the Command Palette (`Ctrl+Shift+P`) → `LaTeX Workshop: Build LaTeX project`

### Switching the Compiler (Recipe)

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Type `LaTeX Workshop: Build with recipe`
3. Choose from:
   - **pdflatex → bibtex → pdflatex × 2** — full build with bibliography *(default)*
   - **latexmk (pdflatex)** — standard, fast
   - **latexmk (xelatex)** — best for Unicode text and custom fonts
   - **latexmk (lualatex)** — modern Lua-based alternative

### Viewing the PDF

- The PDF opens automatically in a tab after each successful build
- `Ctrl+Alt+V` opens the PDF viewer manually
- **SyncTeX** is enabled: `Ctrl+Click` in the PDF jumps to the corresponding
  source line; `Ctrl+Alt+J` does the reverse (source → PDF)

### Cleaning Auxiliary Files

- Runs automatically after each build (configured in Section 3)
- Manual: Command Palette → `LaTeX Workshop: Clean up auxiliary files`

---

## 5. Useful Keyboard Shortcuts

| Action                    | Shortcut             |
|---------------------------|----------------------|
| Build project             | `Ctrl+Alt+B`         |
| View PDF                  | `Ctrl+Alt+V`         |
| Forward SyncTeX           | `Ctrl+Alt+J`         |
| Inverse SyncTeX           | `Ctrl+Click` on PDF  |
| Clean auxiliary files     | Command Palette      |
| Show LaTeX panel          | Click TeX icon (sidebar) |

---

## 6. Troubleshooting

### Build fails with "command not found"

Confirm that TeX Live is installed and on the remote `$PATH`:

```bash
which pdflatex latexmk
```

If either command is missing, reinstall:

```bash
sudo apt-get install -y texlive-latex-extra texlive-fonts-recommended \
    texlive-science texlive-bibtex-extra biber latexmk
```

### PDF not showing in VS Code tab

The tab-based PDF viewer works over Remote-SSH but occasionally needs a nudge:

1. Confirm `"latex-workshop.view.pdf.viewer": "tab"` is present in your settings
2. Reload the VS Code window (`Ctrl+Shift+P` → `Reload Window`)

### Missing packages during compilation

`! LaTeX Error: File 'somepackage.sty' not found` means a package is not
installed on the remote host. Search and install it:

```bash
# Find the apt package that provides the .sty file
apt-cache search texlive | grep <packagename>

# Example: install the science/physics packages
sudo apt-get install -y texlive-science
```

### Large projects / slow builds

For large documents, disable auto-build on save to avoid rebuilding on every
keystroke:

```json
"latex-workshop.latex.autoBuild.run": "never"
```

Then build manually with `Ctrl+Alt+B` when ready.

---

## 7. Minimal Working Example

The following self-contained document exercises the full pipeline — text,
math, a figure placeholder, and a BibTeX citation — and is a useful sanity
check after completing the setup.

**`main.tex`**

```latex
\documentclass[12pt]{article}

\usepackage{amsmath, amssymb}
\usepackage{graphicx}
\usepackage[numbers]{natbib}

\title{A Minimal Working Example}
\author{Your Name}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
  A minimal document to verify that pdflatex, BibTeX, and the VS Code
  LaTeX Workshop extension are all working correctly.
\end{abstract}

\section{Equation}
Einstein's mass--energy relation:
\begin{equation}
  E = mc^2 .
\end{equation}

\section{Citation}
See \citet{knuth1984texbook} for the authoritative reference on \TeX.

\bibliographystyle{plainnat}
\bibliography{references}

\end{document}
```

**`references.bib`**

```bibtex
@book{knuth1984texbook,
  author    = {Donald E. Knuth},
  title     = {The \TeX book},
  publisher = {Addison-Wesley},
  year      = {1984}
}
```

Open `main.tex` and press `Ctrl+S`. The default recipe compiles the document,
runs BibTeX, and reruns pdflatex twice — producing `main.pdf` in the same
directory.

---

## References

- [LaTeX Workshop Wiki](https://github.com/James-Yu/LaTeX-Workshop/wiki)
- [TeX Live Documentation](https://www.tug.org/texlive/doc.html)
- [VS Code Remote-SSH](https://code.visualstudio.com/docs/remote/ssh)
