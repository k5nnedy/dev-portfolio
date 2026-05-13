import { useState, useEffect } from 'react';

const useGitHubRepos = (username, limit = 10) => {
    const [repos, setRepos]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchRepos = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${limit}`
                );

                if (!res.ok) {
                    throw new Error(`GitHub API error: ${res.status}`);
                }

                const data = await res.json();

                // Filter out forks, sort by most recently updated
                const filtered = data
                    .filter(r => !r.fork)
                    .slice(0, limit);

                setRepos(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username, limit]);

    return { repos, loading, error };
};

export default useGitHubRepos;