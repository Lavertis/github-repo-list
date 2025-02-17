import { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axios-instance.ts';
import { Repository } from '../../../../types/repository.ts';

export function useUserRepositories(userId?: string, currentPage = 1, pageSize = 10) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;
    axiosInstance.get<Repository[]>(`users/${userId}/repos?page=${currentPage}&per_page=${pageSize}`)
      .then((response) => setRepositories(response.data))
      .catch((err) => setError(err.message));
  }, [userId, currentPage, pageSize]);

  return { repositories, error };
}