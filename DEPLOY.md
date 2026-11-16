# Getting this on GitHub Pages

One-time setup. After this, publishing a change is three commands.

---

## First time

Unzip `bsh-studio.zip` somewhere sensible — not Downloads, since you'll be
coming back to it. Say `~/Sites/bsh-studio`. Then:

```bash
cd ~/Sites/bsh-studio
```

If git has never been set up on this Mac, do this once (skip if it has):

```bash
git config --global user.name  "Adebayo Ojo"
git config --global user.email "you@example.com"
```

> Whatever email you put there becomes visible in every commit of a public repo.
> If you'd rather it didn't, GitHub gives you a private one: turn on
> **Settings → Emails → Keep my email address private**, then use the
> `12345678+username@users.noreply.github.com` address it shows you.

Now create the repo and push:

```bash
git init -b main
git add .
git commit -m "BSH portfolio"
```

**If you have the GitHub CLI** (`gh --version` prints something):

```bash
gh repo create bsh-studio --public --source=. --push
```

**If you don't**, create an empty repo named `bsh-studio` at
<https://github.com/new> — public, and **don't** let it add a README or
.gitignore — then:

```bash
git remote add origin https://github.com/YOURUSERNAME/bsh-studio.git
git push -u origin main
```

### Switch Pages on

1. Go to the repo → **Settings** → **Pages** (left sidebar)
2. **Source**: *Deploy from a branch*
3. **Branch**: `main`, folder `/ (root)` → **Save**

Give it a minute. Your site is at:

```
https://YOURUSERNAME.github.io/bsh-studio/
```

---

## Every time after that

Edit `js/data.js`, drop files into `media/`, then:

```bash
git add .
git commit -m "Add the Lagos job"
git push
```

Live in under a minute. If the change doesn't show, hard-refresh with
**Cmd-Shift-R** — browsers hold on to video and CSS hard.

---

## Using your own domain later

If you pick up something like `bayosayshi.com`:

1. Repo → **Settings** → **Pages** → **Custom domain** → enter it → Save
2. At your registrar, add a `CNAME` record pointing `www` to
   `YOURUSERNAME.github.io`
3. Tick **Enforce HTTPS** once the certificate finishes provisioning

GitHub writes a `CNAME` file into the repo when you do this. Leave it alone —
deleting it un-sets the domain.

---

## If something goes wrong

**Push rejected, "remote contains work you don't have"** — the repo wasn't
empty. Easiest fix:

```bash
git pull --rebase origin main
git push
```

**Pages shows a 404** — check Settings → Pages actually says *Your site is live
at…*. If the branch dropdown is empty, the push didn't land; run `git log
--oneline -1` to confirm you have a commit.

**Site loads but has no styling** — you're almost certainly opening
`index.html` from the file system rather than the Pages URL. Use the real URL.

**Video won't play on iPhone** — it must be H.264 in an `.mp4`, muted. The
export commands in `README.md` produce exactly that.
