import React, { useState } from 'react';
import useGitHubRepos from './Usegithubrepos';
import { useSearch } from './Search';
import Highlight from './Highlight';
import RepoModalFeature from './RepoModalFeature';

// Maps GitHub language names to a color — extend as needed
const LANG_COLORS = {
    JavaScript: '#f9e2af',
    Python:     '#a6e3a1',
    Java:       '#fab387',
    C:          '#cba6f7',
    'C++':      '#cba6f7',
    Rust:       '#f38ba8',
    HTML:       '#fab387',
    CSS:        '#89b4fa',
    Shell:      '#a6e3a1',
};

const LanguageDot = ({ language }) => {
    if (!language) return null;
    const color = LANG_COLORS[language] || '#6c7086';
    return (
        <span className="gh-lang-dot" style={{ backgroundColor: color }} title={language} />
    );
};

const RepoSkeleton = () => (
    <div className="gh-repo-card gh-skeleton">
        <div className="gh-skeleton-line gh-skeleton-title" />
        <div className="gh-skeleton-line gh-skeleton-desc" />
        <div className="gh-skeleton-line gh-skeleton-meta" />
    </div>
);

const GitHubRepos = ({ username }) => {
    const { repos, loading, error } = useGitHubRepos(username);
    const { searchTerm } = useSearch();
    const term = searchTerm.toLowerCase().trim();

    const [selectedRepo, setSelectedRepo] = useState(null);

    if (error) {
        return (
            <div className="gh-error">
                <span className="gh-error-icon">!</span>
                failed to fetch repos: {error}
            </div>
        );
    }

    // Filter repos by search term if active
    const visible = repos.map(repo => {
        const matches = !term || (
            repo.name.toLowerCase().includes(term) ||
            (repo.description || '').toLowerCase().includes(term) ||
            (repo.language || '').toLowerCase().includes(term)
        );
        return { ...repo, matches };
    });

    return (
        <div className="gh-repos-section">
            <div className="gh-repos-header">
                <span className="gh-prompt">❯</span>
                <span className="gh-cmd">
                    fetch --user <span className="gh-username">{username}</span> --sort updated
                </span>
                {!loading && (
                    <span className="gh-count">{repos.length} repos</span>
                )}
            </div>

            <div className="gh-repos-grid">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <RepoSkeleton key={i} />)
                    : visible.map(repo => (
                        <div
                            key={repo.id}
                            className={`gh-repo-card ${term && !repo.matches ? 'gh-repo-dimmed' : ''}`}
                            onClick={() => setSelectedRepo(repo)}
                            title="click for details"
                        >
                            {/* Repo name */}
                            <div className="gh-repo-name">
                                <span className="gh-repo-icon">⎇</span>
                                <Highlight text={repo.name} term={searchTerm} />
                            </div>

                            {/* Description */} 
                            <p className="gh-repo-desc">
                                {repo.description
                                    ? <Highlight text={repo.description} term={searchTerm} />
                                    : <span className="gh-no-desc"></span>
                                }
                            </p>

                            {/* Meta row */}
                            <div className="gh-repo-meta">
                                {repo.language && (
                                    <span className="gh-repo-lang">
                                        <LanguageDot language={repo.language} />
                                        <Highlight text={repo.language} term={searchTerm} />
                                    </span>
                                )}
                                {repo.stargazers_count > 0 && (
                                    <span className="gh-repo-stat">★ {repo.stargazers_count}</span>
                                )}
                                {repo.forks_count > 0 && (
                                    <span className="gh-repo-stat">⑂ {repo.forks_count}</span>
                                )}
                            </div>

                            {/* Footer link */}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="gh-repo-link"
                                onClick={(e) => e.stopPropagation()}
                            >
                                [ view on github ]
                            </a>
                        </div>
                    ))
                }
            </div>

            {selectedRepo && (
                <RepoModalFeature
                    repo={selectedRepo}
                    onClose={() => setSelectedRepo(null)}
                />
            )}
        </div>
    );
};

export default GitHubRepos;