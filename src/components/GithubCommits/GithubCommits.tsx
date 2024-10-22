import React, { useEffect, useState } from 'react';
import styles from './GithubCommits.module.css';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repoName: string;
}

function GithubCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [activeCommit, setActiveCommit] = useState<Commit | null>(null);

  useEffect(() => {
    fetch('/api/github-commits')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCommits(data.slice(0, 8)); // Show the latest 8 commits
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching commits:', error));
  }, []);

  const handleHover = (commit: Commit) => {
    setActiveCommit(commit); // set the active commit when hovering over a hexagon
  };

  const handleMouseOut = () => {
    setActiveCommit(null); // clear the active commit when hovering off
  };

  return (
    <div className={styles.container}>
      {commits.map(commit => (
        <div
          key={commit.sha}
          className={styles.hexagon}
          onMouseEnter={() => handleHover(commit)} // show modal on hover
          onMouseLeave={handleMouseOut} // close modal when hovering off
        >
          <div className={styles.commitMessage}>
            {commit.repoName}
          </div>
        </div>
      ))}

      {activeCommit && (
        <div className={styles.modal}>
          <p>{activeCommit.commit.message}</p>
          <p className={styles.commitDetails}>
            {new Date(activeCommit.commit.author.date).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default GithubCommits;
