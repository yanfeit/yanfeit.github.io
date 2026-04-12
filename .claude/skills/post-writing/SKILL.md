---
name: post-writing
description: "Write technical blog posts for yanfeit.github.io Jekyll site. Use when: drafting new posts, revising existing posts, writing math-heavy technical content, creating posts about physics/math/algorithms/HPC/programming. Covers writing style (Kip Thorne–inspired narrative rigor), LaTeX/MathJax conventions, Jekyll front matter, citation formatting, and the full draft-to-publish workflow."
argument-hint: "Topic or title of the blog post to write"
---

# Technical Blog Post Writing

## Overview

This skill guides the creation of technical blog posts for **Yanfei's Notes** (yanfeit.github.io) — a Jekyll-powered site covering physics, mathematics, algorithms, HPC, and programming. Posts should be **rigorous yet engaging**, following the narrative tradition of the best scientific exposition.

---

## Part I — Writing Style

### 1.1 Core Principles

The writing should embody three qualities simultaneously:

1. **Technical rigor**: Every claim is backed by derivation, citation, or simulation. Equations are not decorations — they carry the argument forward.
2. **Narrative momentum**: The reader should feel *pulled* through the material. Each section answers a question raised by the previous one.
3. **Appropriate wit**: Humor should emerge naturally from the material — an unexpected analogy, a self-deprecating aside, a well-placed historical anecdote — never forced.

### 1.2 The Kip Thorne Model

The writing style draws inspiration from Kip Thorne's approach in *Black Holes and Time Warps: Einstein's Outrageous Legacy* and *Modern Classical Physics* (with Roger D. Blandford). Key elements to emulate:

**From *Black Holes and Time Warps*:**
- **Historical narrative as scaffolding.** Thorne never presents a result in isolation. He tells you *who* discovered it, *why* they were looking, and *what surprised everyone*. When introducing a technique, briefly situate it: who developed it, what problem motivated it, and why it matters beyond the immediate context.
- **Thought experiments as pedagogy.** Before diving into formalism, pose a concrete scenario. Thorne writes: "Imagine you are falling into a black hole..." — this draws the reader in before a single equation appears. Adapt this: "Suppose an e-commerce operator faces a holiday campaign with 10 million users and a budget of ¥5 million..."
- **Layered explanation.** First the physical (or practical) intuition, then the mathematical skeleton, then the full derivation. The reader who stops at any layer should still walk away with something.
- **Personal voice.** Thorne is unafraid to say "I was astonished when..." or "This result had eluded physicists for decades." Use first-person sparingly but genuinely — e.g., "When I first encountered this problem at my e-commerce job, I was struck by how naturally it mapped to a knapsack formulation."

**From *Modern Classical Physics*:**
- **Geometric and physical reasoning first**, algebra second. Always explain *what* an equation means before proving *why* it holds.
- **Extensive cross-referencing.** Refer the reader to related sections, prior posts, and external resources generously.
- **Complete bibliography.** Every source — textbooks, papers, URLs — gets a proper citation. No orphaned claims.

### 1.3 What to Avoid

- **Dry enumeration.** Do not write "Step 1: ... Step 2: ... Step 3: ..." without narrative connective tissue between steps.
- **Apologetic hedging.** Avoid "I'm not an expert but..." or "This may not be entirely correct..." — if you are uncertain, state the uncertainty precisely ("The convergence rate has been proved for convex objectives [^3]; the non-convex case remains open").
- **Overloaded introductions.** Get to the point within 2–3 paragraphs. The knapsack post opens with a personal anecdote and lands on the mathematical formulation within one screenful — this is the right tempo.
- **Unexplained notation.** Every symbol must be defined at its first appearance. The knapsack post exemplifies this well: "$p_{ij}$ describes the sensitivity or probability that the $i$th user's willing to participate..."

### 1.4 Language

- Posts may be written in **English** or **Chinese**, depending on the topic and audience. The two exemplar posts demonstrate both (Kalman Filter in Chinese, Knapsack in English).
- For English posts, use clear, direct prose. Favor active voice.
- For Chinese posts, maintain the same technical precision. Use `&emsp;&emsp;` for paragraph indentation when following the existing convention.

---

## Part II — Jekyll Conventions

### 2.1 File Structure

```
_posts/
  YYYY/
    topic-slug/
      YYYY-M-D-topic-slug.md      # The post (date can omit leading zeros)
```

Images go in a parallel structure:

```
images/
  YYYY/
    topic-slug/
      figure1.png
      figure2.png
```

### 2.2 Front Matter

Every post must begin with YAML front matter:

```yaml
---
layout: post
title: Your Post Title Here
date: YYYY-M-D
author: Yanfei Tang
tags: [tag1, tag2, tag3]
comments: false
toc: true
pinned: false
---
```

Field notes:
- `layout`: Always `post`.
- `title`: Descriptive, concise. Can be English or Chinese.
- `date`: Format `YYYY-M-D` (e.g., `2025-5-7`) or `YYYY-MM-DD`. Must match the filename date.
- `author`: Use `Yanfei Tang`.
- `tags`: Array of lowercase tags. Reuse existing tags when possible: `math`, `algorithm`, `python`, `C`, `HPC`, `gpu`, `electromagnetism`, `circuit model`, `machine learning`, `OpenACC`.
- `toc`: Set `true` for longer posts with multiple sections; `false` for shorter posts.
- `pinned`: Set `true` only for posts to highlight on the front page.
- `comments`: Typically `false`.

### 2.3 Excerpt Separator

Place `<!-- more -->` after the opening paragraph(s). Everything before it appears as the post preview on the index page. Place it after 1–3 introductory paragraphs.

```markdown
&emsp;&emsp; Opening paragraph that hooks the reader...

<!-- more -->

The detailed content begins here...
```

### 2.4 Section Headings

Use Markdown headings consistently:

```markdown
# 1. Major Section
## 1.1 Subsection
### 1.1.1 Sub-subsection (use sparingly)
```

The `#` (h1) level heading is rendered within the post body (the post title is handled by the layout). Use numbered sections for technical posts (e.g., `# 1. Primal-Dual Formulation`, `## 1.1 Formalism`).

### 2.5 Images

Use centered HTML for images with captions:

```html
<p align="center">
   <img src="/images/YYYY/topic-slug/filename.png" alt="description" align="middle" style="width:600px;" />
   <em>Fig. N Caption text describing the figure.</em>
</p>
```

Rules:
- Always use **absolute paths** from site root: `/images/YYYY/...`
- Include meaningful `alt` text.
- Set `style="width:Npx;"` appropriate to the image (typically 400–800px).
- Number figures sequentially: Fig. 1, Fig. 2, etc.
- Caption goes in `<em>` tag immediately after `<img>`.

### 2.6 Code Blocks

Use fenced code blocks with language identifiers:

````markdown
```python
def example():
    return 42
```
````

For inline code, use single backticks: `` `pragma acc kernels` ``.

---

## Part III — LaTeX / MathJax Conventions

The site uses **MathJax 3** with the following configuration:
- Inline math: `$...$`
- Display math: `$$...$$`
- `processEscapes: true` is enabled.

### 3.1 Inline Math

Use `$...$` for inline expressions:

```markdown
The variable $x_{ij}$ represents the decision for user $i$ and coupon $j$.
```

**Escaping pitfall in Kramdown:** When a subscript or superscript involves `_` adjacent to other Markdown syntax, Kramdown may interpret `_` as emphasis. Workarounds:
- Use `<span>$...$</span>` to protect complex inline math from Kramdown:
  ```markdown
  The posterior estimate <span>$\mathbf{\hat{x}}_{k-1}$</span> is used...
  ```
- Use `\_` to escape underscores when they appear adjacent to text boundaries:
  ```markdown
  We define $\mathbf{w}\_k$ as the process noise.
  ```

### 3.2 Display Math

Use `$$...$$` for display equations. Always add `\tag{N}` for numbered equations:

```markdown
$$
\mathbf{x}_k = \mathbf{A}_k \mathbf{x}_{k-1} + \mathbf{B}_k \mathbf{u}_k + \mathbf{w}_k. \tag{1}
$$
```

For multi-line equations, use `gathered`, `aligned`, or `align*` inside `$$...$$`:

```markdown
$$
\begin{gathered}
\max \sum_{i=1}^N \sum_{j=1}^{M} p_{ij}x_{ij} \\
\sum_{i=1}^N \sum_{j=1}^M b_{ijk}x_{ij} \le B_k, \quad \forall k \in [K] \\
\sum_{j=1}^M x_{ij} = 1, \quad \forall i \in [N]
\end{gathered}
\tag{1}
$$
```

### 3.3 Equation Referencing

Refer to equations in text as `Equation (N)` or `Eq.(N)`:

```markdown
According to Equation (9), the optimal decision variable...
```

### 3.4 Common LaTeX Patterns

| Pattern | Usage |
|---------|-------|
| `\mathbf{x}` | Bold vectors/matrices |
| `\hat{x}` | Estimates |
| `\boldsymbol{\mu}` | Bold Greek letters |
| `{\cal L}` | Calligraphic (Lagrangian) |
| `\text{ROI}` | Text within math mode |
| `\tag{N}` | Equation numbers |
| `\quad` | Spacing in equations |
| `\le`, `\ge` | Inequalities |
| `\frac{a}{b}` | Fractions |
| `\sum_{i=1}^N` | Summations |
| `\begin{bmatrix}` | Matrices |

### 3.5 Validation Checklist

Before finalizing any post, verify:

- [ ] Every `$$...$$` block renders correctly (no mismatched braces).
- [ ] Inline `$...$` does not conflict with Kramdown emphasis parsing.
- [ ] All `\tag{N}` numbers are sequential and non-duplicated.
- [ ] Every symbol is defined at first use.
- [ ] Complex inline math uses `<span>` wrappers where needed.
- [ ] No raw LaTeX commands that MathJax 3 does not support (e.g., avoid `\eqref` unless configured; use `Equation (N)` instead).

---

## Part IV — Citations and References

### 4.1 Citation Format

Use Markdown footnotes for references:

```markdown
...the algorithm was first proposed by Zhang et al.[^1]

[^1]: Zhang, X., Qi, F., Hua, Z. & Yang, S. Solving Billion-Scale Knapsack Problems. *in Proceedings of The Web Conference 2020* 3105–3111 (ACM, 2020).
```

### 4.2 Citation Style Guidelines

Follow a consistent format inspired by Nature/physics journal style:

**Journal articles:**
```
[^N]: Last, F. M., Last, F. M. & Last, F. M. Title of the Article. *Journal Name* **volume**, pages (year). DOI or URL.
```

**Books:**
```
[^N]: Last, F. M. & Last, F. M. *Book Title* (Publisher, year). Chapter/Section if applicable.
```

**Conference proceedings:**
```
[^N]: Last, F. M. et al. Title. *in Proceedings of Conference Name* pages (Publisher, year).
```

**Online resources:**
```
[^N]: Author or Organization. Title or Description. URL (accessed date).
```

### 4.3 Citation Completeness

Aim for **thorough citations** that exceed the baseline of the exemplar posts:

- **Every non-trivial claim** should have a citation. If you write "the convergence rate is $O(1/\sqrt{T})$," cite where this was proved.
- **Credit algorithms to their creators.** The Adam optimizer should cite Kingma & Ba. The Kalman filter should cite Kalman's 1960 paper.
- **Cite textbooks for pedagogical derivations.** If the derivation follows Pozar's *Microwave Engineering* or Thorne & Blandford's *Modern Classical Physics*, say so explicitly.
- **Include DOIs or stable URLs** when available (especially for arXiv papers).
- **Recommended citation count**: Aim for 5–15 references per technical post, depending on depth.

### 4.4 Case Study: Improved Citations

**Before (knapsack post):**
```
[^1]: Zhang, X., Qi, F., Hua, Z. & Yang, S. Solving Billion-Scale Knapsack Problems. *in Proceedings of The Web Conference 2020* 3105–3111 (ACM, 2020).
[^2]: Kingma, D. P. & Ba, J. Adam: A Method for Stochastic Optimization. *arXiv* 1412.6980 (2017).
```

**After (improved, with additional context):**
```
[^1]: Zhang, X., Qi, F., Hua, Z. & Yang, S. Solving Billion-Scale Knapsack Problems. *in Proceedings of The Web Conference 2020* 3105–3111 (ACM, 2020). https://doi.org/10.1145/3366423.3380167
[^2]: Kingma, D. P. & Ba, J. Adam: A Method for Stochastic Optimization. *arXiv preprint* arXiv:1412.6980 (2014). https://arxiv.org/abs/1412.6980
[^3]: Martello, S. & Toth, P. *Knapsack Problems: Algorithms and Computer Implementations* (Wiley, 1990). — The classical reference for knapsack problem formulations and algorithms.
[^4]: Boyd, S. & Vandenberghe, L. *Convex Optimization* (Cambridge University Press, 2004). Section 5.1 on Lagrangian duality and relaxation.
[^5]: Kellerer, H., Pferschy, U. & Pisinger, D. *Knapsack Problems* (Springer, 2004). Chapter 9 covers multidimensional knapsack variants.
```

---

## Part V — Post Structure Template

A well-structured technical post typically follows this skeleton:

```markdown
---
layout: post
title: ...
date: ...
author: Yanfei Tang
tags: [...]
comments: false
toc: true
pinned: false
---

[Opening hook — 1–3 paragraphs: personal anecdote, motivating problem,
 or historical context. End with a clear statement of what this post covers.]

<!-- more -->

# 1. Background / Motivation
[Why does this problem matter? Who encountered it first?
 Set the stage with context before any equations.]

# 2. Theory / Formulation
[The mathematical or technical core. Build up from intuition to formalism.
 Number equations. Define every symbol. Cite sources.]

## 2.1 First Key Concept
## 2.2 Second Key Concept

# 3. Case Study / Implementation
[Apply the theory to a concrete example. Show code, figures, results.
 Discuss what worked and what didn't.]

# 4. Results and Discussion
[Present simulation/experimental results with figures.
 Compare with benchmarks or exact solutions.
 Be honest about limitations.]

# 5. Conclusion
[Brief summary — 1–3 paragraphs max. Mention open questions or future directions.]

[^1]: Citation 1...
[^2]: Citation 2...
```

This is a template, not a straitjacket. Shorter posts (setup guides, tips) can omit sections. The key is that longer technical posts maintain narrative flow across sections.

---

## Part VI — Workflow

### Phase 1: Planning (before writing)

1. **Define the topic and scope.** Write a one-sentence thesis: "This post shows how to solve large-scale knapsack problems using Lagrangian relaxation with an Adam optimizer."
2. **Gather references.** Collect 5–15 sources: foundational papers, textbooks, related blog posts, documentation. Record them in citation format early.
3. **Sketch an outline.** List major sections and the key result/figure of each. Identify which equations, figures, and code blocks are needed.
4. **Prepare assets.** Generate or collect figures. Place images in `/images/YYYY/topic-slug/`. Write and test code snippets.

### Phase 2: Drafting

5. **Write the opening hook first.** If you cannot write a compelling first paragraph, the scope may be too broad or too narrow. The opening should answer: *Why should anyone read this?*
6. **Draft section by section.** For each section:
   - Start with the physical/practical intuition.
   - Introduce formalism with full notation definitions.
   - Number equations sequentially using `\tag{N}`.
   - Add citations as you go — do not defer them.
7. **Write the conclusion last.** Summarize the main result and state limitations honestly.

### Phase 3: Technical Validation

8. **LaTeX/MathJax review.**
   - Check every `$$...$$` and `$...$` block for balanced braces and correct syntax.
   - Ensure `\tag{N}` numbers are sequential.
   - Test complex inline math for Kramdown conflicts (add `<span>` wrappers if needed).
   - Verify that escaped underscores (`\_`) are used where Kramdown might misparse.
9. **Jekyll compliance review.**
   - Verify front matter fields are complete and syntactically correct.
   - Confirm `<!-- more -->` is placed appropriately.
   - Check all image paths are correct (`/images/YYYY/topic-slug/filename.ext`).
   - Verify all internal links work.
10. **Code review.**
    - Ensure code blocks have language identifiers.
    - Verify code runs correctly (or state clearly if it is pseudocode).
    - Remove debug output, hardcoded paths, and credentials.

### Phase 4: Editorial Revision

11. **Narrative flow check.** Read the post from start to finish. Ask:
    - Does each section lead naturally to the next?
    - Is there a clear thread connecting the opening hook to the conclusion?
    - Would a reader who skips the math still understand the main point?
12. **Clarity pass.**
    - Replace jargon with plain language where possible (or define it).
    - Shorten paragraphs longer than 6–8 sentences.
    - Ensure every figure is referenced in the text ("as shown in Fig. 2").
13. **Citation completeness check.**
    - Every `[^N]` in text has a corresponding definition at the bottom.
    - Every reference at the bottom is actually cited in the text.
    - References include authors, title, venue/publisher, year, and DOI/URL where available.

### Phase 5: Preview and Publish

14. **Local preview.** Build and serve the site locally:
    ```bash
    bundle exec jekyll serve
    ```
    Check in the browser:
    - Does the post appear on the index page with the correct excerpt?
    - Do all equations render correctly?
    - Do all images load?
    - Does the table of contents (if `toc: true`) generate correctly?
    - Does the post render correctly on both desktop and mobile viewports?
15. **Final commit.** Commit the post file, images, and any assets together.

---

## Part VII — Case Studies

### Case Study A: Knapsack Post (exemplar)

**Strengths to preserve:**
- Opens with a relatable personal anecdote (first job at an e-commerce company).
- Immediately frames the mathematical problem in business terms before introducing notation.
- Careful notation: every subscript explained, every constraint motivated.
- Practical: includes a system design figure, simulation results, and complete runnable code.
- Primal-dual formulation is presented step by step, building from the concrete to the abstract.

**Areas for improvement (apply in future posts):**
- Add 3–5 more references: the foundational Martello & Toth textbook, Boyd & Vandenberghe for Lagrangian duality, DOIs for existing refs.
- Expand the introduction: a brief history of knapsack problems (Dantzig, 1957) and why this particular variant matters in tech industry operations.
- Add a paragraph discussing limitations: when does the Lagrangian relaxation approach fail? How large a gap should one expect?
- Fix minor typos ("applicale" → "applicable", "castel-in-the-air" → "castles in the air").

### Case Study B: Kalman Filter Post (exemplar)

**Strengths to preserve:**
- Begins with an interactive demo (mouse tracking GIF) — immediately engaging.
- Gracious acknowledgments of code sources.
- Uses the predictor-corrector framing as a pedagogical bridge — this is exactly the Thorne technique of intuition-first explanation.
- Parameter sensitivity analysis with multiple GIFs is excellent visual pedagogy.
- Personal voice: "我不喜欢中文把他翻译成预测校正算法" — this kind of opinionated aside gives the writing character.

**Areas for improvement (apply in future posts):**
- Add Kalman's original 1960 paper as a citation.
- Include a brief "Historical Note" paragraph: Rudolf Kálmán's background, how the filter was initially received, its role in the Apollo program.
- Expand the conclusion beyond "对python感兴趣的同学可以参看我的python代码" — summarize what was learned and suggest next steps (extended Kalman filter, unscented Kalman filter).
- Add 2–3 additional references: a textbook treatment (e.g., Simon's *Optimal State Estimation*), the original Kálmán paper.

---

## Quick Reference Card

| Element | Convention |
|---------|-----------|
| Front matter layout | `layout: post` |
| Date format | `YYYY-M-D` or `YYYY-MM-DD` |
| Excerpt separator | `<!-- more -->` |
| Inline math | `$...$` (use `<span>` wrapper if Kramdown conflicts) |
| Display math | `$$...$$` with `\tag{N}` |
| Images | `<p align="center"><img src="/images/YYYY/slug/file.png" ... /><em>Fig. N ...</em></p>` |
| Code blocks | Triple backticks with language identifier |
| Citations | `[^N]` footnote syntax; Nature/physics style |
| Section heads | `# N. Title` / `## N.M Subtitle` |
| Paragraph indent (optional) | `&emsp;&emsp;` |
