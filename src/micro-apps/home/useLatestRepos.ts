import { useQueryClient } from '@tanstack/react-query'
import { GITHUB_REPOS_QUERY_KEY, useGithubRepos, type GithubRepo } from '~/hooks/useGithubRepos'

export function useLatestRepos(count: number): GithubRepo[] {
  const client = useQueryClient()
  if (typeof window === 'undefined' && !client.getQueryData(GITHUB_REPOS_QUERY_KEY)) {
    throw new Error('GitHub repos not prefetched; rendering this part on the client')
  }
  const { data } = useGithubRepos()
  return data
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, count)
}
