import { MetadataRoute } from 'next'
import { projectData } from '@/data/projects'

// lastModified is intentionally omitted: no truthful per-page modification
// date is tracked, and a build-time `new Date()` would misreport freshness.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.webcris.dev'

  const projectUrls = Object.keys(projectData).map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
  }))

  return [{ url: `${baseUrl}/` }, ...projectUrls]
}
