import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

export function useGithubRepos() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['github-repos', 'yasinatesim'],
      queryFn: async () => {
        const res = await axios.get('https://api.github.com/users/yasinatesim/repos')
        return res.data
      },
      staleTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
      gcTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
    })
  )
}
