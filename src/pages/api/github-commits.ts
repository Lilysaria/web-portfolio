import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const githubUsername = 'lilysaria';
  const url = `https://api.github.com/users/${githubUsername}/repos`;
  const startTime = Date.now(); // Move this line here

  try {
    console.time(`Total Fetch ${startTime}`);

    const reposResponse = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });

    const repos = await reposResponse.json();
    const recentCommits: any[] = [];

    for (const repo of repos.slice(0, 5)) {
      const repoLabel = `Fetch Commits for ${repo.name} (${Date.now()})`; // Unique label per repo
      console.time(repoLabel); // start timer for repo commits fetch

      const commitsUrl = `https://api.github.com/repos/${githubUsername}/${repo.name}/commits`;
      const commitsResponse = await fetch(commitsUrl, {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      });

      const commits = await commitsResponse.json();
      console.timeEnd(repoLabel); // end timer for this repo

      if (Array.isArray(commits) && commits.length > 0) {
        const commitsWithRepo = commits.slice(0, 3).map((commit: any) => ({
          ...commit,
          repoName: repo.name,
        }));
        recentCommits.push(...commitsWithRepo);
      }
    }

    recentCommits.sort(
      (a, b) =>
        new Date(b.commit.author.date).getTime() -
        new Date(a.commit.author.date).getTime(),
    );

    res.status(200).json(recentCommits.slice(0, 5)); // return only the most recent 5 commits overall

    console.timeEnd(`Total Fetch ${startTime}`); // end total time measurement
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch commits' });
    console.timeEnd(`Total Fetch ${startTime}`);
  }
}
