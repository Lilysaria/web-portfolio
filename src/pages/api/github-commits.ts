import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const githubUsername = 'lilysaria';
  const url = `https://api.github.com/users/${githubUsername}/repos`;

  try {
    // fetch repositories
    const reposResponse = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });

    const repos = await reposResponse.json();
    const recentCommits: any[] = [];

    // fetch commits for each repository
    for (const repo of repos.slice(0, 5)) {
      const commitsUrl = `https://api.github.com/repos/${githubUsername}/${repo.name}/commits`;
      const commitsResponse = await fetch(commitsUrl, {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      });
      const commits = await commitsResponse.json();

      if (Array.isArray(commits) && commits.length > 0) {
        recentCommits.push(...commits.slice(0, 3));
      }
    }

    // sort commits by date (newest first)
    recentCommits.sort(
      (a, b) =>
        new Date(b.commit.author.date).getTime() -
        new Date(a.commit.author.date).getTime(),
    );

    // Send the most recent commits back as the response
    res.status(200).json(recentCommits.slice(0, 5)); // return only the most recent 5 commits overall
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commits' });
  }
}
