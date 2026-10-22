import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

export type GithubRepo = {
  id: number
  name: string
  description: string | null
  language: string | null
  html_url: string
  topics?: string[]
  created_at: string
  fork?: boolean
  stargazers_count?: number
}

export const GITHUB_REPOS_QUERY_KEY = ['github-repos', 'yasinatesim'] as const

const SERVER_CACHE_TTL = 1000 * 60 * 30
let serverCache: { at: number; repos: GithubRepo[] } | null = null

function githubHeaders(): Record<string, string> {
  const token = typeof window === 'undefined' ? process.env.GITHUB_TOKEN : undefined
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function requestAllRepos(): Promise<GithubRepo[]> {
  let page = 1;
  let allRepos: GithubRepo[] = [];
  const perPage = 100;
  while (true) {
    const res = await axios.get<GithubRepo[]>(`https://api.github.com/users/yasinatesim/repos`, {
      params: {
        per_page: perPage,
        page,
      },
      headers: githubHeaders(),
    });
    // The API returns ~80 fields per repo; keep only what the UI reads, since the list is serialized into the SSR HTML.
    allRepos = allRepos.concat(
      res.data.map(({ id, name, description, language, html_url, topics, created_at, fork, stargazers_count }) => ({
        id, name, description, language, html_url, topics, created_at, fork, stargazers_count,
      })),
    );
    if (res.data.length < perPage) break;
    page++;
  }
  return allRepos;
}

export async function fetchAllGithubRepos(): Promise<GithubRepo[]> {
  if (typeof window !== 'undefined') return requestAllRepos()
  if (serverCache && Date.now() - serverCache.at < SERVER_CACHE_TTL) return serverCache.repos
  try {
    const repos = await requestAllRepos()
    serverCache = { at: Date.now(), repos }
    return repos
  } catch (e: unknown) {
    if (serverCache) return serverCache.repos
    throw e
  }
}

export function useGithubRepos() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: GITHUB_REPOS_QUERY_KEY,
      queryFn: fetchAllGithubRepos,
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}
