# Vercel SE Project

## About This Project

### User Experience
This example website showcases various Vercel features.

The homepage allows you to see the current popular stories on Hacker News.

We list a series of possible search terms in the sidebar that related to Vercel, Next.js, and adjacent topics.

You can also search for any topic you want using the search bar.  The search bar uses typeahead functionality based on a list of english words.  An opportunity for improvement is to base the results of the search on likely words rather than just the next word(s) alphabetically, but I couldn't find a package or publicly available API that supported this functionality.
 
### Vercel Products & Features Used
- v0: Created a foundation for the site
- Vercel Build
- Vercel Hosting
- Vercel GitHub Integration
- [Vercel Speed Insights](https://vercel.com/rawwebdesigns-projects/vercel-se-project/speed-insights)
- Vercel Analytics
- Vercel Observability
- Environment Variables
  - Base URLs for the APIs called
- Edge Config
  - Popular topics in the sidebar
- Edge Middleware
  - redirects from /search={search term} to /topic/{search term}

### Links
- [Vercel Dashboard (Requires Login and Access)](https://vercel.com/rawwebdesigns-projects/vercel-se-project)
- [Publicly Accessible URL](https://vercel-se-project.vercel.app/)