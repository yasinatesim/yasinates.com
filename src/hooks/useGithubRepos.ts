import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

async function fetchAllGithubRepos() {
  let page = 1;
  let allRepos: any[] = [];
  let perPage = 100;
  while (true) {
    const res = await axios.get(`https://api.github.com/users/yasinatesim/repos`, {
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
  console.log("allRepos:", allRepos)
  return allRepos;
}

export function useGithubRepos() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['github-repos', 'yasinatesim'],
      queryFn: fetchAllGithubRepos,
      staleTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
      gcTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
    })
  )
}
