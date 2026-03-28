# SEO Audit — ashharshahan.vercel.app

> Audit date: 2025-07-02 | Codebase: `c:\portfolio` (Next.js 14 App Router)

---

## Summary Scorecard

| Area | Status | Priority |
|---|---|---|
| Title & Meta Description | ✅ Pass | — |
| Open Graph tags | ⚠️ Warn | Low |
| Twitter Card tags | ⚠️ Warn | Low |
| Canonical URL | ⚠️ Warn | Medium |
| Heading hierarchy (H1) | ⚠️ Warn | High |
| Sitemap.xml | ❌ Fail | High |
| Robots.txt | ✅ Pass | — |
| Image alt text | ⚠️ Warn | Medium |
| Image formats | ⚠️ Warn | Low |
| Structured data / JSON-LD | ❌ Fail | High |
| Content depth | ⚠️ Warn | Medium |
| Internal anchor links | ✅ Pass | — |
| `<html lang>` | ✅ Pass | — |
| Performance signals | ⚠️ Warn | Medium |

---

## 1. Title & Meta Description ✅

**Source:** `app/layout.tsx` lines 28–29

```ts
title: "Ashhar Shahan | Python Full-Stack Developer",
description: "Portfolio of Ashhar Shahan - Specializing in scalable web applications, modern UIs, and high-performance backend systems with Python and React.",
```

**Findings:**
- Title is 48 chars (under 60-char limit) ✅
- Description is 153 chars (within 150–160 range) ✅
- `keywords` array is present (minor signal, not ranked highly by Google, but not harmful) ✅

**No action required.**

---

## 2. Open Graph Tags ⚠️

**Source:** `layout.tsx` lines 45–60

```ts
openGraph: {
  images: [{ url: "/profile.webp", width: 1200, height: 630, ... }],
}
```

**Findings:**
- OG image uses a **relative** URL (`/profile.webp`). `metadataBase` is set, so Next.js resolves it — but verify the image resolves at `https://ashharshahan.vercel.app/profile.webp`. ✅ (if file exists in `/public`)
- Recommended OG image dimensions are **1200×630**. ✅
- Missing `og:type = "profile"` — for a personal portfolio, `profile` signals to parsers that this is a person's page. Currently set to `website`. Minor improvement.

**Fix:**
```ts
openGraph: {
  type: "profile",       // ← change from "website"
  firstName: "Ashhar",
  lastName: "Shahan",
  username: "ashhar666",
  ...
}
```

---

## 3. Twitter Card Tags ⚠️

**Source:** `layout.tsx` lines 61–66

**Findings:**
- No `twitter:creator` handle defined. Adding it helps with attribution in X/Twitter shares.
- No `twitter:site` defined.

**Fix:**
```ts
twitter: {
  card: "summary_large_image",
  site: "@ashhar666",      // ← your X handle
  creator: "@ashhar666",
  ...
}
```

---

## 4. Canonical URL ⚠️

**Findings:**
- Next.js App Router auto-generates `<link rel="canonical">` from `metadataBase` + route path. Since this is a single-page app (all content on `/`), canonical defaults to `https://ashharshahan.vercel.app/`. ✅
- However: if the site is accessible via **both `ashharshahan.vercel.app`** and a custom domain, you'll want to add an explicit canonical. Set `alternates.canonical` in metadata:

```ts
alternates: {
  canonical: "https://ashharshahan.vercel.app",
},
```

---

## 5. Heading Hierarchy ⚠️ HIGH PRIORITY

**Source:** `minimalist-hero.tsx` line 264, `projects-section.tsx` lines 61–62

**Findings:**

The main hero name display is inside an `<h1>`:
```tsx
// minimalist-hero.tsx line 264
<h1 className="font-extrabold ...">Animated Name / Typewriter</h1>
```
That `<h1>` contains the person's name / typewriter animation. **Good** — there is one `<h1>`.

But in `projects-section.tsx`:
```tsx
<h2>Projects</h2>   {/* "PROJECTS" label — tiny tracking text */}
<h3>Featured Work</h3>
```

This jumps from `<h2>` to `<h3>` for sibling content. The "Featured Work" headline should ideally be an `<h2>` since it's a primary section heading. The small label above it ("PROJECTS") can be a `<span>` or `<p>`.

**Fix in `projects-section.tsx`:**
```tsx
<span className="text-sm ... text-foreground/40">Projects</span>  {/* not h2 */}
<h2 className="mt-2 text-3xl font-bold text-foreground">Featured Work</h2>  {/* promote */}
```

> Also check `about-section.tsx` and `contact-section.tsx` for the same pattern.

---

## 6. Sitemap.xml ❌ HIGH PRIORITY

**Findings:**
- There is **no `sitemap.xml`** in the project (`app/sitemap.ts` does not exist, `/public/sitemap.xml` not found).
- Without a sitemap, crawlers discover pages entirely through links. For a single-page portfolio it's less critical, but it's a 10-minute fix.

**Fix — create `app/sitemap.ts`:**
```ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ashharshahan.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```
This makes Next.js auto-serve `/sitemap.xml`.

---

## 7. Robots.txt ✅

**Findings:**
- `layout.tsx` exports a `robots` metadata config:
```ts
robots: { index: true, follow: true, googleBot: { index: true, follow: true } }
```
- Next.js serves this as `<meta name="robots">` and `<meta name="googlebot">` in the `<head>`. ✅

**Optional enhancement — create `app/robots.ts`** to also expose `/robots.txt`:
```ts
import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://ashharshahan.vercel.app/sitemap.xml',
  };
}
```

---

## 8. Image SEO ⚠️

**Source:** `minimalist-hero.tsx` line 242–254, `projects-section.tsx` line 104–108

**Findings:**

| Image | Tag | alt set? | format | priority? |
|---|---|---|---|---|
| Hero profile | `<motion.img>` | ✅ (from prop) | presumably `.png`/`.webp` | ❌ no `loading="eager"` |
| Nav logo | `<Image>` (Next.js) | ✅ "Logo" | `.png` | ✅ `priority` |
| Project card image | `<motion.img>` | ✅ (project title) | `.png` (screenshot) | ❌ `loading="lazy"` (correct for below fold) |

**Issues:**
1. **Hero image uses `<motion.img>` instead of Next.js `<Image>`** — loses automatic WebP conversion, srcSet, and size optimization.
2. The hero image alt is the `imageAlt` prop — confirm it describes the person, e.g., `"Ashhar Shahan, Full-Stack Developer"` rather than generic.
3. Project screenshot is a raw `.png` in `/public/projects/`. Large PNGs hurt LCP and CLS.

**Fixes:**
- Convert hero to `<Image>` (requires removing `motion.img`; wrap in `<motion.div>` instead).
- Add explicit dimensions or `fill` prop to avoid CLS.
- Compress/convert project screenshots to `.webp` (use `squoosh`, `sharp`, or run `npx next-export-optimize-images`).
- Update hero `imageAlt` in demo file to a descriptive string.

---

## 9. Structured Data / JSON-LD ❌ HIGH PRIORITY

**Findings:**
- No JSON-LD `Person`, `WebSite`, or `ProfilePage` schema is implemented anywhere.
- Google uses structured data to generate rich results and Knowledge Panels for personal portfolios.

**Fix — add to `app/layout.tsx` (inside `<head>` via Next.js `Script` or metadata):**

The cleanest approach is a `<script>` tag inside the root layout:

```tsx
// In RootLayout, before </body>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ashhar Shahan",
      url: "https://ashharshahan.vercel.app",
      sameAs: [
        "https://github.com/ashhar666",
        "https://linkedin.com/in/ashhar-shahan",  // update with real URL
      ],
      jobTitle: "Python Full-Stack Developer",
      description: "Specializing in scalable web applications, modern UIs, and high-performance backend systems.",
      image: "https://ashharshahan.vercel.app/profile.webp",
    }),
  }}
/>
```

For the Projects section, add `SoftwareApplication` or `CreativeWork` schema per project.

---

## 10. Content Depth ⚠️

**Findings:**
- The site is a **single-page portfolio** — all SEO equity is concentrated on one URL.
- The hero `mainText` and about section carry the keyword-rich narrative, but Google won't surface you for skill-specific queries (e.g., "hire Python developer Pakistan") without more indexed text.
- Projects section currently has **1 project** listed (`Keralam`). More projects = more indexable content.

**Recommendations:**
- Consider a blog or case-study route (`/blog/[slug]`) for long-tail keyword capture.
- Expand project descriptions to include the **problem solved**, **tech stack rationale**, and **results**.
- Add a skills list (Python, React, Django, etc.) as visible, crawlable text — not just visual icons.

---

## 11. Performance Signals ⚠️

**Relevant observations:**
- **CursorFollower, GrainOverlay** — JavaScript-heavy global effects. Ensure they are code-split and don't block LCP.
- **Framer Motion** — imported across many components; ensure tree-shaking works (use `framer-motion/dist/cjs` in prod or verify bundle).
- **3 Google Fonts** loaded (Geist Sans, Geist Mono, Playfair Display). Geist is served via `next/font` (auto-optimized ✅). Verify Playfair Display is used on-screen text (it's declared but only assigned a CSS variable — confirm it's applied somewhere, otherwise remove to save bandwidth).
- Vercel Analytics + Speed Insights are present ✅ — use them to identify real CWV gaps.

---

## Quick-Win Checklist

```
[ ] Create app/sitemap.ts
[ ] Create app/robots.ts
[ ] Add JSON-LD Person schema to layout.tsx
[ ] Fix heading hierarchy in projects-section.tsx (h2 → span, h3 → h2)
[ ] Add alternates.canonical to metadata
[ ] Add twitter.site and twitter.creator handles
[ ] Convert hero <motion.img> to Next.js <Image> with descriptive alt
[ ] Convert project screenshots to .webp
[ ] Add og:type "profile" with firstName/lastName
[ ] Verify profile.webp resolves at the live URL
[ ] Remove unused Playfair Display font if not applied anywhere visible
```
