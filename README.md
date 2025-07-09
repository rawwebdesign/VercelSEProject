# Example Hacker News Navigator on Vercel

This demo shows how Vercel’s platform - and the principles behind it - translate directly into faster user experiences, and lower infrastructure spend.

---

## ⚡ Ultrafast First Load (Static Rendering + Global POP)

| Metric                                        | Result | Business Impact                                                                         |
|-----------------------------------------------|--------|-----------------------------------------------------------------------------------------|
| **Performance Score (Vercel Speed Insights)** | **100** | Signals best-in-class speed to search engines and prospective customers/readers.        |
| First Contentful Paint (FCP)                  | 0.7 s | Visible content appears almost instantly, lowering abandonment risk.                    |
| Largest Contentful Paint (LCP)                | 0.71 s — 65 % faster than Google’s 2.5 s “good” threshold | Faster perceived load correlates with higher engagement and SEO ranking.                |
| Interaction to Next Paint (INP)               | 40 ms | Near-instant interactivity keeps users exploring instead of waiting.                    |
| Cumulative Layout Shift (CLS)                 | 0 | Zero unexpected movement prevents mis-clicks.                          |
| First Input Delay (FID)                       | 4 ms | Immediate response to user actions improves conversion likelihood.                      |
| Time to First Byte (TTFB)                     | 0.14 s | Rapid server response aids both human perception and search-engine crawling efficiency. |

All core pages (home and topic search) are prerendered at build time and served from Vercel’s edge network, so every visitor hits the PoP nearest to them—no origin round-trip, no cold starts.

---

## 🕹️ Edge-Managed Suggested Topics

Suggested search terms for Vercel, Next.js, and related subjects live in **Edge Config**, not in code. Non-technical stakeholders can update recommendations instantly without:

* waiting for engineering bandwidth
* opening a pull request
* triggering a deployment pipeline

> **Business value:** marketing teams can react to trends (e.g., “module federation”) in minutes instead of sprint cycles, turning topical interest into traffic while it’s still hot.

---

## 🔍 Search With Smart Typeahead

The search bar offers typeahead to speed discovery. Each keystroke:

1. Hits a lightweight **Route Handler**.
2. Looks up the next plausible word (local dictionary-based for the demo; could be replaced by frequency-ranked data).
3. Uses a `Cache-Control` header so repeated queries are served from Vercel’s edge cache.

> **Business value:** fewer requests reach the origin, cutting serverless invocations and cost while delivering near-instant suggestions that keep users exploring.

---

## 🏗️ Key Architecture Decisions

| Decision | Reason | Outcome |
|----------|--------|---------|
| **Static Generation** | Push as much work as possible to build time. | Zero server latency for most traffic. |
| **Edge Config for UI hints** | Decouple content tweaks from deploys. | Faster iteration by non-engineers. |
| **API response caching** | Cache hot endpoints aggressively. | Lower infra spend; faster autocomplete. |

 
### Vercel Products & Features Used
- v0: Created a foundation for the site
- Vercel Build
- Vercel Hosting
- Vercel GitHub Integration
- [Vercel Speed Insights](https://vercel.com/rawwebdesigns-projects/vercel-se-project/speed-insights)
- [Vercel Analytics](https://vercel.com/rawwebdesigns-projects/vercel-se-project/analytics)
- [Vercel Observability](https://vercel.com/rawwebdesigns-projects/vercel-se-project/observability)
- [Environment Variables](https://vercel.com/rawwebdesigns-projects/vercel-se-project/settings/environment-variables)
  - Base URLs for the APIs called
- Edge Config
  - Popular topics in the sidebar
- Edge Middleware
  - redirects from /search={search term} to /topic/{search term}
- Route Handlers
  - Popular topics
  - Autocomplete

### Links
- [Vercel Dashboard (Requires Login and Access)](https://vercel.com/rawwebdesigns-projects/vercel-se-project)
- [Publicly Accessible URL](https://vercel-se-project.vercel.app/)