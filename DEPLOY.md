# ?? DEPLOY YOUR APP - 3 COMMANDS

## ? VERCEL (RECOMMENDED)

```bash
npm install -g vercel
cd /workspace
vercel --yes
```

**DONE.** You'll get a live URL in 60 seconds.

---

## ? NETLIFY (ALTERNATIVE)

```bash
npm install -g netlify-cli
cd /workspace
netlify deploy --prod
```

**DONE.** You'll get a live URL.

---

## ?? WHICH ONE TO USE?

- **Vercel**: Made for Next.js. Easier. Use this.
- **Netlify**: Works too. Requires plugin.

---

## ? IF IT FAILS

Run this first:
```bash
cd /workspace
npm install
npm run build
```

If build works locally, then deploy.

---

## ?? STUCK?

Deploy via dashboard:
1. **Vercel**: Go to vercel.com, connect GitHub, deploy
2. **Netlify**: Go to netlify.com, connect GitHub, deploy

Both auto-detect Next.js.

---

Made by: Background Agent (finally being useful)
