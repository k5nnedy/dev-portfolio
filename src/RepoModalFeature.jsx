import React, { useEffect } from 'react';
import useRepoDetails from './UseRepoDetails';
import { createPortal } from 'react-dom';


// Language colors — same palette you use in GithubRepos.jsx
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

const RepoModalFeature = ({ repo, onClose }) => {
    const owner = repo.owner?.login || 'k5nnedy';
    const { details, loading } = useRepoDetails(owner, repo.name);

    // Close modal when user presses Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape'){
                e.stopImmediatePropagation();
                onClose();
            } 
        };
        window.addEventListener('keydown', handleKey, true);
        return () => window.removeEventListener('keydown', handleKey, true);
    }, [onClose]);

    // Calculate language percentages from byte counts
    const langTotal = details
        ? Object.values(details.languages).reduce((sum, n) => sum + n, 0)
        : 0;

    // Portaled modal lets modal stick even scrolling
    return createPortal(
        <div className="repo-modal-overlay" onClick={onClose}>
            <div className="repo-modal" onClick={(e) => e.stopPropagation()}>

                {/* ── Header ── */}
                <div className="repo-modal-header">
                    <span className="repo-modal-prompt">❯</span>
                    <span className="repo-modal-cmd">
                        git remote show <span className="repo-modal-name">{repo.name}</span>
                    </span>
                    <button className="repo-modal-close" onClick={onClose} title="close (esc)">×</button>
                </div>

                {/* ── Body ── */}
                <div className="repo-modal-body">

                    {/* Description */}
                    {repo.description && (
                        <p className="repo-modal-desc">{repo.description}</p>
                    )}

                    {/* Stats row */}
                    <div className="repo-modal-stats">
                        <div className="repo-stat">
                            <span className="repo-stat-icon">★</span>
                            <span className="repo-stat-value">{repo.stargazers_count}</span>
                            <span className="repo-stat-label">stars</span>
                        </div>
                        <div className="repo-stat">
                            <span className="repo-stat-icon">⑂</span>
                            <span className="repo-stat-value">{repo.forks_count}</span>
                            <span className="repo-stat-label">forks</span>
                        </div>
                        <div className="repo-stat">
                            <span className="repo-stat-icon">◉</span>
                            <span className="repo-stat-value">{repo.watchers_count}</span>
                            <span className="repo-stat-label">watchers</span>
                        </div>
                        <div className="repo-stat">
                            <span className="repo-stat-icon">!</span>
                            <span className="repo-stat-value">{repo.open_issues_count}</span>
                            <span className="repo-stat-label">issues</span>
                        </div>
                    </div>

                    {loading && (
                        <div className="repo-modal-loading">
                            <span className="repo-loading-prompt">❯</span> loading repo details...
                        </div>
                    )}

                    {details && (
                        <>
                            {/* Language breakdown */}
                            {Object.keys(details.languages).length > 0 && (
                                <div className="repo-modal-section">
                                    <h4 className="repo-modal-section-title">languages</h4>

                                    {/* Stacked bar */}
                                    <div className="repo-lang-bar">
                                        {Object.entries(details.languages).map(([lang, bytes]) => (
                                            <div
                                                key={lang}
                                                className="repo-lang-segment"
                                                style={{
                                                    width: `${(bytes / langTotal) * 100}%`,
                                                    backgroundColor: LANG_COLORS[lang] || '#6c7086',
                                                }}
                                                title={`${lang}: ${((bytes / langTotal) * 100).toFixed(1)}%`}
                                            />
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="repo-lang-legend">
                                        {Object.entries(details.languages).map(([lang, bytes]) => (
                                            <span key={lang} className="repo-lang-item">
                                                <span
                                                    className="repo-lang-dot"
                                                    style={{ backgroundColor: LANG_COLORS[lang] || '#6c7086' }}
                                                />
                                                {lang} <span className="repo-lang-pct">
                                                    {((bytes / langTotal) * 100).toFixed(1)}%
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contributors */}
                            {details.contributors.length > 0 && (
                                <div className="repo-modal-section">
                                    <h4 className="repo-modal-section-title">
                                        contributors <span className="repo-count">({details.contributors.length})</span>
                                    </h4>
                                    <div className="repo-contributors">
                                        {details.contributors.slice(0, 8).map(c => (
                                            <a
                                                key={c.id}
                                                href={c.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="repo-contributor"
                                            >
                                                <img src={c.avatar_url} alt={c.login} className="repo-contributor-avatar"/>
                                                <span className="repo-contributor-login">{c.login}</span>
                                                <span className="repo-contributor-count">{c.contributions} commits</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Releases */}
                            {details.releases.length > 0 ? (
                                <div className="repo-modal-section">
                                    <h4 className="repo-modal-section-title">
                                        releases <span className="repo-count">({details.releases.length})</span>
                                    </h4>
                                    <div className="repo-releases">
                                        {details.releases.slice(0, 5).map(r => (
                                            <a
                                                key={r.id}
                                                href={r.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="repo-release"
                                            >
                                                <span className="repo-release-tag">{r.tag_name}</span>
                                                <span className="repo-release-name">{r.name || r.tag_name}</span>
                                                <span className="repo-release-date">
                                                    {new Date(r.published_at).toLocaleDateString()}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="repo-modal-section">
                                    <h4 className="repo-modal-section-title">releases</h4>
                                    <p className="repo-empty">no releases yet</p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Footer link */}
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="repo-modal-link"
                    >
                        [ open on github ]
                    </a>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default RepoModalFeature;