const githubApi = "https://api.github.com/repos";

export function useApi() {
  let latestSha: { sha: string; link: string } | null = null;

  return {
    async getLatestCommit(
      branch: string = "master",
      owner: string = "jonathanhamel4",
      repo: string = "resume",
    ) {
      if (latestSha) {
        return latestSha;
      }

      const url: string =
        githubApi + "/" + owner + "/" + repo + "/commits/" + branch;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          return null;
        }

        const commit = await response.json();
        latestSha = { sha: commit.sha.substring(0, 7), link: commit.html_url };
      } catch (error) {
        console.error(error);
      }
      return latestSha;
    },
  };
}
