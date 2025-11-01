import { useState, useEffect } from 'react';
import { Candidate } from '../types';
import * as api from '../../../services/apiService';

export const useAllCandidatesData = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const candidateData = await api.getAllElectionCandidates();
                setCandidates(candidateData);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return { candidates, isLoading, error };
};