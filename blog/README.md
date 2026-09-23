# Adding a blog post

Each post is one HTML file in this `blog/` folder. There's no build step: add a file,
add it to the list, push.

## 1. Copy the template

Copy `_template.html` and give it a short, lowercase, hyphenated name. That name
becomes the web address.

```sh
cp blog/_template.html blog/my-new-post.html
```

→ the post will live at `https://gholamaliaminian.github.io/blog/my-new-post.html`

## 2. Fill in the placeholders

Open the new file and replace everything in CAPITALS:

| Where | What to put |
| --- | --- |
| `<title>` | `Your Post Title — Gholamali Aminian` |
| `<meta name="description">` | One sentence, shown in Google results |
| `og:title`, `og:description` | Title and one sentence, shown in LinkedIn / Slack previews |
| `YOUR-SLUG` (appears twice) | The file name without `.html`, e.g. `my-new-post` |
| `<time datetime="…">` | The date twice: machine format `2026-10-15`, then readable `15 October 2026` |
| `4 min read` | Rough reading time (about 200 words per minute) |
| `<h1>` | The post title |
| `post-dek` | One or two sentences under the title |

Then write the post inside `<div class="post-body">`. The building blocks:

```html
<h2>Section heading</h2>
<p>A paragraph with <strong>bold</strong>, <em>italics</em> and a <a href="https://…">link</a>.</p>

<ul>
  <li>Bullet point</li>
</ul>

<ol>
  <li>Numbered point</li>
</ol>
```

**Images:** put the file in `assets/blog/` (create the folder the first time) and add:

```html
<figure class="post-fig">
  <img src="../assets/blog/my-figure.png" alt="What the image shows">
  <figcaption>Caption under the image.</figcaption>
</figure>
```

**The paper box** at the end (`<aside class="post-cite">`) is optional. Delete it if the
post isn't about a paper.

## 3. Add it to the blog list

Open `blog/index.html` and copy this block to the **top** of `<ul class="post-list">`,
so the newest post comes first:

```html
<li>
  <p class="post-meta"><time datetime="2026-10-15">15 October 2026</time></p>
  <h2><a href="my-new-post.html">Your Post Title</a></h2>
  <p>One-sentence summary.</p>
</li>
```

Optionally, announce it in the **News** list on the homepage (`index.html`, `#news`):

```html
<li><span class="news-when">Oct 2026</span><p>New blog post: <a href="blog/my-new-post.html">Your Post Title</a>.</p></li>
```

## 4. Preview, then publish

```sh
python3 -m http.server 8000      # then open http://localhost:8000/blog/
```

Use the local server rather than double-clicking the file; links like `blog/` only
work properly through a server.

When it looks right:

```sh
git add -A
git commit -m "Blog: Your Post Title"
git push
```

It's live about a minute later.

## Tips for a readable post

- Aim for 600–1,000 words. One idea per post.
- Explain the problem before the solution, and use an everyday example.
- Swap jargon for plain words: "judge" instead of "reward model", "drift from normal
  behaviour" instead of "KL divergence". If a technical term is unavoidable, define it
  in one sentence.
- End with a takeaway: what should the reader do or think differently?
