import { useState, useEffect } from 'react';

const useRepoDetails = (owner, repoName) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!owner || !repoName) return;

        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch contributors, releases, and language breakdown in parallel
                const [contributorsRes, releasesRes, languagesRes] = await Promise.all([
                    fetch(`https://api.github.com/repos/${owner}/${repoName}/contributors`),
                    fetch(`https://api.github.com/repos/${owner}/${repoName}/releases`),
                    fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`),
                ]);

                const contributors = contributorsRes.ok ? await contributorsRes.json() : [];
                const releases     = releasesRes.ok     ? await releasesRes.json()     : [];
                const languages    = languagesRes.ok    ? await languagesRes.json()    : {};

                setDetails({ contributors, releases, languages });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [owner, repoName]);

    return { details, loading, error };
};

export default useRepoDetails;