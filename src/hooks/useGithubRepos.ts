import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

export type GithubRepo = {
  id: number
  name: string
  owner: { login: string }
  description: string | null
  language: string | null
  html_url: string
  topics?: string[]
  created_at: string
  fork?: boolean
}

export const GITHUB_REPOS_QUERY_KEY = ['github-repos', 'yasinatesim'] as const

export async function fetchAllGithubRepos(): Promise<GithubRepo[]> {
  let page = 1;
  let allRepos: GithubRepo[] = [];
  let perPage = 100;
  while (true) {
    const res = await axios.get<GithubRepo[]>(`https://api.github.com/users/yasinatesim/repos`, {
      params: {
        per_page: perPage,
        page,
      },
    });
    const repos = res.data;
    allRepos = allRepos.concat(repos);
    if (repos.length < perPage) break;
    page++;
  }
  return allRepos;
}

export function useGithubRepos() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: GITHUB_REPOS_QUERY_KEY,
      queryFn: fetchAllGithubRepos,
      staleTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
      gcTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
    })
  )
}
